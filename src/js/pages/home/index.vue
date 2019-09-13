<template>
  <section :class="[$store.state.appPrefix + '-p-home']">
    <h1>Congratulations!</h1>
    Hey man you did it successful!
  </section>
</template>

<script>
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
</script>
