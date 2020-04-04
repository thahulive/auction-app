'use strict'

const Auction = use('App/Models/Auction')
const Bid = use('App/Models/Bid')
const Logger = use('Logger')

class AuctionController {

    async create ({ auth, request }) {
        
        const { title, description, min_price } = request.all()
        
        const user = auth.user
        
        const auction = new Auction()
        
        auction.title = title
        auction.description = description
        auction.min_price = min_price
        try {
            const newAuction = await user.auctions().save(auction)
            if(newAuction)
            return 'success'
        } catch (error) {
            Logger.info(error)
        }
        return 'error'
    }

    async all ({ auth, request }) {
        return await Auction.query()
            .withCount('bids')
            .orderBy('updated_at','desc')
            .fetch()
    }

    async get ({ params, request}) {
        const auction = await Auction.find(params.id)
        await auction.loadMany(['user','bids','bids.customer'])
        return auction
    }

    async createBid ({ auth, params, request}) {
        const { amount } = request.all()
        const auction = await Auction.find(params.id)
        if(auction.min_price != null && parseFloat(auction.min_price) > parseFloat(amount))
            return 'Low Bid Price'
        const newBid = await auction.bids().create({ customer_id: auth.user.id , amount })
        if(newBid) return 'success'
        return 'error'
    }

    async approveBid ({ auth, params, request}) {
        const { bid_id } = request.all()
        try {
            const auction = await Auction.query().where('id',params.id).update({ approved_bid: bid_id })
            if(auction) return 'success'
        } catch (error) {
            Logger.info(error)
        }
        return 'error'
    }

    async revokeBid ({ auth, params, request}) {
        try {
            const auction = await Auction.query().where('id',params.id).update({ approved_bid: null })
            if(auction) return 'success'
        } catch (error) {
            Logger.info(error)
        }
        return 'error'
    }
}

module.exports = AuctionController
