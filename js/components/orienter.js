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
      window.addEventListener( "devicemotion", (e) => {
                  this.orientation = e
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
