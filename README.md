# vue-tap-mixin

## Install
```
yarn add vue-tap-mixin
```

## Init
```
import Vue from 'vue'

import VueTapMixin from 'vue-tap-mixin'

Vue.use(VueTapMixin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

## Use
```
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
