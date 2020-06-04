const gun = new Gun([
  'https://gun-vue.glitch.me/gun',
//  'http://192.168.1.2:4200/gun'
])

export default gun

export const sync = gun.get('sync')

const onlineCheck = setInterval(() => {

  sync.map().once((data, key) => {
    let state = Gun.state();
    let age = state - data.updated
    if (age > 5000 || !data.updated) {
      sync.get(key).put({
        online: false,
      })
    } else {
      sync.get(key).put({
        online: true,
      })
    }
  })

}, 5000);
