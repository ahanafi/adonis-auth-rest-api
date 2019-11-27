'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SiswaSchema extends Schema {
  up () {
    this.create('siswa', (table) => {
      table.increments()
      table.string('kode', 8).unique().notNullable()
      table.integer('nis', 10).unique().notNullable()
      table.string('nama', 200).notNullable()
      table.enum('jk', ['L', 'P'])
      table.string('kode_kelas', 8).references('kode').inTable('kelas')
      table.timestamps()
    })
  }

  down () {
    this.drop('siswa')
  }
}

module.exports = SiswaSchema
