Vue.prototype.$color = new ColorHash({
  saturation: [
    0.4, 0.65, 0.8
  ],
  lightness: [0.55, 0.65, 0.85]
});

export default {
  props: {
    point: Object
  },
  data() {
    return {
      loop: {}
    }
  },
  watch: {},
  computed: {
    age() {
      if (this.point.updated) {
        return Math.floor((this.point.updated - this.point.connected) / 1000)
      }
      return null
    },
    top() {
      return Math.floor(this.point.y * document.documentElement.clientHeight) + 'px'
    },
    left() {
      return Math.floor(this.point.x * document.documentElement.clientWidth) + 'px'
    }
  },
  created() {

  },
  template: `
        <div class="point" :style="{
          backgroundColor:$color.hex(point.key),
        }">


             <div class="pointer" :class="{orienter:point.alpha}" :style="{
               backgroundColor:$color.hex(point.key),
               top, left,
               transform: 'rotateZ('+(-point.alpha)+'deg)'+ ' rotateX('+(-point.beta)+'deg)' + ' rotateY('+(point.gamma)+'deg)'
             }">
             </div>
        </div>
  `,
  methods: {},
  beforeDestroy() {
    clearTimeout(this.loop)
  }
}
