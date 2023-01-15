import { componentDir, featureDir, templateDir } from '../data/index.js'

export const componentTemplate = (data) => {
  const template =
    data.folder === 'layout'
      ? `${templateDir}/layout-component.hbs`
      : `${templateDir}/component.hbs`

  return template
}

export const componentPath = (data, type = 'component') => {
  let fileName = ''

  switch (type) {
    case 'test': {
      fileName = 'index.test.tsx'
      break
    }

    case 'type': {
      fileName = 'type.ts'
      break
    }

    default: {
      fileName = 'index.tsx'
      break
    }
  }

  if (data.feature === 'global') {
    switch (data.folder) {
      case 'layouts': {
        return `${componentDir}/layouts/{{ kebabCase name }}.tsx`
      }

      case 'elements': {
        return `${componentDir}/elements/{{ kebabCase name }}/${fileName}`
      }

      default: {
        const selectedFolder = data.newFolder ? 'newFolder' : 'folder'

        return `${componentDir}/{{ kebabCase ${selectedFolder} }}//${fileName}`
      }
    }
  }

  const selectedFeature = data.newFeature ? 'newFeature' : 'feature'

  return `${featureDir}/{{ ${selectedFeature} }}/components/{{ kebabCase name }}/${fileName}`
}

export const componentType = (data) => {
  if (data.feature === 'global') {
    if (data.folder === 'elements') {
      return `${componentDir}/elements/{{ kebabCase name }}/type.ts`
    } else {
      const selectedFolder = data.newFolder ? 'newFolder' : 'folder'

      return `${componentDir}/{{ kebabCase ${selectedFolder} }}//type.ts`
    }
  }

  const selectedFeature = data.newFeature ? 'newFeature' : 'feature'

  return `${featureDir}/{{ ${selectedFeature} }}/components/{{ kebabCase name }}/type.ts`
}

export const componentTestPath = (data) => {
  if (data.feature === 'global') {
    if (data.folder === 'elements') {
      return `${componentDir}/elements/{{ kebabCase name }}/index.test.tsx`
    } else {
      const selectedFolder = data.newFolder ? 'newFolder' : 'folder'

      return `${componentDir}/{{ kebabCase ${selectedFolder} }}//index.test.tsx`
    }
  }

  const selectedFeature = data.newFeature ? 'newFeature' : 'feature'

  return `${featureDir}/{{ ${selectedFeature} }}/components/{{ kebabCase name }}/index.test.tsx`
}
