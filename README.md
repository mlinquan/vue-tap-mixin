# vue-tap-mixin
[![npm version](https://badge.fury.io/js/vue-tap-mixin.svg)](https://badge.fury.io/js/vue-tap-mixin)
[![Gzip Size](http://img.badgesize.io/https://unpkg.com/vue-tap-mixin@latest/dist/vue-tap-mixin.umd.min.js?compression=gzip&style=flat-square)](https://unpkg.com/vue-tap-mixin)
[![Monthly Downloads](https://img.shields.io/npm/dm/vue-tap-mixin.svg)](https://www.npmjs.com/package/vue-tap-mixin)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Install
```bash
yarn add vue-tap-mixin
```

## Init
```js
import Vue from 'vue'

import VueTapMixin from 'vue-tap-mixin'
Vue.use(VueTapMixin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

## Use
```vue
<template>
  <div id="app">
    <div @tap="goTap($event, 'Tap 2')">Tap 1</div>
    <div @tap="(e) => { goTap(e, 'Tap 2') }">Tap 2</div>
    <div @tap="goTap2('Tap 3')">Tap 3</div>
    {{ aaa }}
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      aaa: ''
    }
  },
  methods: {
    goTap(e, txt) {
      console.log(e)
      this.txt = txt
    },
    goTap2(txt) {
      this.txt = txt
    }
  }
}
</script>
```

## License
MIT
