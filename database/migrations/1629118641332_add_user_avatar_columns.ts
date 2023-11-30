import { BaseSchema } from "@adonisjs/lucid/schema";

export default class AddUserAvatarColumns extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('avatar_filename').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
