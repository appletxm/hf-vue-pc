<template src="./template.html"></template>

<script>
import checkForm from 'mixins/checkform'
import { DEFAULT_ERROR_MSG } from 'common/consts'
import { setItem, getItem, removeItem } from 'common/storage'
import { USER_INFO } from 'store/mutation-types'
import { userLogin, setUserInfoToCache } from './models'
import messager from 'common/messager'

export default {
  name: 'Login',
  mixins: [
    checkForm,
  ],
  props: {
    isPoplogin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isSubmiting: false,
      formName: 'loginForm',
      checked: true,
      loginForm: {
        username: '',
        password: '',
      },
      checkCodeImgSrc: '',
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      },
    };
  },
  watch: {
    isPoplogin() {
      this.loginForm.username = getItem('userName_remember')
    }
  },
  mounted() {
    this.loginForm.username = getItem('userName_remember')
  },
  methods: {
    async $login() {
      const params = this.loginForm

      if (!this.$checkForm(this.formName)) {
        return false
      }
      if (this.checked) {
        setItem('userName_remember', this.loginForm.username)
      } else {
        removeItem('userName_remember')
      }

      try {
        this.isSubmiting = true
        const userInfo = await userLogin(params)
        this.isSubmiting = false

        setUserInfoToCache(userInfo)

        if (this.isPoplogin === true) {
          this.$store.commit(USER_INFO, userInfo)
          // this.$emit('login-success', true)
          window.location.reload()
        } else {
          window.location.href = '/'
        }
      } catch (err) {
        console.log('$login err: ', err)
        this.isSubmiting = false
        messager.showMsg('warning', err.retCode ? (err.retDesc || DEFAULT_ERROR_MSG) : err)
      }
    },
    resetLoginForm() {
      this.$refs[this.formName].resetFields();
    },
  },
};
</script>
