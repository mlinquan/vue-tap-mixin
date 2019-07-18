'use strict';

var inBrowser = typeof window !== 'undefined';
var supportsPassive = false;
var supportsTouchstart = inBrowser && 'ontouchstart' in window;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}
var normalizeEvent = cached(function(name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function cached(fn) {
  var cache = Object.create(null);
  return (function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}
var VueTapMixin = {
  install: function(Vue) {
    Vue.mixin({
      mounted: function mounted() {
        this.bindTapEvent(this._vnode);
      },
      updated: function updated() {
        this.bindTapEvent(this._vnode);
      },
      methods: {
        bindTapEvent: function bindTapEvent(el) {
          var vm = this;
          if (el.children) {
            el.children.forEach((child) => {
              if (child.tag) {
                vm.bindTapEvent(child);
              }
            });
          }
          if (el.elm.tapEventData) {
            return
          }
          el.elm.tapEventData = {};
          var on = (el.data && el.data.on);
          if (!on) {
            return
          }
          for (name in on) {
            var cb = on[name];
            var event = normalizeEvent(name);
            if (event.name === 'tap' || event.name === 'click') {
              if (event.name === 'click' && !supportsTouchstart) {
                return;
              }

              if (event.name === 'tap' && !supportsTouchstart) {
                function clickEvent(e) {
                  if (event.once) {
                    el.elm.removeEventListener('click', clickEvent);
                  }
                  return cb.call(null, e);
                }

                el.elm.addEventListener(
                  'click',
                  clickEvent,
                  supportsPassive ?
                  { capture: event.capture, passive: event.passive } :
                  event.capture
                );

                return;
              }

              function touchstartEvent(e) {
                e.preventDefault(); //阻止 ghost click
                el.elm.tapEventData = {
                  timeStamp: e.timeStamp,
                  changedTouches: e.changedTouches[0]
                };
              }

              function touchendEvent(e) {
                var moveX = Math.abs(e.changedTouches[0].screenX - el.elm.tapEventData.changedTouches.screenX);
                var moveY = Math.abs(e.changedTouches[0].screenY - el.elm.tapEventData.changedTouches.screenY);
                var timeStamp = e.timeStamp - el.elm.tapEventData.timeStamp;
                if (moveX <= 6 && moveY <= 6 && timeStamp <= 300) {
                  if (event.once) {
                    el.elm.removeEventListener('touchstart', touchstartEvent);
                    el.elm.removeEventListener('touchend', touchendEvent);
                  }
                  return cb.call(null, e);
                }
              }

              el.elm.addEventListener(
                'touchstart',
                touchstartEvent,
                supportsPassive ?
                { capture: event.capture, passive: event.passive } :
                event.capture
              );

              el.elm.addEventListener(
                'touchend',
                touchendEvent,
                supportsPassive ?
                { capture: event.capture, passive: event.passive } :
                event.capture
              );

            }
          }
        }
      }
    });
  }
};

if (inBrowser && window.Vue) {
  window.Vue.use(VueTapMixin);
}

module.exports = VueTapMixin;
