import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/**
 * Handle user login and logout requests.
 */
export default class LoginController {
  /**
   * Show form to login
   */
  public async create({ view }: HttpContextContract) {
    return view.render('pages/login')
  }

  /**
   * Handle login form submissions
   */
  public async store({ request, response, auth }: HttpContextContract) {
    /**
     * Attempt to login the user with the email and password. The
     * "auth.attempt" method will perform all the required
     * validations.
     */
    await auth.attempt(request.input('email'), request.input('password'))

    /**
     * Redirect to the home page
     */
    response.redirect('/')
  }

  /**
   * Destroy user session (aka logout)
   */
  public async destroy({ auth, response }: HttpContextContract) {
    await auth.logout()
    response.redirect('/')
  }
}
