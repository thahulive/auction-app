<template>
  <v-app >
    <v-app-bar
      fixed
      app
    >
      
      <v-toolbar-title v-text="'Bid App'" />
        <v-spacer />
        <v-btn
          v-if="$auth.loggedIn"
          @click.stop="logout"
        >
          Sign Out
        </v-btn>
        <v-btn
          v-else
          @click.stop="loginPage"
        >
          Sign In
        </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    
    <v-footer
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    logout () {
      this.$auth.logout()
      this.$router.push('/')
    },
    loginPage () {
      this.$router.push('/login')
    }
  }
}
</script>
