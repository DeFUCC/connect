import {throttle} from '../tools.js'

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
      this.requestAccess()
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
        let throttledEmitter = throttle(this.$emit, 20)
        throttledEmitter('orient', this.orientation)
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
