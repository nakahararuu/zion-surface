// avoid an error when token was expired
// https://github.com/nuxt-community/auth-module/issues/86
export default function({ $axios, app }) {
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status, 10)

    if ([401, 403].includes(code)) {
      app.$auth.logout()
    }

    return Promise.reject(error)
  })
}
