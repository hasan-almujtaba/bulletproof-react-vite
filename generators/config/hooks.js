import { features, featureLocation } from '../utils/index.js'

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
      name: 'type',
      message: 'Which feature?',
      choices: ['global', ...features, 'new feature'],
    },
    {
      type: 'input',
      name: 'newFeature',
      message: 'Feature name?',
      when: (data) => data.type === 'new feature',
    },
    {
      type: 'confirm',
      name: 'hasTest',
      message: 'Generate test file?',
    },
  ],
  actions: (data) => {
    /** @type {import('plop').PlopGeneratorConfig['actions']} */
    const actions = []

    if (data.type === 'global') {
      actions.push(
        {
          type: 'add',
          path: 'src/hooks/use-{{ kebabCase name }}.ts',
          templateFile: 'generators/templates/hooks.hbs',
        },
        {
          type: 'modify',
          path: 'src/hooks/index.ts',
          pattern: /(\/\/ HOOKS EXPORTS)/g,
          templateFile: 'generators/templates/hooks-entry.hbs',
        }
      )
    }

    if (data.newFeature) {
      actions.push({
        type: 'add',
        path: `${featureLocation}/{{ kebabCase newFeature }}/hooks/index.ts`,
        templateFile: 'generators/templates/hooks-entry.hbs',
      })
    }

    const hooksType = data.newFeature ? 'newFeature' : 'type'
    if (data.type !== 'global') {
      actions.push({
        type: 'add',
        path: `${featureLocation}/{{ kebabCase ${hooksType} }}/hooks/use-{{ kebabCase name }}.ts`,
        templateFile: 'generators/templates/hooks.hbs',
      })
    }

    const testPath =
      data.type === 'global'
        ? 'src/hooks/test/use-{{ kebabCase name }}.test.ts'
        : `${featureLocation}/{{ kebabCase ${hooksType} }}/hooks/test/use-{{ kebabCase name }}.ts`

    if (data.hasTest) {
      actions.push({
        type: 'add',
        path: testPath,
        templateFile: 'generators/templates/hooks-test.hbs',
      })
    }

    return actions
  },
}
