'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bid extends Model {
    user () {
        return this.belongsTo('App/Models/User')
    }
    customer () {
        return this.belongsTo('App/Models/User', 'customer_id', 'id')
    }
}

module.exports = Bid
