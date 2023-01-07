const componentLocation = 'src/components/'
const componentType = {
  layout: 'layouts',
  element: 'elements/{{ name }}',
  custom: '{{ folder }}',
}

/** @type {import('plop').PlopGenerator} */
export const componentConfig = {
  description: 'Generate new global component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Component name?',
    },
    {
      type: 'list',
      name: 'type',
      message: 'Component type?',
      choices: ['layout', 'element', 'custom'],
    },
    {
      type: 'confirm',
      name: 'hasTest',
      message: 'Generate test file?',
      when: (data) => data.type !== 'layout',
    },
    {
      type: 'input',
      name: 'folder',
      message: 'Component folder? (Optional)',
      when: (data) => data.type === 'custom',
      default: (data) => data.name,
    },
  ],
  actions: (data) => {
    const componentPath = `${componentLocation + componentType[data.type]}/`

    /** @type {import('plop').PlopGeneratorConfig['actions']} */
    const actions = []

    if (data.type === 'layout') {
      actions.push(
        {
          type: 'modify',
          path: `${componentLocation}/layouts/index.ts`,
          pattern: /(\/\/ COMPONENT EXPORTS)/g,
          templateFile: 'generators/templates/component-entry.hbs',
        },
        {
          type: 'add',
          path: `${componentPath}/{{ name }}.tsx`,
          templateFile: 'generators/templates/component.hbs',
        }
      )
    }

    if (data.type === 'element') {
      actions.push({
        type: 'modify',
        path: `${componentLocation}/elements/index.ts`,
        pattern: /(\/\/ COMPONENT EXPORTS)/g,
        templateFile: 'generators/templates/component-entry.hbs',
      })
    }

    if (data.type === 'element' || data.type === 'custom') {
      actions.push(
        {
          type: 'add',
          path: `${componentPath}/index.tsx`,
          templateFile: 'generators/templates/component.hbs',
        },
        {
          type: 'add',
          path: `${componentPath}/type.ts`,
          templateFile: 'generators/templates/component-type.hbs',
        }
      )
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
