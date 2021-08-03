import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PollOption extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public pollId: number

  @column()
  public title: string

  @column()
  public votesCount: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /**
   * Counting the percentage of votes this option has received.
   * Needs total votes count as an argument
   */
  public votePercentage(total: number | string) {
    total = Number(total)
    return isNaN(total) || total === 0 ? 0 : Math.round((this.votesCount / total) * 100)
  }
}
