<template>
  <v-flex xs12 sm8 md4>
    <v-card class="elevation-12">
      <v-toolbar dark>
        <v-toolbar-title>Login form</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="username"
            prepend-icon="person"
            name="login"
            label="Login"
            type="text"
          />
          <v-text-field
            v-model="password"
            prepend-icon="lock"
            name="password"
            label="Password"
            type="password"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="login()">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  auth: false,
  data: function() {
    return {
      username: null,
      password: null
    }
  },
  layout: "account",
  methods: {
    login: function() {
      this.$auth
        .loginWith("local", {
          data: {
            username: this.username,
            password: this.password
          }
        })
        .then(() => this.$router.replace({ path: "/" }))
    }
  }
}
</script>
