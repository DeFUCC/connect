export default {
  data() {
    return {
      ios: false,
      granted: false,
      orientation: 0,
    }
  },
  template: `
    <div>
        <button v-if="ios && !granted" @click="requestAccess">Access Orientation</button>
    </div>
  `,
  mounted() {
    if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
      this.ios = true
    }
    this.addListener();
  },
  methods: {
    addListener() {

      window.addEventListener("deviceorientation", (e) => {
        let {
          alpha,
          beta,
          gamma
        } = e
        this.orientation = {
          alpha: alpha.toFixed(2),
          beta: beta.toFixed(2),
          gamma: gamma.toFixed(2)
        }
        this.$emit('orient', this.orientation)
      })
    },
    requestAccess() {
      DeviceOrientationEvent.requestPermission()
        .then(response => {
          if (response == 'granted') {
            this.granted = true;
            this.addListener();
          }
        })
    },
  }
}
