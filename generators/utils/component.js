import { componentDir, featureDir, templateDir } from '../data/index.js'

/**
 * Dynamically choose which template to use by component folder location.
 * If component is a global component placed in layout folder use the layout template
 * Else use the common component template
 * @param {object} data Data from prompt answer
 * @param {string} data.name Component name
 * @param {string} data.folder Component folder location
 * @return {string} Template file location
 */
export const componentTemplate = (data) => {
  const template =
    data.folder === 'layouts'
      ? `${templateDir}/layout-component.hbs`
      : `${templateDir}/component.hbs`

  return template
}

/**
 * Generate a location for the new file to be placed
 * If the file belongs to a global component, it will be placed in src/components
 * Layouts will be placed in src/components/layouts
 * Elements will be placed in src/components/elements
 * File with custom folder will be placed in src/components/custom-folder
 * File only belong to specific feature will be placed in src/features/components/some-feature
 * @param {object} data Data from prompt answer
 * @param {string} data.feature Which feature file belong to: global | new feature | features in src/features
 * @param {string} data.newFeature New feature name
 * @param {string} data.folder Global component folder name
 * @param {string} data.newFolder New global component folder name
 * @param {string} type File type: component | test | type
 * @return {string} Location to generate file
 */
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
