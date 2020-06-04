let {ref,reactive} = vueCompositionApi

export function useMove () {

  const position = reactive({
    x:0,
    y:0,
  })

  const lock = ref(false)

  function move(e) {
    if (lock.value) {
      let x,y;
      if (e.changedTouches) {
        x = e.changedTouches[0].pageX;
        y = e.changedTouches[0].pageY;
      } else {
        x = e.pageX;
        y = e.pageY;
      }
      let w = document.documentElement.clientWidth
      let h = document.documentElement.clientHeight

      position.x = 1 - (w - x)/w
      position.y = 1 - (h - y)/h

    }
  }

  function clickLock() {
    lock.value = !lock.value
  }

  return {
    position,
    lock,
    move,
    clickLock,
  }
}
