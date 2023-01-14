import {
  globalComponentConfig,
  featureComponentConfig,
  hooksConfig,
} from './generators/index.js'

export default (/** @type {import('plop').NodePlopAPI} */ plop) => {
  plop.setGenerator('global component', globalComponentConfig)
  plop.setGenerator('feature component', featureComponentConfig)
  plop.setGenerator('hooks', hooksConfig)
}
