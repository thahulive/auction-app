<template>
  <v-layout>
    <v-flex class="text-center" >
      <v-row justify="start">
        <v-col>
          <h1>
            Latest Auctions
          </h1>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          v-for="auction in auctions"
          :key="auction.id"
          cols="10"
        >
          <v-card >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title v-text="auction.title" ></v-card-title>
                <v-card-subtitle class="text-left"> 
                  {{ auction.__meta__.bids_count }} Bids -
                  {{ $moment(auction.created_at).fromNow() }}
                </v-card-subtitle>
                <v-card-text class="text-left" v-text="auction.description.substring(0,300)+'..'"></v-card-text>
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                tile
              >
              <v-btn small color="primary" :to="`/auctions/bid/${auction.id}`">Bid Now</v-btn>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    auctions() {
      return this.$store.getters['auctions']
    }
  },
  async fetch({ store }) {
    await store.dispatch('latestAuctions')
  }
  
}
</script>
