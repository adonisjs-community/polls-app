/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import logger from '@adonisjs/core/services/logger'
import { HttpContext } from '@adonisjs/core/http'
import { ExceptionHandler } from "@adonisjs/core/http";

export default class ExceptionHandler extends ExceptionHandler {
  protected statusPages = {
    '403': 'pages/errors/unauthorized',
    '404': 'pages/errors/not-found',
    '500..599': 'pages/errors/server-error',
  }

  constructor() {
    super(logger)
  }

  public async handle(error: any, ctx: HttpContext) {
    if (error.code === 'E_VALIDATION_FAILURE') {
      ctx.up.setTarget(ctx.up.getFailTarget())
    }

    if (!error.status || this.expandedStatusPages[error.status]) {
      ctx.up.fullReload()
    }

    return super.handle(error, ctx)
  }
}
