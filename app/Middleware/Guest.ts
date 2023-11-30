import { HttpContext } from '@adonisjs/core/http'

/**
 * A middleware to redirect logged in users to the home page. Mainly
 * used to redirect a logged in user away from the "signup" and
 * "login" pages.
 */
export default class Guest {
  public async handle({ auth, response }: HttpContext, next: () => Promise<void>) {
    if (auth.isLoggedIn) {
      response.redirect('/')
      return
    }
    await next()
  }
}
