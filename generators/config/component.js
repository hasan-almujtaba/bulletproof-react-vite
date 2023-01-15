import {
  componentDir,
  featureDir,
  features,
  templateDir,
} from '../data/index.js'
import { componentTemplate, componentPath } from '../utils/index.js'

/** @type {import('plop').PlopGenerator} */
export const componentConfig = {
  description: 'Generate new component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Component name?',
    },
    {
      type: 'list',
      name: 'feature',
      message: 'Which feature?',
      choices: ['global', ...features, 'new feature'],
    },
    {
      type: 'input',
      name: 'newFeature',
      message: 'Feature name?',
      when: (data) => data.feature === 'new feature',
    },
    {
      type: 'list',
      name: 'folder',
      message: 'Component folder location? (Optional)',
      choices: (data) => ['layouts', 'elements', data.name, 'new folder'],
      when: (data) => data.feature === 'global',
      default: (data) => data.name,
    },
    {
      type: 'input',
      name: 'newFolder',
      message: 'Folder name?',
      when: (data) => data.folder === 'new folder',
    },
    {
      type: 'confirm',
      name: 'hasTest',
      message: 'Generate test file?',
      when: (data) => data.folder !== 'layout',
    },
  ],
  actions: (data) => {
    /** @type {import('plop').PlopGeneratorConfig['actions']} */
    const actions = [
      {
        type: `add`,
        path: componentPath(data),
        templateFile: componentTemplate(data),
      },
    ]

    if (data.newFeature) {
      actions.push({
        type: 'add',
        path: `${featureDir}/{{ newFeature }}/components/index.ts`,
        templateFile: `${templateDir}/component-entry.hbs`,
      })
    }

    if (!data.newFeature && data.feature !== 'global') {
      actions.push({
        type: 'modify',
        path: `${featureDir}/{{ kebabCase feature }}/components/index.ts`,
        pattern: /(\/\/ COMPONENT EXPORTS)/g,
        templateFile: `${templateDir}/component-entry.hbs`,
      })
    }

    if (data.folder === 'layouts' || data.folder === 'elements') {
      actions.push({
        type: 'modify',
        path: `${componentDir}/{{ folder }}/index.ts`,
        pattern: /(\/\/ COMPONENT EXPORTS)/g,
        templateFile: `${templateDir}/component-entry.hbs`,
      })
    }

    if (data.folder !== 'layouts') {
      actions.push({
        type: 'add',
        path: componentPath(data, 'type'),
        templateFile: `${templateDir}/component-type.hbs`,
      })
    }

    if (data.hasTest) {
      actions.push({
        type: 'add',
        path: componentPath(data, 'test'),
        templateFile: `${templateDir}/component-test.hbs`,
      })
    }

    return actions
  },
}
