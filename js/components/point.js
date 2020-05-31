Vue.prototype.$color = new ColorHash({
  saturation:[0.4, 0.65, 0.8],
  lightness: [0.55, 0.65, 0.85]
});

export default {
  props: {
    point: Object,
  },
  data() {
    return {

    }
  },
  computed: {
    age() {
      if (this.point.updated) {
        return Math.floor((this.point.updated - this.point.connected)/1000)
      }
        return null
    },
    top() {
      return Math.floor(this.point.y * document.documentElement.clientHeight) + 'px'
    },
    left() {
      return Math.floor(this.point.x * document.documentElement.clientWidth) + 'px'
    },
  },
  created() {

  },
  template: `
        <div class="point" :style="{
          backgroundColor:$color.hex(point.key),
        }">
             {{age}}

             <div class="pointer" :style="{
               backgroundColor:$color.hex(point.key),
               top, left
             }">
             </div>
        </div>
  `,
  watch: {

  },
  methods: {

  },
}
