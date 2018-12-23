export default function({ store, app }) {
  if (store.state.auth.loggedIn) {
    const token = app.$cookies.get("auth._token.local").slice(7)
    app.$cookies.set("jwt_token", token)
  }
}
