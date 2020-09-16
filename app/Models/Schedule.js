'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Schedule extends Model {
  department() {
    return this.belongsTo('App/Models/Department')
  }
}

module.exports = Schedule
