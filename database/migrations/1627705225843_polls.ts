import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Polls extends BaseSchema {
  protected tableName = 'polls'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE')
      table.string('title', 255).notNullable()
      table.string('poll_color', 7).notNullable()
      table.string('slug', 255).unique().notNullable()
      table.timestamp('closes_at').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
