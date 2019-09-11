import html from './template.html'
import storage from 'common/storage'

export default {
  template: html,
  props: {
    tabData: {
      type: Array,
      default: []
    },
    changeTab: {
      type: Function
    }
  },

  data() {
    return {
      currentIndex: 0
    }
  },

  methods: {
    $toggleTab(index) {
      if (index !== this.currentIndex) {
        this.currentIndex = index

        if (this.changeTab && typeof this.changeTab === 'function') {
          this.changeTab(this.tabData[index])
        }
      }
    }
  },
  created() {
    this.currentIndex = storage.getAddresTypeToStorage() - 1
  },
  mounted() {}
}
