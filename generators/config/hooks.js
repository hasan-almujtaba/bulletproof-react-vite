import { featureDir, features, hooksDir, templateDir } from '../data/index.js'
import { hooksPath } from '../utils/index.js'

/** @type {import('plop').PlopGenerator} */
export const hooksConfig = {
  description: 'Generate new hooks',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Hooks name?',
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
      type: 'confirm',
      name: 'hasTest',
      message: 'Generate test file?',
    },
  ],
  actions: (data) => {
    /** @type {import('plop').PlopGeneratorConfig['actions']} */
    const actions = [
      {
        type: 'add',
        path: hooksPath(data),
        templateFile: `${templateDir}/hooks.hbs`,
      },
    ]

    if (data.feature === 'global') {
      actions.push({
        type: 'modify',
        path: `${hooksDir}/index.ts`,
        pattern: /(\/\/ HOOKS EXPORTS)/g,
        templateFile: `${templateDir}/hooks-entry.hbs`,
      })
    }

    if (data.newFeature) {
      actions.push({
        type: 'add',
        path: `${featureDir}/{{ kebabCase newFeature }}/hooks/index.ts`,
        templateFile: `${templateDir}hooks-entry.hbs`,
      })
    }

    if (!data.newFeature && data.feature !== 'global') {
      actions.push({
        type: 'modify',
        path: `${featureDir}/{{ feature }}/hooks/index.ts`,
        pattern: /(\/\/ HOOKS EXPORTS)/g,
        templateFile: `${templateDir}/hooks-entry.hbs`,
      })
    }

    if (data.hasTest) {
      actions.push({
        type: 'add',
        path: hooksPath(data, 'test'),
        templateFile: `${templateDir}/hooks-test.hbs`,
      })
    }

    return actions
  },
}
