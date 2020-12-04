# vue-tap-mixin
[![npm version](https://badge.fury.io/js/vue-tap-mixin.svg)](https://badge.fury.io/js/vue-tap-mixin)
[![Gzip Size](http://img.badgesize.io/https://unpkg.com/vue-tap-mixin@latest/dist/vue-tap-mixin.umd.js?compression=gzip&style=flat-square)](https://unpkg.com/vue-tap-mixin)
[![Monthly Downloads](https://img.shields.io/npm/dm/vue-tap-mixin.svg)](https://www.npmjs.com/package/vue-tap-mixin)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Automatically convert `click` event to `tap` event without delay on the mobile side.
Suported all Vue `click` event modifiers.
- .stop
- .prevent
- .capture
- .self
- .once
- .passive

## Installation

Install

```sh
$ npm install vue-tap-mixin --save
# or
$ yarn add vue-tap-mixin
```

### ES6

```js

import VueTapMixin from 'vue-tap-mixin'

Vue.use(VueTapMixin)
```

### CommonJS

```js
var Vue = require('vue');
var VueTapMixin = require('vue-tap-mixin');

Vue.use(VueTapMixin);
```

### Browser

```html
<script src="https://unpkg.com/vue@latest"></script>
<script src="https://unpkg.com/vue-tap-mixin@latest/dist/vue-tap-mixin.umd.js"></script>
<!-- OR -->
<script src="path/to/vue/vue.min.js"></script>
<script src="path/to/vue-tap-mixin/dist/vue-tap-mixin.umd.js"></script>

```

## Useage
```vue
<template>
  <div id="app">
    <div @click="goTap($event, 'Tap 2')">Tap 1</div>
    <div @tap.stop="goTap($event, 'Tap 2')">Tap 1</div>
    <div @tap.prevent="goTap($event, 'Tap 2')">Tap 1</div>
    <div @tap="goTap($event, 'Tap 2')">Tap 1</div>
    <div @tap="(e) => { goTap(e, 'Tap 2') }">Tap 2</div>
    <div @tap="goTap2('Tap 3')">Tap 3</div>
    <button type="button" disabled="disabled" @tap="notWorks">Not trigger tap event</button>
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

## MIT License
Copyright © 2019 LinQuan.