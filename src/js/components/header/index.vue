<template>
  <div :class="[$store.state.appPrefix + '-c-header']">
    <div class="headr-logo" @click="$router.push({name: 'home.index'})">
      <img src="assets/images/logo.png" width="120px"/>
    </div>
    <div class="header-right">
      <el-dropdown
        v-if="userInfo.userName"
        class="header-personal"
        @command="handleCommand"
        trigger="click">
        <span class="el-dropdown-link">
          <img v-if="userInfo.portraitUrl" class="header-portrait" :src="userInfo.portraitUrl" />
          <span v-else class="header-portrait el-icon-s-custom"></span>
          {{ userInfo.userName }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div v-else class="header-personal">游客，您好！请<a @click.prevent="$showLoginBox" class="header-login">登录</a></div>
    </div>
  </div>
</template>
<script>
import { getTokenFromCookie } from 'common/auth'
import { userLogout, clearCacheForLogout } from './models'

export default {
  name: 'PageHeader',
  components: {},
  data() {
    return {}
  },
  computed: {
    userInfo() {
      const info = this.$store.state.user.userInfo
      return info
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        this.$showLogOutDialog();
      }
    },

    $showLogOutDialog() {
      this.$confirm('确定退出登录？', '提示', {
        confirmButtonText: '退出登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$logout();
      }).catch((err) => {
        console.log('$showLogOutDialog err:', err)
      })
    },

    $logout() {
      const token = getTokenFromCookie()
      userLogout({ token: token }).then(() => {
        clearCacheForLogout()
        window.location.href = 'login.html'
      }).catch(err => {
        console.log('$logout err:', err)
      })
    },

    $showLoginBox() {
      this.$store.commit('NEED_SHOW_LOGIN_POP', true)
    },
  },
  created() {
  },
  mounted() {
  }
};
</script>
