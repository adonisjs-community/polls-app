import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfileController {
  public async index({ request, auth, view }: HttpContextContract) {
    let page = Number(request.input('page'))
    page = isNaN(page) ? 1 : page

    const polls = await auth
      .user!.related('polls')
      .query()
      .withAggregate('options', (query) => query.sum('votes_count').as('votesCount'))
      .orderBy('id', 'desc')
      .paginate(page)

    return view.render('pages/dashboard', { polls })
  }
}
