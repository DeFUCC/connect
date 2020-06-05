import {sync} from '../gun-db.js'

let { ref, reactive, onBeforeUnmount } = vueCompositionApi

export function useGunPoint() {

  const pointId = localStorage.getItem('pointId')

  const point = reactive({
    connected: Gun.state(),
    online:true,
    key: pointId,
  })

  let gunPoint

  if (!pointId) {
    gunPoint = sync.set(point)
  } else {
    gunPoint = sync.get(pointId).put(point)
  }

  gunPoint.once( (data, key) => {
    point.key = key
    localStorage.setItem('pointId',key)
  })

  const updater = setInterval(() => {
    if (point) {
      gunPoint.put({
        updated: Gun.state(),
      })
    }
  }, 500);

  window.addEventListener('beforeunload', () => {
    gunPoint.put({
      online:false,
    })
  });

  return {
    point,
    gunPoint
  }

}
