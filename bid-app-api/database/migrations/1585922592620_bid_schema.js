'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BidSchema extends Schema {
  up () {
    this.create('bids', (table) => {
      table.increments()
      table.integer('auction_id')
      table.integer('customer_id')
      table.string('amount')
      table.timestamps()
    })
  }

  down () {
    this.drop('bids')
  }
}

module.exports = BidSchema
