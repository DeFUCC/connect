import {myGun} from './gun-db.js'
import point from './components/point.js'



const app = new Vue({
  el:'#app',
  components: {
    point,
  },
  data:{
    now: Date.now(),
    text:'hello',
    position: {
      x:0,
      y:0,
    },
    lock:false,
    lockPosition: {
      x:0,
      y:0,
    },
    me: '',
    points:{},
  },
  watch: {

  },
  created() {

  },
  mounted() {
    let myId = localStorage.getItem('me')
    let me = {
      connected: Gun.state(),
      online:true,
    };
    let gunMe
    if (!myId) {
      gunMe = myGun.set(me);
    } else {
      gunMe = myGun.get(myId).put(me)
    }

    gunMe.once((data,key) => {
      this.me = key
      localStorage.setItem('me',key)
    })

    myGun.map().on((data, key) => {
      data.key = key;
      this.$set(this.points, key, data)
    })

    const interval = setInterval(() => {
      this.now = Gun.state();
      if (this.me) {
        myGun.get(this.me).put({
          updated: Gun.state(),
        })
      }
    }, 250);

    window.addEventListener('beforeunload', () => {
      myGun.get(myId).put({
        online:false,
      })
    });
  },
  methods: {
    move(e) {
      if (!this.lock) {
        let doc = document.documentElement
        let pos = {
          x: 1 - (doc.clientWidth - e.pageX)/doc.clientWidth,
          y: 1 - (doc.clientHeight - e.pageY)/doc.clientHeight,
        };
        this.position = pos
        myGun.get(this.me).put(pos)
      }
    },
    click(e) {
      this.lock=!this.lock
    },
  },
  beforeDestroy() {

  }
})
