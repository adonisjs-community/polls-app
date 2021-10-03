import { extname } from 'path'
import mimeTypes from 'mime-types'
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.json('avatar').nullable()
    })

    /**
     * Migrating avatar_filename to an avatar JSON property. This
     * will allow us to use "attachment_lite"
     */
    this.defer(async (connection) => {
      const users = await connection.query().select(['avatar_filename', 'id']).from('users')
      await Promise.all(
        users.map((user) => {
          return connection
            .from('users')
            .where('id', user.id)
            .update({
              avatar: user.avatar_filename
                ? {
                    name: user.avatar_filename,
                    extname: extname(user.avatar_filename),
                    size: 1024,
                    mimeType: mimeTypes.lookup(extname(user.avatar_filename)),
                  }
                : null,
            })
        })
      )
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('avatar_filename')
    })
  }

  public async down() {}
}
