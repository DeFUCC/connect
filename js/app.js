Vue.use(vueCompositionApi.default)

import {plane} from './components/plane.js'

const app = new Vue({
  el:'#app',
  components: {
    plane,
  },

})
