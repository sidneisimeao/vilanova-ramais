'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Branch extends Model {
  departments() {
    return this.hasMany('App/Models/Department')
  }
}

module.exports = Branch
