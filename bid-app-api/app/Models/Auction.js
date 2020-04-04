'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Auction extends Model {
    user () {
        return this.belongsTo('App/Models/User')
    }

    bids () {
        return this.hasMany('App/Models/Bid')
    }
}

module.exports = Auction
