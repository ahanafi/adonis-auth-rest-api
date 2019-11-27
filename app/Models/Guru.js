'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Guru extends Model {
  static get table() {
    return 'guru'
  }

  mata_pelajaran() {
    return this.hasMany('App/Models/GuruMapel', 'kode', 'kode_guru')
  }
}

module.exports = Guru
