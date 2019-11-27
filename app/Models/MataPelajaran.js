'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MataPelajaran extends Model {
  static get table() {
    return 'mata_pelajaran'
  }
}

module.exports = MataPelajaran
