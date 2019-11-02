<template>
  <hf-ui-layout type="sidebar" :class="[$store.state.appPrefix + '-my-app']" v-loading="isInitiApp">
    <hf-ui-header>
      <page-header></page-header>
    </hf-ui-header>
    <hf-ui-layout>
      <hf-ui-aside width="200px">
        <Left-bar />
      </hf-ui-aside>
      <div class="aside-right">
        <hf-ui-layout :min-width="minWidth">
          <page-bread-crumb class="hf-ui-breadcrumb" />
          <hf-ui-main :class="[$store.state.appPrefix + '-module-all']">
            <router-view />
          </hf-ui-main>
        </hf-ui-layout>
      </div>
    </hf-ui-layout>
    <login-box
      v-show="$store.state.needShowLoginPop"
    >
    </login-box>
  </hf-ui-layout>
</template>

<script>
import LoginBox from 'components/login-pop'
import PageHeader from 'components/header'
import LeftBar from 'components/leftbar'
import PageBreadCrumb from 'components/bread-crumb'
import { getUserInfoFromCache, isAdmin, getAuthList, getWebMenuTree } from './models'
import { USER_INFO, IS_ADMIN, STORE_AUTH, MENU_LIST } from 'store/mutation-types'
import { checkUserLogin } from 'common/auth'
import messager from 'common/messager'
import { listToTree } from 'utils/tree'

export default {
  components: {
    LoginBox,
    PageHeader,
    LeftBar,
    PageBreadCrumb
  },
  data() {
    return {
      isInitiApp: false
    }
  },
  watch: {},
  created() {
    if (checkUserLogin() !== true) {
      this.$store.state.needShowLoginPop = true
    } else {
      this.$initApp()
    }
  },
  mounted() {},
  methods: {
    $initApp() {
      this.isInitiApp = true
      const userInfo = getUserInfoFromCache()
      this.$store.commit(USER_INFO, userInfo)
      Promise.all([
        isAdmin(),
        getAuthList(),
        getWebMenuTree()
      ]).then(res => {
        this.isInitiApp = false
        const menuList = listToTree(res[2]['data'])
        this.$store.commit(IS_ADMIN, res[0]['data'])
        this.$store.commit(STORE_AUTH, res[1]['data'])
        this.$store.commit(MENU_LIST, menuList)
      }).catch(err => {
        this.isInitiApp = false
        console.info('$initApp err:', err)
        messager.showMsg('warning', err.retDesc || err)
      })
    }
  }
}
</script>
