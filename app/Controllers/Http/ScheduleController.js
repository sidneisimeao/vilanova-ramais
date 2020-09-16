'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')

const Branch = use('App/Models/Branch')
const Department = use('App/Models/Department')
const Schedule = use('App/Models/Schedule')

/**
 * Resourceful controller for interacting with schedules
 */
class ScheduleController {
  /**
   * Show a list of all schedules.
   * GET schedules
   * @param {View} ctx.view
   */
  async index({ view }) {
    const schedules = await Database.select([
      'schedules.id',
      'schedules.name',
      'schedules.phone',
      'departments.name as department_name',
      'branches.id as branch_id',
      'branches.name as branch_name'
    ])
      .from('schedules')
      .innerJoin('departments', 'departments.id', 'schedules.department_id')
      .innerJoin('branches', 'branches.id', 'departments.branch_id')

    // Agrupa por departamento
    const dataGroupedByBranch = schedules.reduce((grouped, obj) => {
      const key = obj['branch_id']
      if (!grouped[key]) {
        grouped[key] = []
      }
      // Agrupa por chave valor
      grouped[key].push(obj)
      return grouped
    }, {})

    console.log(dataGroupedByBranch)

    return view.render('schedules.index', { dataGroupedByBranch })
  }

  /**
   * Render a form to be used for creating a new schedule.
   * GET schedules/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new schedule.
   * POST schedules
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single schedule.
   * GET schedules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing schedule.
   * GET schedules/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, view }) {
    const schedule = await Schedule.find(params.id)
    return view.render('schedules.edit', {
      schedule: schedule.toJSON()
    })
  }
  /**
   * Update schedule details.
   * PUT or PATCH schedules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a schedule with id.
   * DELETE schedules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = ScheduleController
