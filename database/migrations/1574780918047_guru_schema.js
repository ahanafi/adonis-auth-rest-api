'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GuruSchema extends Schema {
  up () {
    this.create('guru', (table) => {
      table.increments()
      table.string('kode', 8).unique().notNullable()
      table.string('nama', 200).unique().notNullable()
      table.enum('jk', ['L', 'P'])
      table.string('telpon', 13)
      table.text('alamat').default(null)
      table.timestamps()
    })
  }

  down () {
    this.drop('guru')
  }
}

module.exports = GuruSchema
