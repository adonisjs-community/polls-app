import Up from './index.js'
import { ApplicationService } from "@adonisjs/core/types";

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  public async boot() {
    const HttpContext = this.app.container.resolveBinding('Adonis/Core/HttpContext')
    const Server = this.app.container.resolveBinding('Adonis/Core/Server')

    HttpContext.getter(
      'up',
      function () {
        return new Up(this)
      },
      true
    )

    Server.hooks.before(async (ctx) => {
      ctx.view.share({ up: ctx.up })
    })

    Server.hooks.after(async (ctx) => {
      ctx.up.commit()
    })
  }
}
