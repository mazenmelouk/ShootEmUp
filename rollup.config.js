import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'build/index.js',
  output: {
    file: 'public/js/main.js',
    format: 'iife',
    name: 'ShootEmUp',
  },
  plugins: [commonjs(), resolve()],
};
