module.exports = {
  host: '127.0.0.1',
  port: 8089,
  api: '/gateway',
  proxy: {
    url: 'http://192.168.10.189:6020'
  },
  get publicPath() {
    return 'http://' + this.host + ':' + this.port + '/dist/'
  },
  distPath: './dist',
  sourcePath: './src',
  outputCfg: {
    apiHost: 'http://192.168.10.189:6020',
    withCredentials: false
  }
}
