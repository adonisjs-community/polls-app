import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PollOptions extends BaseSchema {
  protected tableName = 'poll_options'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('poll_id').notNullable().references('polls.id').onDelete('CASCADE')
      table.string('title', 255).notNullable()
      table.integer('votes_count').notNullable().defaultTo(0)

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
