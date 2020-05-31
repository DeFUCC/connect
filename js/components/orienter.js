export default {
  data() {
    return {
      ios:false,
      granted: false,
      orientation: {},
    }
  },
  template:`
    <div>
        <button v-if="ios" @click="requestAccess">Orient</button>{{ios}} - {{granted}} -- {{orientation}}
    </div>
  `,
  created() {
    if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
      this.ios = true
    }
    if (!this.ios) {
      this.addListener();
    }
  },
  methods: {
    addListener() {
      window.addEventListener( "deviceorientation", (e) => {
                  this.orientation = e.alpha
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
