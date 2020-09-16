'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Department extends Model {
  branch() {
    return this.belongsTo('App/Models/Branch')
  }

  schedules() {
    return this.hasMany('App/Models/Schedule')
  }
}

module.exports = Department
