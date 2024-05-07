import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPrettier from 'eslint-config-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  eslintPrettier,
  {
    ignores: ['node_modules/**/*', 'lib/**/*', 'coverage/*/*'],
  },
);
