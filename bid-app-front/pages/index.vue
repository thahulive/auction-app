<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card
            color="#385F73"
            dark
          >
            <v-card-title class="headline">Unlimited music now</v-card-title>

            <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>

            <v-card-actions>
              <v-btn text>Listen Now</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col
          v-for="(item, i) in 10"
          :key="i"
          cols="12"
        >
          <v-card
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="'name'"
                ></v-card-title>

                <v-card-subtitle v-text="'title'"></v-card-subtitle>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  auth: false,
  components: {
  }
}
</script>
