'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AspekPenilaian extends Model {
  static get table() {
    return 'aspek_penilaian'
  }
}

module.exports = AspekPenilaian
