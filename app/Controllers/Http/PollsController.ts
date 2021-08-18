import { DateTime } from 'luxon'
import Poll from 'App/Models/Poll'
import Database from '@ioc:Adonis/Lucid/Database'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VoteOnPollValidator from 'App/Validators/VoteOnPollValidator'
import CreatePollValidator from 'App/Validators/CreatePollValidator'

/**
 * Controller to the polls resource
 */
export default class PollsController {
  /**
   * Show a list of all the polls. The list is filtered to show only
   * active polls (not the closed one's).
   */
  public async index({ request, view, auth }: HttpContextContract) {
    const filterBy = request.input('filter_by')

    /**
     * Render an empty list of polls when "pariticapted" filter is
     * applied and the user is not logged in
     */
    if (filterBy === 'participated' && !auth.isLoggedIn) {
      return view.render('pages/polls/index', { polls: [], filterBy })
    }

    /**
     * Get the pagination page number and make sure it is a valid number. If
     * not a valid number, we fallback to 1.
     */
    let page = Number(request.input('page'))
    page = isNaN(page) ? 1 : page

    /**
     * Choose the correct query builder. If the "participated" filter is
     * applied, we use the user relationship query builder to fetch
     * polls in which the logged in user has participated.
     *
     * Otherwise we fetch all the active polls (ignoring expired one's)
     */
    const query =
      filterBy === 'participated'
        ? auth.user!.related('participations').query()
        : Poll.query().where('closesAt', '>', DateTime.local().toISO())

    /**
     * Select all polls with an aggregate of the votes count it has
     * received
     */
    const polls = await query
      .withAggregate('options', (query) => {
        /**
         * The aggregated property "votesCount" will be available on the
         * poll instance as "poll.$extras.votesCont".
         */
        query.sum('votes_count').as('votesCount')
      })
      .orderBy('id', 'desc')
      .paginate(page, 10)

    /**
     * The pagination links will use the following as
     * the base url.
     *
     * We also define set the query string, since the route for this
     * controller allows "filter_by" query param.
     */
    polls.baseUrl(request.url()).queryString(request.qs())

    /**
     * Render the template stored inside "pages/polls/index.edge" file
     */
    return view.render('pages/polls/index', { polls, filterBy })
  }

  /**
   * Display the form to create a new poll
   */
  public async create({ view }: HttpContextContract) {
    return view.render('pages/polls/create')
  }

  /**
   * Handle new poll form submission
   */
  public async store({ request, response, auth, session }: HttpContextContract) {
    /**
     * Validate request input
     */
    const data = await request.validate(CreatePollValidator)

    /**
     * Wrap all the database queries inside a transaction. This will ensure the
     * database is always in a consistent state in case of an error
     */
    const poll = await Database.transaction(async (trx) => {
      /**
       * When persisting relationships, we need to assign the transaction
       * instance to the top level model. All the relationship methods
       * will reference the same transaction instance.
       */
      auth.user!.useTransaction(trx)

      /**
       * Create poll and link it with the currently logged in user.
       */
      const poll = await auth.user!.related('polls').create({
        title: data.title,
        closesAt: DateTime.local().plus({ days: data.days }),
      })

      /**
       * Create poll options
       */
      await poll.related('options').createMany(data.options)

      /**
       * Return poll reference
       */
      return poll
    })

    session.flash({ notification: { success: 'Poll has been created successfully' } })
    response.redirect().toRoute('PollsController.show', [poll.slug])
  }

  /**
   * Route to show an indidivual poll. We also preload the poll
   * options relationship.
   */
  public async show({ request, view, auth }: HttpContextContract) {
    /**
     * Query to find a poll by slug and also preload its options and
     * the author
     */
    const poll = await Poll.query()
      .where('slug', request.param('slug'))
      .withAggregate('options', (query) => query.sum('votes_count').as('votesCount'))
      .preload('options', (query) => query.orderBy('id', 'asc'))
      .preload('author')
      .firstOrFail()

    /**
     * Fetch the user participation row for the currently logged
     * in user and the currently selected poll.
     */
    const userParticipation = auth.user
      ? await auth.user.related('participations').query().where('poll_id', poll.id).first()
      : null

    /**
     * Get the selected option, if the user has participated in the poll.
     */
    const selectedOption = userParticipation ? userParticipation.$extras.pivot_option_id : null

    /**
     * Render the pages/polls/show template
     */
    return view.render('pages/polls/show', { poll, selectedOption })
  }

  /**
   * Route to handle form submissions for voting on a poll
   */
  public async submitVote({ request, auth, response, session }: HttpContextContract) {
    const { selectedOption } = await request.validate(VoteOnPollValidator)

    /**
     * Fetch the poll instance
     */
    const poll = await Poll.findOrFail(request.param('id'))

    /**
     * Return early when user is trying to vote on an expired poll. The UI
     * prevents this from happening but we still need to guard from
     * direct requests
     */
    if (poll.expired) {
      session.flash({ errors: { selectedOption: 'Voting on this poll has been closed' } })
      response.redirect().back()
      return
    }

    /**
     * Disallow the poll author from voting to their own poll
     */
    if (poll.userId === auth.user!.id) {
      session.flash({ errors: { selectedOption: 'You cannot vote on your own poll' } })
      return response.redirect().back()
    }

    /**
     * Check if the user has already participated in this poll
     */
    const userParticipation = await auth
      .user!.related('participations')
      .query()
      .wherePivot('poll_id', poll.id)
      .first()

    /**
     * Return early if the user has already participated in this poll. The
     * UI stops from this happening, but still we need to guard from
     * direct requests
     */
    if (userParticipation) {
      return response.redirect().back()
    }

    /**
     * Wrapping all the database operations inside a transaction to ensure
     * database is always in a consistent state
     */
    await Database.transaction(async (trx) => {
      /**
       * Increment the votes count on the selected option. Also, we ensure
       * that the option id belongs to the selected poll by using the
       * relationship query builder.
       */
      await poll
        .related('options')
        .query()
        .useTransaction(trx)
        .where('id', selectedOption)
        .increment('votes_count')

      /**
       * Create a new row for user participation in "poll_user_votes"
       * table.
       */
      await auth.user!.related('participations').attach(
        {
          [poll.id]: {
            option_id: selectedOption,
          },
        },
        trx
      )

      return poll
    })

    /**
     * Redirect back
     */
    response.redirect().back()
  }

  /**
   * Route to delete a poll by its id
   */
  public async destroy({ request, response, auth, session }: HttpContextContract) {
    const poll = await Poll.find(request.param('id'))

    /**
     * Silently ignore requests trying to delete a non-existing
     * or a poll not owned by them
     */
    if (!poll || poll.userId !== auth.user!.id) {
      response.redirect().toRoute('ProfileController.index')
      return
    }

    /**
     * Delete poll and redirect
     */
    await poll.delete()
    session.flash({ notification: { success: 'Poll deleted successfully' } })
    response.redirect().toRoute('ProfileController.index')
  }
}
