module.exports = {
  host: '127.0.0.1',
  port: 8089,
  api: '/api',
  proxy: {
    host: '127.0.0.1',
    port: '9000'
  },
  get publicPath() {
    return 'http://' + this.host + ':' + this.port + '/dist/'
  },
  distPath: './dist',
  sourcePath: './src'
}
