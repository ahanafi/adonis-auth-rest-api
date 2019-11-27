'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AspekPenilaianSchema extends Schema {
  up () {
    this.create('aspek_penilaian', (table) => {
      table.increments()
      table.string('kode', 8).unique().notNullable()
      table.string('nama_indikator', 200).unique().notNullable()
      table.integer('nilai_min').unsigned().notNullable()
      table.integer('nilai_max').unsigned().notNullable()
      table.text('keterangan').default(null)
      table.timestamps()
    })
  }

  down () {
    this.drop('aspek_penilaian')
  }
}

module.exports = AspekPenilaianSchema
