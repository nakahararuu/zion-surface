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
    {src: '~plugins/nuxt-video-player-plugin.js', ssr: false}
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
    '@nuxtjs/pwa'
  ],
  /*
  ** Proxy Config
  */
  proxy: {
    '/json': {target: 'http://backend:8000', pathRewrite: {'^/json/': ''}},
    '/movie': {target: 'http://backend:8000/SampleVideo_1280x720_2mb.mp4', pathRewrite: {'.*': ''}}
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
