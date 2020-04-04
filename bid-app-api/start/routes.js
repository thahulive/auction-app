'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route
  .post('/auth/login', 'AuthController.login')
  .middleware('guest')

Route
  .post('/auth/logout', 'AuthController.logout')
  .middleware('auth')

Route
  .post('/auth/register', 'AuthController.register')
  .middleware('guest')

Route
  .get('auth/user', 'AuthController.user')
  .middleware('auth')

Route
  .get('auctions', 'AuctionController.all')
  // .middleware('auth')
Route
  .post('auctions/create', 'AuctionController.create')
  .middleware('auth')
Route
  .get('auctions/:id', 'AuctionController.get')
  .middleware('auth')
Route
  .post('auctions/:id/bid', 'AuctionController.createBid')
  .middleware('auth')
Route
  .post('auctions/:id/bid/approve', 'AuctionController.approveBid')
  .middleware('auth')
Route
  .delete('auctions/:id/bid/revoke', 'AuctionController.revokeBid')
  .middleware('auth')