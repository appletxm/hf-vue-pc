<template>
  <el-breadcrumb separator-class="el-icon-arrow-right"  :class="[$store.state.appPrefix + '-c-bread']">
    <el-breadcrumb-item v-for="item in breadData" :key="item.id">{{ item.menuName }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
import { matchBreadData } from './models'

export default {
  name: 'PageBreadcrumbHeader',
  components: {},
  data() {
    return {
      breadData: []
    }
  },
  watch: {
    '$route.path'(val) {
      this.breadData = matchBreadData(val, this.$store.state.leftbar.menuList)
    },
    '$store.state.leftbar.menuList'(val) {
      this.breadData = matchBreadData(this.$route.path, val)
    }
  },
  computed: {
  },
  methods: {
  },
  created() {
  },
  mounted() {
  }
};
</script>
