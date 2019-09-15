<template>
  <div :class="[$store.state.appPrefix + '-c-user-login']">
    <div class="body">
      <el-input
        v-model="userName"
        placeholder="请输入用户名"
        type="text"
      />
      <el-input
        v-model="password"
        placeholder="请输入密码"
        type="password"
      />
    </div>
    <footer>
      <el-button @click="$cancel">
        取 消
      </el-button>
      <el-button
        type="primary"
        @click="$doLogin"
      >
        确 定
      </el-button>
    </footer>
  </div>
</template>

<script>
import { setTokenToCookie } from 'common/auth'
import messager from 'common/messager'
import models from './models'

export default {
  components: {},
  props: {
    closeCb: {
      type: Function,
      default: null
    },
    successCb: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      userName: '',
      password: ''
    }
  },
  computed: {},

  watch: {},

  created() {},

  mounted() {
  },

  methods: {
    $cancel() {
      if (this.closeCb) {
        this.closeCb()
      }
    },

    $doLogin() {
      messager.showLoading()
      models.doLogin(this.userName, this.password).then((res) => {
        messager.closeLoading()
        setTokenToCookie(res.data)
        if (this.successCb) {
          this.successCb(res.data)
        }
      }).catch((err) => {
        messager.closeLoading()
        console.warn('doLogin:', err)
      })
    }
  }
}
</script>
