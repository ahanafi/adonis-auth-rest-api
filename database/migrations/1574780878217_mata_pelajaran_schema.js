'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MataPelajaranSchema extends Schema {
  up () {
    this.create('mata_pelajaran', (table) => {
      table.increments()
      table.string('kode', 8).unique().notNullable()
      table.string('nama', 200).unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('mata_pelajaran')
  }
}

module.exports = MataPelajaranSchema
