'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AuctionSchema extends Schema {
  up () {
    this.create('auctions', (table) => {
      table.increments()
      table.integer('user_id')
      table.integer('approved_bid')
      table.string('title', 255).notNullable()
      table.text('description')
      table.string('min_price')
      table.timestamps()
    })
  }

  down () {
    this.drop('auctions')
  }
}

module.exports = AuctionSchema
