import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { cwd } from 'node:process'

import { namePrompt, testPrompt } from '../prompt/index.js'

const featureLocation = 'src/features'
const featuresDir = join(cwd(), featureLocation)
const features = readdirSync(featuresDir)

/** @type {import('plop').PlopGenerator} */
export const featureComponentConfig = {
  description: 'Generate new feature component',
  prompts: [
    namePrompt,
    {
      type: 'list',
      name: 'feature',
      message: 'Which feature?',
      choices: [...features, 'new feature'],
    },
    {
      type: 'input',
      name: 'newFeature',
      message: 'Feature name?',
      when: (data) => data.feature === 'new feature',
    },
    testPrompt,
  ],
  actions: (data) => {
    const featureName = data.newFeature ?? data.feature
    const componentPath = `${featureLocation}/${featureName}/components/{{ name }}/`

    /** @type {import('plop').PlopGeneratorConfig['actions']} */
    const actions = [
      {
        type: 'add',
        path: `${componentPath}/index.tsx`,
        templateFile: 'generators/templates/component.hbs',
      },
      {
        type: 'add',
        path: `${componentPath}/type.ts`,
        templateFile: 'generators/templates/component-type.hbs',
      },
    ]

    if (data.newFeature) {
      actions.unshift({
        type: 'add',
        path: `${featureLocation}/{{ newFeature }}/components/index.ts`,
        templateFile: 'generators/templates/component-entry.hbs',
      })
    }

    if (data.feature !== 'new feature') {
      actions.push({
        type: 'modify',
        path: `${featureLocation}/${featureName}/components/index.ts`,
        pattern: /(\/\/ COMPONENT EXPORTS)/g,
        templateFile: 'generators/templates/component-entry.hbs',
      })
    }

    if (data.hasTest) {
      actions.push({
        type: 'add',
        path: `${componentPath}/index.test.tsx`,
        templateFile: 'generators/templates/component-test.hbs',
      })
    }

    return actions
  },
}
