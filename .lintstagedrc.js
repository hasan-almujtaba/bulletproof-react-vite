export default {
  '**/*.{tsx,ts}': ['eslint --fix', () => 'tsc'],
  '**/*.{tsx,ts,css,html}': 'prettier --write',
}
