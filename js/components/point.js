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
      pos: Ola({x:0,y:0}),
      loop: {},
    }
  },
  watch: {

  },
  computed: {
    age() {
      if (this.point.updated) {
        return Math.floor((this.point.updated - this.point.connected)/1000)
      }
        return null
    },
    top() {
      return Math.floor(this.pos.y * document.documentElement.clientHeight) + 'px'
    },
    left() {
      return Math.floor(this.pos.x * document.documentElement.clientWidth) + 'px'
    },
  },
  created() {
    this.loop = setInterval(() => {
      this.pos.x = this.point.x;
      this.pos.y = this.point.y
    }, 10);
  },
  template: `
        <div class="point" :style="{
          backgroundColor:$color.hex(point.key),
        }">
             

             <div class="pointer" :style="{
               backgroundColor:$color.hex(point.key),
               top, left
             }">
             </div>
        </div>
  `,
  methods: {

  },
  beforeDestroy() {
    clearTimeout(this.loop)
  }
}
