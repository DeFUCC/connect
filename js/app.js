Vue.use(vueCompositionApi.default)

import {sync} from './gun-db.js'
import {useMove} from './use/useMove.js'
// import {useGunPoint} from './use/useGunPoint.js'

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
      ...useMove()
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
    let myId = localStorage.getItem('me')
    let me = {
      connected: Gun.state(),
      online:true,
    };
    let gunMe
    if (!myId) {
      gunMe = sync.set(me);
    } else {
      gunMe = sync.get(myId).put(me)
    }

    gunMe.once((data,key) => {
      this.me = key
      localStorage.setItem('me',key)
    })

    sync.map().on((data, key) => {
      data.key = key;
      this.$set(this.points, key, data)
    })

    const interval = setInterval(() => {
      this.now = Gun.state();
      if (this.me) {
        sync.get(this.me).put({
          updated: Gun.state(),
        })
      }
    }, 500);

    window.addEventListener('beforeunload', () => {
      sync.get(myId).put({
        online:false,
      })
    });
  },
  watch: {
    position: {
      deep: true,
      handler(pos) {
        sync.get(this.me).put(pos)
      }
    },
  },
  methods: {


    orient(orientation) {
      sync.get(this.me).put(orientation)
    },

  },
})
