'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var VueTapMixin = {
  install: function install(Vue) {
    Vue.$tapEventCache = {};
    Vue.mixin({
      mounted: function mounted() {
        var vm = this;
        if (vm.$listeners.tap) {
          vm.$el.addEventListener('touchstart', function (e) {
            Vue.$tapEventCache[vm._uid] = {
              timeStamp: e.timeStamp,
              changedTouches: e.changedTouches[0]
            };
          }, false);
          vm.$el.addEventListener('touchend', function (e) {
            var moveX = Math.abs(e.changedTouches[0].screenX - Vue.$tapEventCache[vm._uid].changedTouches.screenX);
            var moveY = Math.abs(e.changedTouches[0].screenY - Vue.$tapEventCache[vm._uid].changedTouches.screenY);
            var timeStamp = e.timeStamp - Vue.$tapEventCache[vm._uid].timeStamp;
            if (moveX <= 6 && moveY <= 6 && timeStamp <= 300) {
              e.preventDefault();
              vm.$listeners.tap.call(vm, e);
            }
          }, false);
        }
      },
      beforeDestroy: function beforeDestroy() {
        var vm = this;
        delete Vue.$tapEventCache[vm._uid];
      }
    });
  }
};

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(VueTapMixin);
}

exports.default = VueTapMixin;
