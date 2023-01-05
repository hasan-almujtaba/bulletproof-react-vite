import { componentConfig } from './generators/index.js'

export default (/** @type {import('plop').NodePlopAPI} */ plop) => {
  plop.setGenerator('component', componentConfig)
}
