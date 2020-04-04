<template>
  <v-layout>
    <v-flex class="text-center" >
      <v-row justify="start">
        <v-col>
            <h1>
            {{ auction.title }}
            </h1>
            <p>{{ auction.bids.length }} Bids - {{ $moment(auction.created_at).fromNow() }}</p>
            <p class="text-left"> 
                {{ auction.description}}
            </p>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          cols="5"
        >
          <v-card class="mb-4"
            v-for="bid in auction.bids.slice().reverse()"
            :key="bid.id">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title v-text="bid.customer.full_name" ></v-card-title>
                <v-card-subtitle class="text-left">
                  {{ $moment(bid.created_at).fromNow() }}
                </v-card-subtitle>
              </div>
              <div>
                <v-card-title  >{{ bid.amount }}</v-card-title>
              </div>
              <div v-if="!auction.approved_bid && auction.user_id == $auth.user.id">
                  <v-card-title  >
                      <v-btn small color="primary" @click.stop="approve(bid)">Approve</v-btn>
                  </v-card-title>
              </div>
              <div v-if="auction.approved_bid && auction.approved_bid == bid.id  && auction.user_id == $auth.user.id">
                  <v-card-title  >
                      <v-btn small color="error" @click.stop="revoke">Revoke</v-btn>
                  </v-card-title>
              </div>
              
            </div>
          </v-card>
        </v-col>
        <v-col cols="4">
            <v-card class="mb-4" >
                <v-row class="ml-4" justify="center">
                    <v-col
                    md="6"
                    >
                        <v-text-field
                            v-model="bid.amount"
                            :rules="[() => !!bid.amount || 'This field is required']"
                            :label="'Min. Bid Amt. '+auction.min_price"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col
                    md="6"
                    class="mt-4"
                    >
                        <v-btn small color="primary" @click.stop="createBid">Bid Now</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    bid: {
      amount: ''
    }
  }),
//   async asyncData ({ $axios, params }) {
//     const data = await $axios.$get(`auctions/${params.id}`)
//     return { auction: data}
//   },
  computed: {
    auction() {
      return this.$store.getters['auction']
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('auction', params.id)
  },
  methods: {
    async createBid () {
      const res = await this.$axios.$post(`auctions/${this.auction.id}/bid`, this.bid)
      if(res == 'success') {
          await this.$store.dispatch('auction', this.auction.id).then(()=>{
              this.bid.amount = ' '
          })
      }
      console.log(res)
    },
    async approve (bid) {
        const res =  await this.$axios.$post(`auctions/${this.auction.id}/bid/approve`, {bid_id: bid.id})
        if(res == 'success') await this.$store.dispatch('auction', this.auction.id)
        console.log(res)
    },
    async revoke () {
        const res =  await this.$axios.$delete(`auctions/${this.auction.id}/bid/revoke`)
        if(res == 'success') await this.$store.dispatch('auction', this.auction.id)
        console.log(res)
    }
  }
  
}
</script>
