import { DateTime } from 'luxon'
import User from '#app/Models/User'
import PollOption from '#app/Models/PollOption'
import ColorPalette from '#app/Services/ColorPalette'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'

import {
  column,
  hasMany,
  belongsTo,
  BaseModel,
  beforeCreate,
} from '@adonisjs/lucid/orm'
import { HasMany } from "@adonisjs/lucid/types/relations";
import { BelongsTo } from "@adonisjs/lucid/types/relations";

export default class Poll extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public title: string

  @column()
  public pollColor: string

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['title'],
  })
  public slug: string

  @column.dateTime()
  public closesAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /**
   * Find if the poll has been expired or not
   */
  public get expired() {
    return this.closesAt.diff(DateTime.local(), 'seconds').seconds <= 0
  }

  @hasMany(() => PollOption)
  public options: HasMany<typeof PollOption>

  /**
   * Assign a random color to the poll before we create
   * it.
   */
  @beforeCreate()
  public static assignColor(poll: Poll) {
    poll.pollColor = ColorPalette.getRandom()
  }

  /**
   * Every poll belongs to an author
   */
  @belongsTo(() => User)
  public author: BelongsTo<typeof User>
}
