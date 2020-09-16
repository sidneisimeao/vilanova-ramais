'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScheduleSchema extends Schema {
  up() {
    this.alter('schedules', (table) => {
      table.string('phone', 20).notNullable()
    })
  }

  down() {
    this.alter('schedules', (table) => {
      table.dropColumn('phone')
    })
  }
}

module.exports = ScheduleSchema
