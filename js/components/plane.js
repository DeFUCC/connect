import {sync} from '../gun-db.js'
import {useMove} from '../use/useMove.js'
import {useGunPoint} from '../use/useGunPoint.js'

import pointer from './pointer.js'
import orienter from './orienter.js'


export const plane = {
  components: {
    orienter,
    pointer,
  },
  template:`
    <main @touchmove="move" @mousemove="move" class="full" @click="clickLock">
      <orienter @orient="orient"></orienter>
      <pointer :class="{own:point.key==key}" v-for="(pointer, key) in activePoints" :key="key" :point="pointer"></pointer>
    </main>
  `,
  setup() {
    return {
      ...useMove(),
      ...useGunPoint(),
    }
  },
  data() {
    return {
      points:{},
    }
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
}
