const path = require('path')
const TerserJSPlugin  = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin   = require('optimize-css-assets-webpack-plugin')
const HtmlWebPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true'

module.exports = {
  getEnvCfg: function (envKeyWord) {
    let envCfg, envFilePath

    if (envKeyWord === 'development') {
      envCfg = 'env-development'
    } else if (envKeyWord === 'mock') {
      envCfg = 'env-mock'
    } else if (envKeyWord === 'test') {
      envCfg = 'env-test'
    } else {
      envCfg = 'env-production'
    }

    envFilePath = path.join(__dirname, './' + envCfg + '.js')
    return envFilePath
  },

  getOutPutConfig: function (envKeyWord, env, webpackConfig) {
    const appJs = path.resolve(env.sourcePath + '/js/index.js')
    const isDev = envKeyWord === 'development' || envKeyWord === 'mock'

    if (isDev === true) {
      webpackConfig.entry.app = [hotMiddlewareScript, appJs]
      webpackConfig.devtool = 'inline-source-map'
    } else {
      webpackConfig.entry.app = [appJs]
      webpackConfig.devtool = 'cheap-source-map'
    }

    return webpackConfig
  },

  getOptimizationConfig: function (envKeyWord, env, webpackConfig) {
    const isDev = envKeyWord === 'development' || envKeyWord === 'mock'
    let optimization

    if (isDev === true) {
      optimization = {
        namedModules: true,
        namedChunks: true
      }
    } else {
      optimization = {
        minimize: true,
        minimizer: [
          new TerserJSPlugin({
            extractComments: '/@extract/i',
            sourceMap: true
          }), 
          new OptimizeCSSAssetsPlugin()
        ],
        providedExports: true,
        usedExports: true,
        sideEffects: true,
        concatenateModules: true,
        noEmitOnErrors: true,
        splitChunks: {
          minSize: 30000, //模块大于30k会被抽离到公共模块
          minChunks: 1, //模块出现1次就会被抽离到公共模块
          maxAsyncRequests: 5, //异步模块，一次最多只能被加载5个
          maxInitialRequests: 3, //入口模块最多只能加载3个
          name: true,
        }
      }
    }

    optimization = Object.assign(optimization, {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(scss|css)$/,
            chunks: 'all',
            enforce: true,
          },
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /axios/,
            priority: -10
          }
        }
      }
    })

    webpackConfig.optimization = optimization

    return webpackConfig
  },

  getCommonPluginConfig: function (envKeyWord, webpack, webpackConfig, env) {
    const nodeEnv = envKeyWord === 'test' || envKeyWord === 'production' ? 'production' : 'development'

    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: nodeEnv
        }
      }),

      new CopyPlugin([{
        from: path.resolve(env.sourcePath + '/assets'),
        to: path.resolve(env.distPath + '/assets')
      }])
    )
    return webpackConfig
  },

  getEnvPluginConfig: function (envKeyWord, webpack, webpackConfig) {
    var cssPath, cssChunkPath
    const isDev = envKeyWord === 'development' || envKeyWord === 'mock'

    if (isDev === true) {
      cssPath = 'css/[name].css'
      cssChunkPath = 'css/[id].css'
      webpackConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin()
      )
    } else {
      cssPath = 'css/[name].min.[contenthash:7].css'
      cssChunkPath = 'css/[id].min.[chunkhash:8=7].css'

      webpackConfig.plugins.push(
        new webpack.optimize.OccurrenceOrderPlugin()
      )
    }

    webpackConfig.plugins.push(
      new MiniCssExtractPlugin({
        filename: cssPath,
        chunkFilename: cssChunkPath
      })
    )

    return webpackConfig
  },

  getHtmlWebPluginConfig: function (env, webpackConfig) {
    var baseConfig = {
      favicon: '',
      inject: 'body',
      publicPath: env.publicPath,
      libFiles: {
        css: [],
        js: []
      }
    }
    webpackConfig.plugins.push(
      new HtmlWebPlugin(Object.assign(baseConfig, {
        title: '我是首页',
        filename: path.resolve(env.distPath + '/app.html'),
        template: path.resolve(env.sourcePath + '/index.html'),
        chunks: ['vendor', 'app'],
        inject: 'body',
        needViewPort: false,
        inject: 'body',
        publicPath: env.publicPath,
        libFiles: {
          css: [],
          js: []
        }
      }))
    )

    return webpackConfig
  }
}
