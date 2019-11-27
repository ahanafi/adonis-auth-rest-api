'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class KelasSchema extends Schema {
  up () {
    this.create('kelas', (table) => {
      table.increments()
      table.string('kode', 8).unique().notNullable()
      table.string('nama', 20).unique().notNullable()
      table.enum('kelas', [10, 11, 12]).default(10)
      table.enum('jurusan', [
        'Multimedia', 'Akuntansi', 'Administrasi Perkantoran',
        'Usaha Perjalanan Wisata', 'Pemasaran', 'Perbankan'
      ])
      table.timestamps()
    })
  }

  down () {
    this.drop('kelas')
  }
}

module.exports = KelasSchema
