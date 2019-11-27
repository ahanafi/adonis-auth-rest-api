'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class GuruMapel extends Model {
  static get table() {
    return 'guru_mapel'
  }

  mata_pelajaran() {
    return this.belongsToMany('App/Models/MataPelajaran')
  }
}

module.exports = GuruMapel
