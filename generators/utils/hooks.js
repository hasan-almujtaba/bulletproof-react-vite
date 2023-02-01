import { featureDir, hooksDir } from '../data/index.js'

/**
 * Generate a location for the new file to be placed
 * @param {object} data Data from prompt answer
 * @param {object} data.feature Which feature file belong to: global | new feature | features in src/features
 * @param {string} type File type: hooks | test
 * @return {string} Location to generate file
 */
export const hooksPath = (data, type = 'hooks') => {
  const fileName =
    type === 'hooks'
      ? 'use-{{ kebabCase name }}.ts'
      : 'use-{{ kebabCase name }}.test.ts'
  const filePath = type === 'hooks' ? fileName : `/test/${fileName}`

  if (data.feature === 'global') {
    return `${hooksDir}/${filePath}`
  }

  const selectedFeature = data.newFeature ? '{{ newFeature }}' : '{{ feature }}'

  return `${featureDir}/${selectedFeature}/hooks/${filePath}`
}
