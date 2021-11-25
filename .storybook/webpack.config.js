module.exports = ({ config }) => {
  config.module.rules[0].use[0].options.presets = [
    require.resolve('@babel/preset-env'),
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-typescript'),
  ]

  config.module.rules.push({
    exclude: /node_modules/,
    test: /\.tsx?$/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
      },
    },
  })

  config.module.rules.push({
    test: /pdfjs-dist.+.js$/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
      },
    },
  })

  config.resolve.extensions.push('.ts', '.tsx')

  return config
}
