<template>
  <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Register</v-toolbar-title>
                    <v-spacer />
                </v-toolbar>
                <v-card-text>
                    <v-form>
                      <v-text-field
                        label="Full Name"
                        name="full-name"
                        prepend-icon="mdi-account"
                        type="text"
                        v-model="login.full_name"
                    />
                    <v-text-field
                        label="Email"
                        name="email"
                        prepend-icon="mdi-account"
                        type="text"
                        v-model="login.email"
                    />

                    <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        prepend-icon="mdi-lock"
                        type="password"
                        v-model="login.password"
                    />
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" @click="userLogin">Login</v-btn>
                </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      login: {
        full_name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local', { data: this.login })
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
