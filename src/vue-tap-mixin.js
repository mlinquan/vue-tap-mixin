const VueTapMixin = {
  install: function (Vue) {
    Vue.$tapEventCache = {}
    Vue.mixin({
      mounted() {
        const vm = this
        if(vm.$listeners.tap) {
          vm.$el.addEventListener('touchstart', (e) => {
            Vue.$tapEventCache[vm._uid] = {
              timeStamp: e.timeStamp,
              changedTouches: e.changedTouches[0]
            }
          }, false)
          vm.$el.addEventListener('touchend', (e) => {
            let moveX = Math.abs(e.changedTouches[0].screenX - Vue.$tapEventCache[vm._uid].changedTouches.screenX)
            let moveY = Math.abs(e.changedTouches[0].screenY - Vue.$tapEventCache[vm._uid].changedTouches.screenY)
            let timeStamp = e.timeStamp - Vue.$tapEventCache[vm._uid].timeStamp
            if(moveX <= 6 && moveY <= 6 && timeStamp <= 300) {
              e.preventDefault()
              vm.$listeners.tap.call(vm, e)
            }
          }, false)
        }
      },
      beforeDestroy() {
        const vm = this
        delete Vue.$tapEventCache[vm._uid]
      }
    })
  }
}

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(VueTapMixin)
}

export default VueTapMixin