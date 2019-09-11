import html from './template.html'
import Navigator from 'components/navigators'
import UserLogin from 'components/user-login'

export default {
  template: html,
  data() {
    return {
      isPopLoginShow: false
    }
  },
  components: {Navigator, UserLogin},
  methods: {
    closeLoginCb() {},
    loginSuccessCb() {}
  },
  watch: {
    '$store.state.needShowLoginPop'(val) {
      console.info('====', val)
    }
  },
  created() {},
  mounted() {}
}
