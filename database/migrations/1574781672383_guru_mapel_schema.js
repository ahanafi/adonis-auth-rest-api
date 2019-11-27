'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GuruMapelSchema extends Schema {
  up () {
    this.create('guru_mapel', (table) => {
      table.increments()
      table.string('kode_kelas', 8).references('kode')
        .inTable('kelas').notNullable()
      table.string('kode_guru', 8).references('kode')
        .inTable('guru').notNullable()
      table.string('kode_mapel', 8).references('kode')
        .inTable('mata_pelajaran').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('guru_mapel')
  }
}

module.exports = GuruMapelSchema
