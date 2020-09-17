'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')
const Department = use('App/Models/Department')
const Branch = use('App/Models/Branch')

/**
 * Resourceful controller for interacting with departments
 */
class DepartmentController {
  /**
   * Show a list of all departments.
   * GET departments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const departments = await Database.select([
      'departments.id',
      'departments.name',
      'branches.id as branch_id',
      'branches.name as branch_name'
    ])
      .from('departments')
      .innerJoin('branches', 'branches.id', 'departments.branch_id')
      .orderByRaw('departments.name')

    // Agrupa por departamento
    const dataGroupedByBranch = departments.reduce((grouped, obj) => {
      const key = obj['branch_id']
      if (!grouped[key]) {
        grouped[key] = []
      }
      // Agrupa por chave valor
      grouped[key].push(obj)
      return grouped
    }, {})

    return view.render('departments.index', { dataGroupedByBranch })
  }

  /**
   * Render a form to be used for creating a new department.
   * GET departments/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    const branches = await Branch.all()

    return view.render('departments.edit', {
      department: {},
      branches: branches.toJSON(),
      action: 'store.department'
    })
  }

  /**
   * Create/save a new department.
   * POST departments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, session }) {
    const data = request.only(['name', 'branch_id'])
    const department = await Department.create({ ...data })
    session.flash({ successmessage: 'Operação realizada com sucesso!' })
    return response.route('index.department')
  }

  /**
   * Display a single department.
   * GET departments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing department.
   * GET departments/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, view }) {
    const department = await Department.find(params.id)

    const branches = await Branch.all()

    return view.render('departments.edit', {
      department: department.toJSON(),
      branches: branches.toJSON(),
      action: 'update.department'
    })
  }

  /**
   * Update department details.
   * PUT or PATCH departments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, session }) {
    const department = await Department.find(params.id)
    const data = request.only(['name', 'branch_id'])
    department.merge(data)
    await department.save()
    session.flash({ successmessage: 'Operação realizada com sucesso!' })
    return response.route('index.department')
  }

  /**
   * Delete a department with id.
   * DELETE departments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = DepartmentController
