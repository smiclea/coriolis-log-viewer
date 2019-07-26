module.exports = (api) => {
  api.cache.using(() => process.env.NODE_MODE)

  const common = {
    presets: [
      '@babel/env',
      '@babel/preset-flow',
      '@babel/react',
    ],
    plugins: [
      ['react-hot-loader/babel'],

      // Stage 1
      ['@babel/plugin-proposal-optional-chaining', { loose: false }],
      ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
      '@babel/plugin-proposal-do-expressions',

      // Stage 2
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-proposal-throw-expressions',

      // Stage 3
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-syntax-import-meta',
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      '@babel/plugin-proposal-json-strings',
    ],
  }

  if (process.env.NODE_MODE === 'development') {
    common.plugins.push(['styled-components', { displayName: true, minify: false }])
  } else {
    common.plugins.push(['styled-components', { displayName: false, minify: true }])
  }

  return common
}
