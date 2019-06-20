module.exports = {
  env: {
    test: {
      plugins: [
        'dynamic-import-node',
        'require-context-hook',
        'transform-es2015-modules-commonjs',
      ],
    },
  },
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
  ],
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
}
