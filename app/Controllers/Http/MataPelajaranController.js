'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const MataPelajaran = use('App/Models/MataPelajaran')
const { validate } = use('Validator')
const { generateCode } = use('App/Helpers/GenerateCode')

/**
 * Resourceful controller for interacting with matapelajarans
 */
class MataPelajaranController {
  /**
   * Show a list of all matapelajarans.
   * GET matapelajarans
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const mata_pelajaran = await MataPelajaran.all()
    return response.json({
      error: false,
      data: mata_pelajaran
    })
  }

  /**
   * Create/save a new matapelajaran.
   * POST matapelajarans
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const validation = await validate(request.all(), {
      nama: 'required|unique:mata_pelajaran,nama'
    })

    if(validation.fails()) {
      return response.json({
        error: true,
        message: validation.messages()
      })
    }

    const mapel = new MataPelajaran()
    mapel.kode = await generateCode('mata_pelajaran', 'MPL')
    mapel.nama = request.input('nama')
    await mapel.save()

    return response.json({
      error: false,
      data: mapel
    })
  }

  /**
   * Display a single matapelajaran.
   * GET matapelajarans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    const mapel = await MataPelajaran.findBy('kode', params.kode)
    if(mapel !== null) {
      return response.json({
        error: false,
        data: mapel
      })
    } else {
      return response.json({
        error: true,
        data: 'Mata pelajaran tidak ditemukan!'
      })
    }
  }


  /**
   * Update matapelajaran details.
   * PUT or PATCH matapelajarans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const validation = await validate(request.all(), {
      nama: 'required'
    })

    if (validation.fails()) {
      return response.json({
        error: true,
        message: validation.messages()
      })
    }

    const mapel = await MataPelajaran.findBy('kode', params.kode)
    mapel.nama = request.input('nama')
    await mapel.save()

    return response.json({
      error: false,
      data: mapel
    })
  }

  /**
   * Delete a matapelajaran with id.
   * DELETE matapelajarans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const mapel = await MataPelajaran.findBy('kode', params.kode)
    if(mapel !== null && mapel.delete()) {
      return response.json({
        error: false,
        message: 'Mata pelajaran berhasil dihapus!'
      })
    } else {
      return response.json({
        error: true,
        data: 'Mata pelajaran tidak ditemukan!'
      })
    }
  }
}

module.exports = MataPelajaranController
