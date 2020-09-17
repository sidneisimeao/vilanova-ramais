'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')
const Department = use('App/Models/Department')
const Branch = use('App/Models/Branch')
const Schedule = use('App/Models/Schedule')
/**
 * Resourceful controller for interacting with apis
 */
class ApiController {
  /**
   * Show a list of all apis.
   * GET apis
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const schedules = await Database.select([
      'schedules.name as nome',
      'schedules.phone as ramal',
      'departments.name as departamento'
    ])
      .from('schedules')
      .innerJoin('departments', 'departments.id', 'schedules.department_id')
      .innerJoin('branches', 'branches.id', 'departments.branch_id')
      .orderByRaw('departments.name, schedules.name asc')

    return response
      .header('Content-type', 'application/json')
      .status(200)
      .json(schedules)
  }

  /**
   * Render a form to be used for creating a new api.
   * GET apis/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new api.
   * POST apis
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single api.
   * GET apis/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing api.
   * GET apis/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update api details.
   * PUT or PATCH apis/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a api with id.
   * DELETE apis/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = ApiController
