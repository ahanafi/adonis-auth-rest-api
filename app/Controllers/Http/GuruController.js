'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Guru = use('App/Models/Guru')
const { validate } = use('Validator')
const { generateCode } = use('App/Helpers/GenerateCode')

/**
 * Resourceful controller for interacting with gurus
 */
class GuruController {
  /**
   * Show a list of all gurus.
   * GET gurus
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
    const guru = await Guru.all()
    return response.json({
      error: false,
      data: guru
    })
  }

  /**
   * Create/save a new guru.
   * POST gurus
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const validation = await validate(request.all(), {
      nama: 'required|string',
      jk: 'required',
      telpon: 'required',
      alamat: 'required'
    })

    if(validation.fails()) {
      return response.json({
        error: true,
        message: validation.messages()
      })
    }

    const guru = new Guru()
    guru.kode = await generateCode('guru', 'TCH')
    guru.nama = request.input('nama')
    guru.telpon = request.input('telpon')
    guru.alamat = request.input('alamat')
    guru.jk = request.input('jk')
    await guru.save()

    return response.json({
      error: false,
      data: guru
    })
  }

  /**
   * Display a single guru.
   * GET gurus/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response }) {
    const guru = await Guru.findBy('kode', params.kode)
    if(guru !== null) {
      return response.json({
        error: false,
        data: guru
      })
    } else {
      return response.json({
        error: true,
        message: 'Guru tidak ditemukan!'
      })
    }
  }

  /**
   * Update guru details.
   * PUT or PATCH gurus/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const validation = await validate(request.all(), {
      nama: 'required|string',
      jk: 'required',
      telpon: 'required',
      alamat: 'required'
    })

    if (validation.fails()) {
      return response.json({
        error: true,
        message: validation.messages()
      })
    }

    const guru = await Guru.findBy('kode', params.kode)
    guru.nama = request.input('nama')
    guru.telpon = request.input('telpon')
    guru.alamat = request.input('alamat')
    guru.jk = request.input('jk')
    await guru.save()

    return response.json({
      error: false,
      data: guru
    })
  }

  /**
   * Delete a guru with id.
   * DELETE gurus/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const guru = await Guru.findBy('kode', params.kode)
    if (guru !== null && guru.delete()) {
      return response.json({
        error: false,
        message: 'Guru berhasil dihapus!'
      })
    } else {
      return response.json({
        error: true,
        message: 'Guru tidak ditemukan!'
      })
    }
  }
}

module.exports = GuruController
