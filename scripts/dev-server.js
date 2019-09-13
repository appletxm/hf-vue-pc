const express = require('express')
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const envConfig = require('../config/env')
const webpackConfig = require('../config/webpack.config')
const serverRouter = require('./server-router')
const app = express()
const compiler = webpack(webpackConfig)
const host = envConfig['development']['host']
const port = envConfig['development']['port']

// const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })

const middleWare = webpackDevMiddleware(compiler, {
  // Notice: public path should be the same with webpack config
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  noInfo: true,
  stats: 'errors-only'
})

process.env.NODE_ENV = process.argv && process.argv.length >= 2 ? (process.argv)[2] : 'development'
app.use(middleWare)
app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname + '/../dist'))

app.use('*', serverRouter['*'])

// single file
// app.use(['*/oss/uploadFile'], upload.single('file'), function (req, res) {
//   serverRouter['uploadSingleFile'](req, res)
// })

// app.use('/rf_express', function (req, res) {
//   serverRouter['/rf_express'](req, res)
// })

// app.use('/api/fuli-identity', function (req, res) {
//   serverRouter['/api/fuli-identity'](req, res)
// })

// app.use('/kdn', function (req, res) {
//   serverRouter['/kdn'](req, res)
// })

app.use(['/*assets/images/*'], function (req, res) {
  serverRouter['image'](req, res, compiler)
})

app.use('/kdn', function (req, res) {
  serverRouter['/kdn'](req, res)
})

app.use('/*assets/images/*', function (req, res) {
  serverRouter['image'](req, res, compiler)
})

app.use('/*.html', function (req, res) {
  serverRouter['html'](req, res, compiler)
})

app.use('/', function (req, res) {
  serverRouter['/'](req, res, compiler)
})

app.listen(port, host, function (arg) {
  var url = 'http://' + host + ':' + port
  console.info(`${chalk.magenta('dev server started at: ')}${chalk.blue(url)}`)
})
