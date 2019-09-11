const {
  assignRouter,
  routerRootPath,
  routerUploadSingleFile,
  routerImgPath,
  routerHtmlPath
} = require('./server-router-handle')

const serverRouter = {
  '*': function (req, res, next) {
    console.info('[req info]', req.path, req.baseUrl, req.params)
    next()
  },

  '/rf_express': assignRouter,

  '/api/fuli-identity': assignRouter,

  '/kdn': assignRouter,

  '/': routerRootPath,

  'html': routerHtmlPath,

  'image': routerImgPath,

  'uploadSingleFile': routerUploadSingleFile
}

module.exports = serverRouter
