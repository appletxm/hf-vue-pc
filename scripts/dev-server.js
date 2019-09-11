var express = require('express')
var webpack = require('webpack')
var path = require('path')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var envConfig = require('../config/env')
var webpackConfig = require('../config/webpack-config')
var serverRouter = require('./server-router')
var app = express()
var compiler = webpack(webpackConfig)
var host = envConfig['development']['host']
var port = envConfig['development']['port']

var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

process.env.NODE_ENV = process.argv && process.argv.length >= 2 ? (process.argv)[2] : 'development'
app.use(webpackDevMiddleware(compiler, {
  // public path should be the same with webpack config
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  noInfo: true,
  stats: {
    colors: true
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname + '/../dist'))

app.use('*', serverRouter['*'])

// single file
app.use(['*/oss/uploadFile'], upload.single('file'), function (req, res) {
  serverRouter['uploadSingleFile'](req, res)
})

app.use('/rf_express', function (req, res) {
  serverRouter['/rf_express'](req, res)
})

app.use('/api/fuli-identity', function (req, res) {
  serverRouter['/api/fuli-identity'](req, res)
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
  console.info('dev server started at: ', url)
})
