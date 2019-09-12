const {
  assignRouter,
  routerRootPath,
  routerUploadSingleFile,
  routerImgPath,
  routerHtmlPath,
  routerJsFile
} = require('./server-router-handle')

const serverRouter = {
  '*': function (req, res, next) {
    console.info(`HTTP [${req.method}]`, req.path, req.baseUrl, req.params)
    next()
  },

  '/rf_express': assignRouter,

  '/api/fuli-identity': assignRouter,

  '/kdn': assignRouter,

  '/': routerRootPath,

  'html': routerHtmlPath,

  'image': routerImgPath,

  'js': routerJsFile,

  'uploadSingleFile': routerUploadSingleFile
}

module.exports = serverRouter
