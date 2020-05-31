const gun = new Gun([
  'https://gun-vue.glitch.me/gun',
  //'http://192.168.1.2:4200/gun'
])

export default gun

export const myGun = gun.get('syncer')

const interval = setInterval(() => {

  let state = Gun.state();

  myGun.map().once((data,key) => {
    if ((state-data.updated)>3000) {
      myGun.get(key).put({
        online:false,
      })
    }
  })

}, 3000);
