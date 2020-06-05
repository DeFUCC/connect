Vue.use(vueCompositionApi.default)

import {sync} from './gun-db.js'
import {useMove} from './use/useMove.js'
import {useGunPoint} from './use/useGunPoint.js'

import {throttle} from './tools.js'

import point from './components/point.js'
import orienter from './components/orienter.js'

const app = new Vue({
  el:'#app',
  components: {
    point,
    orienter,
  },
  setup() {
    return {
      ...useMove(),
      ...useGunPoint(),
    }
  },
  data:{
    now: Date.now(),
    me: '',
    points:{},
  },

  computed: {
    activePoints() {
      let active = {}
      Object.values(this.points).forEach((point) => {
        if (point.online) {
          active[point.key] = point
        }
      })
      return active
    },
  },
  mounted() {

    sync.map().on((data, key) => {
      data.key = key;
      this.$set(this.points, key, data)
    })

  },
  watch: {
    position: {
      deep: true,
      handler(pos) {
        sync.get(this.point.key).put(pos)
      }
    },
  },
  methods: {
    orient(orientation) {
      sync.get(this.point.key).put(orientation)
    },
  },
})
