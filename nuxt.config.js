export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - trello-clone',
    title: 'trello-clone',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/styles.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/filters',
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyBnhvquYOEmeP-_zRDEEd-FrVA2uTX-pac",
          authDomain: "trello-clone-c6770.firebaseapp.com",
          projectId: "trello-clone-c6770",
          storageBucket: "trello-clone-c6770.appspot.com",
          messagingSenderId: "114356150824",
          appId: "1:114356150824:web:9b39489384a5a1fe4dcb1d",
          measurementId: "G-X9RPPLFCML"
        },
        services: {
          auth: {
            persistence: 'local', // default
            initialize: {
              onAuthStateChangedAction: 'onAuthStateChangedAction',
              subscribeManually: false
            },
            ssr: false, // default
          },
          firestore: {
            memoryOnly: false, // default
            chunkName: process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '[id]', // default
            enablePersistence: true,
            emulatorPort: 8080,
            emulatorHost: 'localhost',
            settings: {
              experimentalForceLongPolling: true,
              merge: true,
              // Firestore Settings - currently only works in SPA mode
            }
          },
          storage: true,
        }
        
      }
    ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  router:{
    middleware:['auth']
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
