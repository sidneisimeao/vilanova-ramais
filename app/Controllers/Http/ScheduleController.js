'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')
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
  async index({ view, request }) {
    let search = request.input('search') || ''

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
      .where(function () {
        if (search) {
          this.whereRaw(`schedules.name like '%${search}%'`)
        }
      })
      .orderByRaw('departments.name, schedules.name asc')

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

    return view.render('schedules.index', { dataGroupedByBranch, search })
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
  async create({ view }) {
    const departments = await Department.all()

    return view.render('schedules.edit', {
      schedule: {},
      departments: departments.toJSON(),
      action: 'store.schedule'
    })
  }

  /**
   * Create/save a new schedule.
   * POST schedules
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, session }) {
    const data = request.only(['name', 'phone', 'department_id'])
    const schedule = await Schedule.create({ ...data })
    session.flash({ successmessage: 'Operação realizada com sucesso!' })
    return response.route('index.schedule')
  }

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

    const departments = await Department.all()

    return view.render('schedules.edit', {
      schedule: schedule.toJSON(),
      departments: departments.toJSON(),
      action: 'update.schedule'
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
  async update({ params, request, response, session }) {
    const schedule = await Schedule.find(params.id)
    const data = request.only(['name', 'phone', 'department_id'])
    schedule.merge(data)
    await schedule.save()
    session.flash({ successmessage: 'Operação realizada com sucesso!' })
    return response.route('index.schedule')
  }

  /**
   * Delete a schedule with id.
   * DELETE schedules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, session, response }) {
    const schedule = await Schedule.findOrFail(params.id)
    await schedule.delete()

    session.flash({ successmessage: 'Operação realizada com sucesso!' })

    return response.route('index.schedule')
  }
}

module.exports = ScheduleController
