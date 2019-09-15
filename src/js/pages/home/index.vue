<template>
  <section :class="[$store.state.appPrefix + '-p-home']">
    <h1>Congratulations!</h1>
    Hey man you did it successful!
    <el-table
      :data="dataList"
      style="width: 100%"
    >
      <el-table-column
        v-for="column in columns"
        :key="column.field"
        :prop="column.field"
        :label="column.label"
      />
    </el-table>
  </section>
</template>

<script>
import messager from 'common/messager'
import eventQueue from 'common/event-queue'
import { checkUserLogin } from 'common/auth'
import models from './models'
import columns from './columns'

export default {
  components: {},
  data() {
    return {
      columns,
      dataList: [],
      pageSize: 10,
      currentPage: 1,
      total: 0
    }
  },
  computed: {},

  watch: {},

  created() {
    if (checkUserLogin()) {
      this.$getAnnouncementList()
    }
    eventQueue.pushEvent({
      key: 'home-page-get-announcement-list',
      event: this.$getAnnouncementList,
      params: [],
      context: this,
      needKeep: true,
      triggerUrl: ['/', '/home']
    })
  },

  mounted() {
  },

  methods: {
    async $getAnnouncementList() {
      messager.showLoading()
      const res = await models.getAnnouncement({
        pageSize: this.pageSize,
        pageNo: this.currentPage
      })
      messager.closeLoading()

      const { data: { list, pagination } } = res
      this.dataList = list
      this.total = pagination.total
    }
  }
}
</script>
