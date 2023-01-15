import { featureDir, hooksDir } from '../data/index.js'

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
