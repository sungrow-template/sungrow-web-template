const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  filenameHashing: true,
  devServer: {
    port: 9000,
    proxy: {
      '/api': {
        target: '<url>',
        ws: true,
        changeOrigin: true
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  },
  configureWebpack:{
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 6,
        maxInitialRequests: 4,
        automaticNameDelimiter: '~',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial'
          },
          // 抽离elementUI包
          element: {
            chunks: 'all',
            name: `element-ui`,
            test: /[\\/]element-ui[\\/]/,
            priority: 0,
          },
        }
      }
    }
  },
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: [
            './src/assets/style/index.scss'
          ]
        })
        .end()
    })
    config.module
      .rule('svg')
      .exclude.add([
      resolve('src/icons')
    ])
      .end()
    config.module
      .rule('svg-icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload')
    config.resolve.alias
      .set ('@', resolve ('src'))
      .set ('common', resolve ('src/common'))
      .set ('_c', resolve ('src/components'))
      .set ('_u', resolve ('src/utils'))
  }
}
