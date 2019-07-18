import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/vue-tap-mixin.js',
  output: [
    {
      name: 'VueTapMixin',
      file: 'dist/vue-tap-mixin.esm.js',
      format: 'esm',
    },
    {
      name: 'VueTapMixin',
      file: 'dist/vue-tap-mixin.umd.js',
      format: 'umd',
    },
    {
      name: 'VueTapMixin',
      file: 'dist/vue-tap-mixin.cjs.js',
      format: 'cjs',
    }
  ],
  plugins: [
      commonjs(),
      vue(),
  ]
}