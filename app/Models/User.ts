import { DateTime } from 'luxon'
import Poll from 'App/Models/Poll'
import Hash from '@ioc:Adonis/Core/Hash'
import Drive from '@ioc:Adonis/Core/Drive'
import ColorPalette from 'App/Services/ColorPalette'
import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'

import {
  column,
  beforeSave,
  BaseModel,
  HasMany,
  hasMany,
  manyToMany,
  ManyToMany,
  beforeCreate,
} from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public fullName: string

  @column()
  public profileColor: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @attachment({ preComputeUrl: true })
  public avatar: AttachmentContract | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /**
   * Extracting initials from the user fullName. We need them
   * to show on the user avatar.
   */
  public get initials() {
    const [firstName, lastName] = this.fullName.split(' ')
    return lastName
      ? `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
      : `${firstName.slice(0, 2)}`.toUpperCase()
  }

  /**
   * Hash password at the time of saving the user to the database
   */
  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  /**
   * Assign a random profile color to the user
   */
  @beforeCreate()
  public static assignColor(user: User) {
    user.profileColor = ColorPalette.getRandom()
  }

  /**
   * Remove old avatar from the disk when new one is assigned
   */
  @beforeSave()
  public static async cleanupAvatarsStorage(user: User) {
    if (user.$dirty.avatarFilename && user.$original.avatarFilename) {
      await Drive.delete(user.$original.avatarFilename)
    }
  }

  /**
   * These are the polls created by the user
   */
  @hasMany(() => Poll)
  public polls: HasMany<typeof Poll>

  /**
   * These are the polls a user has participated in
   */
  @manyToMany(() => Poll, {
    pivotTable: 'poll_user_votes',
    pivotColumns: ['option_id'],
    pivotTimestamps: true,
  })
  public participations: ManyToMany<typeof Poll>
}
