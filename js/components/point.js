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
  },
  created() {

  },
  template: `
        <div v-if="point.online" class="point" :style="{
          backgroundColor:$color.hex(point.key),
          top: point.y +'px',
          left: point.x +'px',
        }">
             {{age}}
        </div>
  `,
  watch: {

  },
  methods: {

  },
}
