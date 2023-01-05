export default {
  '**/*.{tsx,ts}': 'eslint --fix',
  '**/*.{tsx,ts}': () => 'tsc',
  '**/*.{tsx,ts,css,html}': 'prettier --write',
}
