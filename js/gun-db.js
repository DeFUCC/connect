const gun = new Gun([
  'https://gun-vue.glitch.me/gun',
  'http://192.168.1.2:4200/gun'
])

export default gun

export const myGun = gun.get('syncer')

const interval = setInterval(() => {



  myGun.map().once((data,key) => {
    let state = Gun.state();
    let age = state-data.updated
    if (age>5000 || !data.updated) {
      myGun.get(key).put({
        online:false,
      })
    } else {
      myGun.get(key).put({
        online:true,
      })
    }
  })

}, 5000);
