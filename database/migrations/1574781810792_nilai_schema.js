'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NilaiSchema extends Schema {
  up () {
    this.create('nilai', (table) => {
      table.increments()
      table.string('kode_guru', 8).references('kode')
        .inTable('guru').notNullable()
      table.string('kode_siswa', 8).references('kode')
        .inTable('siswa').notNullable()
      table.string('kode_aspek', 8).references('kode')
        .inTable('aspek_penilaian').notNullable()
      table.integer('nilai').unsigned().notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('nilai')
  }
}

module.exports = NilaiSchema
