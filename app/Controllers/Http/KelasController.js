'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Kelas = use('App/Models/Kelas')
const { validate } = use('Validator')
const { generateCode } = use('App/Helpers/GenerateCode')

/**
 * Resourceful controller for interacting with kelas
 */
class KelasController {
  /**
   * Show a list of all kelas.
   * GET kelas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
    const kelas = await Kelas.all()

    return response.json({
      error: false,
      data: kelas
    })
  }

  /**
   * Create/save a new kela.
   * POST kelas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const validation = await validate(request.all(), {
      nama: 'required|unique:kelas,nama',
      kelas: 'required|integer',
      jurusan: 'required'
    })

    if(validation.fails()) {
      return response.json({
        error: true,
        message: validation.messages()
      })
    }

    const kelas = new Kelas()
    kelas.nama = request.input('nama')
    kelas.kelas = request.input('kelas')
    kelas.jurusan = request.input('jurusan')
    kelas.kode = await generateCode('kelas', 'CLS')
    await kelas.save()

    return response.json({
      error: false,
      data: kelas
    })
  }

  /**
   * Display a single kela.
   * GET kelas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response }) {
    const kelas = await Kelas.findBy('kode', params.kode)

    if(kelas !== null) {
      return response.json({
        error: false,
        data: kelas
      })
    } else {
      return response.json({
        error: true,
        message: 'Kelas tidak ditemukan!'
      })
    }

  }

  /**
   * Update kela details.
   * PUT or PATCH kelas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const validation = await validate(request.all(), {
      nama: 'required',
      kelas: 'required|integer',
      jurusan: 'required'
    })

    if (validation.fails()) {
      return response.json({
        error: true,
        message: validation.messages()
      })
    }

    const kelas = await Kelas.findBy('kode', params.kode)
    kelas.nama = request.input('nama')
    kelas.kelas = request.input('kelas')
    kelas.jurusan = request.input('jurusan')
    await kelas.save()

    return response.json({
      error: false,
      data: kelas
    })
  }

  /**
   * Delete a kela with id.
   * DELETE kelas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const kelas = await Kelas.findBy('kode', params.kode)
    if((kelas !== null) && (kelas.delete())) {
      return response.json({
        error: false,
        message: 'Kelas berhasil dihapus!'
      })
    } else {
      return response.json({
        error: false,
        message: 'Kelas tidak ditemukan!'
      })
    }
  }
}

module.exports = KelasController
