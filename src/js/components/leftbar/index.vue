<template>
  <div
    v-loading="isLoading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :class="[{'collapse': isLeftbarCollapse}, $store.state.appPrefix + '-c-leftbar']">
    <div
      class="collapse-btn"
      @click="handleCollapse">
      <i
        class="fa g-mr5"
        :class="{
          'fa-hand-o-left': !isLeftbarCollapse,
          'fa-hand-o-right': isLeftbarCollapse,
        }"></i>{{ collapseTxt }}
    </div>

    <el-menu
      background-color="#fff"
      text-color="#607d8b"
      active-text-color="#1abc9c"
      :default-active="curPath"
      :collapse="isLeftbarCollapse"
    >
      <template
        v-for="(menu, index) in menuList"
        v-show="!menu.notShow">
        <template v-if="menu.children.length > 0">
          <el-submenu
            :key="index"
            :index="index.toString()">
            <template slot="title">
              <i
                class="fa g-mr5"
                :class="menu.menuIcon || 'fa-bars'"></i>
              <span slot="title">{{ menu.menuName }}</span>
            </template>
            <el-menu-item
              v-show="!submenu.notShow"
              v-for="(submenu, submenuIndex) in menu.children"
              :key="submenuIndex"
              :index="submenu.menuUrl"
              @click="handleLeftbarSelect(submenu)">
              <span class="menu-title">
                <i class="fa g-mr8" :class="submenu.menuIcon"></i>
                {{ submenu.menuName }}
                <span class="wait-num" v-if="submenu.todo && submenu.todo > 0">{{ submenu.todo }}</span>
              </span>
            </el-menu-item>
          </el-submenu>
        </template>

        <el-menu-item
          v-else
          :key="index"
          :index="menu.menuUrl">
          <i class="icon g-mr5" :class="menu.icon"></i>
          <span slot="title"><router-link :to="menu.menuUrl">{{ menu.menuName }}</router-link></span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
/*
  children: []
  id: "1045970495056490497"
  menuIcon: "el-icon-setting"
  menuName: "系统管理"
  menuUrl: "/sysman"
  parentId: "0"
  parentIds: "0"
  sortNo: 5
*/

export default {
  data() {
    return {
      curPath: '',
      isLoading: false,
    };
  },
  computed: {
    'isLeftbarCollapse'() {
      return this.$store.state.leftbar.isLeftbarCollapse
    },
    'menuList'() {
      return this.$store.state.leftbar.menuList
    },

    collapseTxt() {
      return this.isLeftbarCollapse ? '展开' : '收起';
    },
  },
  watch: {
    '$route'(route) {
      this.curPath = route.matched[0].path;
    },
  },
  methods: {
    handleCollapse() {
      this.$store.commit('LEFTBAR_CHANGE', this.isLeftbarCollapse);
    },

    handleLeftbarSelect(item) {
      this.$router.push({
        path: item.menuUrl,
      });
    },

    init() {
      // console.log('init', this.$route)
      // this.curPath = this.$route.matched[0].path;
    },
  },

  mounted() {
    this.init();
  },
};
</script>
