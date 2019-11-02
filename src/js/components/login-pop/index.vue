<template>
  <el-dialog
    :class="[$store.state.appPrefix + '-c-login-pop']"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    :visible.sync="$store.state.needShowLoginPop"
    width="380px"
  >
    <div
      slot="title"
      class="tit"
    >
      用户登录
    </div>
    <login :is-poplogin="true" @login-success="successCb"></login>
  </el-dialog>
</template>
<script>
import Login from '../login'

export default {
  name: 'Loginbox',
  components: {
    Login,
  },
  props: {
    successCb: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
    }
  }
}
</script>
