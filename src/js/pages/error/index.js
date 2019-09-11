import html from './template.html'

const envCfg = require('env.cfg')

export default {
  template: html,
  data() {
    return {
      title: 'this is the error page',
      errorPic: envCfg.publicPath + 'assets/images/404_pic@2x.png'
    }
  },

  methods: {
    $gotoHome() {
      this.$router.push({path: '/'})
    }
  }
}
