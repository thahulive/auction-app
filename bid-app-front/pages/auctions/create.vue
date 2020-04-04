<template>
  <v-layout>
    <v-flex class="text-center" >
      <v-row justify="start">
        <v-col>
          <h1>
            New Auction
          </h1>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card ref="form">
            <v-card-text>
              <v-text-field
                v-model="auction.title"
                :rules="[() => !!auction.title || 'This field is required']"
                label="Title"
                placeholder="Long Auction Title"
                required
              ></v-text-field>
              <v-textarea
                v-model="auction.description"
                label="Auction Description"
                :rules="[() => !!auction.description || 'This field is required']"
                auto-grow
                required
              ></v-textarea>
              <v-text-field
                v-model="auction.min_price"
                label="Minimam Price"
                placeholder="Minimam Price"
                required
              ></v-text-field>
            </v-card-text>
            <v-divider class="mt-12"></v-divider>
            <v-card-actions>
              <v-btn text>Cancel</v-btn>
              <v-spacer></v-spacer>
              
              <v-btn color="primary" text @click="submit">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  middleware: 'admin',
  data: () => ({
    auction: {
      title: '',
      description: '',
      min_price: ''
    }
  }),
  async asyncData ({ $axios }) {
    const data = await $axios.$get(`auctions`)
    return { auctions: data}
  },
  methods: {
    async submit () {
      const res = await this.$axios.$post('auctions/create', this.auction)
      console.log(res)
    },
  }
  
}
</script>
