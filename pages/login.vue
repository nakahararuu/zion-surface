<template>
  <VFlex xs12 sm8 md4>
    <VCard class="elevation-12">
      <VToolbar dark> <VToolbarTitle>Login form</VToolbarTitle> </VToolbar>
      <VCardText>
        <VForm>
          <VTextField
            v-model="username"
            prepend-icon="person"
            name="login"
            label="Login"
            type="text"
          />
          <VTextField
            v-model="password"
            prepend-icon="lock"
            name="password"
            label="Password"
            type="password"
          />
        </VForm>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn @click="login()">Login</VBtn>
      </VCardActions>
    </VCard>
  </VFlex>
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
