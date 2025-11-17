import type { StorybookConfig } from '@storybook/react-webpack5'


const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async webpackFinal(config) {
    config.module?.rules?.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    const tsRuleIndex = config.module.rules.findIndex(
      (rule) => typeof rule === 'object' && rule !== null && rule.test instanceof RegExp && rule.test.test('.tsx')
    );

    if (tsRuleIndex > -1) {
      config.module.rules.splice(tsRuleIndex, 1); 
    }
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      //@ts-ignore
      loader: require.resolve('babel-loader'),

      options: {
            presets: [
                //@ts-ignore
                require.resolve('@babel/preset-env'),
                //@ts-ignore
                require.resolve('@babel/preset-typescript'),
                //@ts-ignore
                [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
            ],
        },
    });

    config.resolve = {
      ...config.resolve,
      extensions: [...(config.resolve?.extensions || []), '.ts', '.tsx', '.mjs'],
    };

    return config;
  },
}
export default config