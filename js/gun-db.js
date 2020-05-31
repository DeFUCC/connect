const gun = new Gun([
  'https://gun-vue.glitch.me/gun'
])

export default gun

export const myGun = gun.get('syncer')

