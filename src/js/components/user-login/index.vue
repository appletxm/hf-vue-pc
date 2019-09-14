<template>
  <div :class="[$store.state.appPrefix + '-c-user-login']">
    <div class="body">
      <el-input placeholder="请输入用户名" type="text" v-model="userName"></el-input>
      <el-input placeholder="请输入密码" type="password" v-model="password"></el-input>
    </div>
    <footer>
      <el-button @click="$cancel">取 消</el-button>
      <el-button type="primary" @click="$doLogin">确 定</el-button>
    </footer>
  </div>
</template>

<script>
  import { doLogin } from './models'
  import { setTokenToCookie } from 'common/auth'
  import messager from 'common/messager'

  export default {
    data() {
      return {
        userName: '',
        password: ''
      }
    },
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
    computed: {},

    watch: {},

    components: {},

    methods: {
      $cancel() {
        this.closeCb && this.closeCb()
      },

      $doLogin() {
        messager.showLoading()
        doLogin(this.userName, this.password).then(res => {
          messager.closeLoading()
          setTokenToCookie(res.data)
          this.successCb && this.successCb(res.data)
        }).catch(err => {
          messager.closeLoading()
          console.warn('doLogin:', err)
        })
      }
    },

    created() {},

    mounted() {
    }
  }
</script>
