<template>
  <div :class="[$store.state.appPrefix + '-my-app']">
    <navigator></navigator>
    <div :class="[$store.state.appPrefix + '-module-all']">
      <router-view></router-view>	
    </div>
    <!--<user-login slot="popBody" :login-show="$store.state.needShowLoginPop" :close-cb="closeLoginCb" :login-success-cb="loginSuccessCb" :need-register="true"></user-login>-->
  </div>
</template>

<script>
  import navigator from 'components/navigator'
  // import userLogin from 'components/user-login'

  import { NAVIGATOR_LIST } from 'store/mutation-types'
  import { getNavigatorList } from './models'

  export default {
    data() {
      return {
        isPopLoginShow: false
      }
    },
    components: { navigator },
    methods: {
      closeLoginCb() {},
      loginSuccessCb() {}
    },
    watch: {
      '$store.state.needShowLoginPop'(val) {
        console.info('====', val)
      }
    },
    created() {
      const navigatorList = getNavigatorList()
      this.$store.commit(NAVIGATOR_LIST, navigatorList)
    },
    mounted() {}
  }
</script>
