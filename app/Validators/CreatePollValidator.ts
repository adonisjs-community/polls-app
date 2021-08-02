import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePollValidator {
  constructor(protected ctx: HttpContextContract) {}

  /**
   * Using custom data object, so that we can filter out optional
   * options.
   */
  public data = {
    title: this.ctx.request.input('title'),
    days: this.ctx.request.input('days'),
    options: this.ctx.request.input('options', []).filter((option, index) => {
      if (index > 1 && !option?.title) {
        return false
      }
      return true
    }),
  }

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    title: schema.string(),
    options: schema.array([rules.minLength(2)]).members(
      schema.object().members({
        title: schema.string(),
      })
    ),
    days: schema.number(),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    'title.required': 'Enter the poll title',
    'options.*.title.required': 'Enter the option value',
    'days.required': 'Select the poll duration',
    'days.number': 'Poll duration must be represented in numbers',
  }
}
