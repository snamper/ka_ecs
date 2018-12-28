module.exports = {
  baseUrl: '/ecs/',
  outputDir: 'dist',
  // assetsDir: '',
  indexPath: 'index.html',
  filenameHashing: true,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '远特运营中心',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  lintOnSave: false,
  runtimeCompiler: false,
  transpileDependencies: [],
  productionSourceMap: false,
  crossorigin: undefined,
  integrity: false,
  configureWebpack: () => {},
  chainWebpack: () => {},
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {},
    modules: false
  },
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hot: true,
    proxy: {
      '/km_center_ecs/': {
        target: 'http://192.168.10.110:8081',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '/ecs/km_center_ecs/': '/km_center_ecs/'
        }
      },
      '/km-ecs/': {
        target: 'http://192.168.10.98:6086',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '/ecs/km-ecs/': '/ecs/'
        }
      },
      '/ym-ecs/': {
        target: 'http://192.168.10.110:8080',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '/ecs/ym-ecs/': '/ecs/'
        }
      },
      '/km_ums/': {
        target: 'http://192.168.10.98:6088',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '/ecs/km_ums/': '/ums/'
        }
      }
    }
  },
  parallel: require('os').cpus().length > 1,
  pwa: {
    // ...
  },
  pluginOptions: {
    // ...
  }
}
