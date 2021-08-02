import User from 'App/Models/User'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

/**
 * Controller to handle user signup requests. We keep it simple
 * for now and do not do email verification
 */
export default class SignupController {
  /**
   * Show form to signup
   */
  public async create({ view }: HttpContextContract) {
    return view.render('pages/signup')
  }

  /**
   * Handle signup form submissions
   */
  public async store({ request, response, auth }: HttpContextContract) {
    /**
     * Validate new user account creation form
     */
    const payload = await request.validate(CreateUserValidator)

    /**
     * Create a new user
     */
    const user = await User.create(payload)

    /**
     * Login the user
     */
    await auth.login(user)

    /**
     * Redirect to the home page
     */
    response.redirect('/')
  }
}
