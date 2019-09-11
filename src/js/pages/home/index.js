import html from './template.html'
import tab from 'components/tab'

const tabData = Object.freeze([
  {
    id: '001',
    name: 'Tab1',
    label: 'labe1'
  },
  {
    id: '002',
    name: 'Tab2',
    label: 'labe2'
  }
])

export default {
  template: html,

  data() {
    return {
      tabData
    }
  },
  computed: {},

  watch: {},

  components: {
    tab
  },

  methods: {
    changeTab(val) {
      debugger
    }
  },

  created() {},

  mounted() {
  }
}
