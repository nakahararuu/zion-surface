export default {
  /*
  ** Headers of the page
  */
  head: {
    title: 'tyaani',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js + Vuetify.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  plugins: [
    '~/plugins/vuetify.js',
    {src: '~plugins/nuxt-video-player-plugin.js', ssr: false},
    {src: '~/plugins/vue-virtual-scroller.js', ssr: false} // TODO virtual scroller should support SSR
  ],
  css: [
    '~/assets/style/app.styl',
    'video.js/dist/video-js.css'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Third party modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    'cookie-universal-nuxt'
  ],
  /*
  ** Proxy Config
  */
  proxy: {
    '/auth': {target: process.env.CORE_URL, pathRewrite: {'^/auth/': ''}},
    '/json': {target: process.env.CORE_URL},
    '/movie': {target: process.env.CORE_URL}
  },
  axios: {
    proxy: true
  },
  /*
  ** middleware
  */
  router: {
    middleware: ['auth', 'duplicate_jwt']
  },
  /*
  ** auth
  */
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/callback',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'auth/login',
            method: 'post',
            propertyName: false,
            headers: {'content-type': 'application/json'}
          },
          logout: false,
          user: {url: 'auth/user'} // TODO should replace to "user: false"
          // NOTE: https://github.com/nuxt-community/auth-module/issues/213
        }
      }
    }
  },
  /*
  ** PWA config
  */
  workbox: {
    dev: true
  },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, {isDev}) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
