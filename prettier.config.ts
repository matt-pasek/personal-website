import { type Config } from 'prettier';

const config: Config = {
  bracketSpacing: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 120,
  proseWrap: 'always',
  quoteProps: 'as-needed',
  semi: true,
  plugins: ['prettier-plugin-tailwindcss'],
  endOfLine: 'crlf',
  tailwindStylesheet: 'src/app/global.css',
};

export default config;
