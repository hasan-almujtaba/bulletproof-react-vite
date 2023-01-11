import {
  globalComponentConfig,
  featureComponentConfig,
} from './generators/index.js'

export default (/** @type {import('plop').NodePlopAPI} */ plop) => {
  plop.setGenerator('global component', globalComponentConfig)
  plop.setGenerator('feature component', featureComponentConfig)
}
