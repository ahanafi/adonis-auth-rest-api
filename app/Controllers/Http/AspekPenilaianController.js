'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const AspekPenilaian = use('App/Models/AspekPenilaian')
const { validate } = use('Validator')
const { generateCode } = use('App/Helpers/GenerateCode')


/**
 * Resourceful controller for interacting with aspekpenilaians
 */
class AspekPenilaianController {
  /**
   * Show a list of all aspekpenilaians.
   * GET aspekpenilaians
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response }) {
    const aspek_penilaian = await AspekPenilaian.all()
    return response.json({
      error: false,
      data: aspek_penilaian
    })
  }

  /**
   * Create/save a new aspekpenilaian.
   * POST aspekpenilaians
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const validation = await validate(request.all(), {
      nama_indikator: 'required|min:10',
      nilai_min: 'integer|required',
      nilai_max: 'integer|required',
    })

    if(validation.fails()) {
      return response.json({
        error: true,
        message: validation.messages()
      })
    }

    const aspek_penilaian = new AspekPenilaian()
    aspek_penilaian.kode = await generateCode('aspek_penilaian', 'APN')
    aspek_penilaian.nama_indikator = request.input('nama_indikator')
    aspek_penilaian.nilai_min = request.input('nilai_min')
    aspek_penilaian.nilai_max = request.input('nilai_max')
    aspek_penilaian.keterangan = request.input('keterangan')
    await aspek_penilaian.save()

    return response.json({
      error: false,
      data: aspek_penilaian
    })
  }

  /**
   * Display a single aspekpenilaian.
   * GET aspekpenilaians/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    const aspek_penilaian = await AspekPenilaian.findBy('kode', params.kode)

    return response.json({
      error: false,
      data: aspek_penilaian
    })
  }

  /**
   * Update aspekpenilaian details.
   * PUT or PATCH aspekpenilaians/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const validation = await validate(request.all(), {
      nama_indikator: 'required|min:10',
      nilai_min: 'integer|required',
      nilai_max: 'integer|required',
    })

    if (validation.fails()) {
      return response.json({
        error: true,
        message: validation.messages()
      })
    }

    const aspek_penilaian = await AspekPenilaian.findBy('kode', params.kode)
    aspek_penilaian.nama_indikator = request.input('nama_indikator')
    aspek_penilaian.nilai_min = request.input('nilai_min')
    aspek_penilaian.nilai_max = request.input('nilai_max')
    aspek_penilaian.keterangan = request.input('keterangan')
    await aspek_penilaian.save()

    return response.json({
      error: false,
      data: aspek_penilaian
    })
  }

  /**
   * Delete a aspekpenilaian with id.
   * DELETE aspekpenilaians/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const aspek_penilaian = await AspekPenilaian.findBy('kode', params.kode)

    if(aspek_penilaian.delete()) {
      return response.json({
        error: false,
        message: 'Data berhasil dihapus!  '
      })
    }
  }
}

module.exports = AspekPenilaianController
