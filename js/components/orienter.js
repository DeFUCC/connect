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
  mounted() {
    if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
      this.ios = true
    }

    this.addListener();

  },
  methods: {
    addListener() {
      window.addEventListener( "deviceorientation", (e) => {
                  this.orientation = e.alpha
               }, true)
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
