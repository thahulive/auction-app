/* eslint no-console: off */
export default {
  async latestAuctions({ commit }, payload) {
    try {
      let auctions = await this.$axios.$get(`auctions`)
      await commit('AUCTIONS', auctions)
    } catch (e) {
      console.log(e.response) // undefined
    }
  },
  async auction({ commit }, payload) {
    try {
      let auction = await this.$axios.$get(`auctions/${payload}`)
      await commit('AUCTION', auction)
    } catch (e) {
      console.log(e.response) // undefined
    }
  }

}
