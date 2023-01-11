/** @type {import('plop').PlopGenerator['prompts']} */
export const namePrompt = {
  type: 'input',
  name: 'name',
  message: 'Component name?',
}

/** @type {import('plop').PlopGenerator['prompts']} */
export const testPrompt = {
  type: 'confirm',
  name: 'hasTest',
  message: 'Generate test file?',
  when: (data) => data.type !== 'layout',
}
