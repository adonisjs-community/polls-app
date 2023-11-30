import Up from './index.js'

declare module '@ioc:Adonis/Core/HttpContext' {
  interface HttpContextContract {
    up: Up
  }
}
