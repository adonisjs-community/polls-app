import Up from './index'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

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
