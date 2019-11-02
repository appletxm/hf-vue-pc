<template>
  <i
    class="fa u-btn-tool g-ml20"
    :class="domClass"
    :title="title"
    @click="toggleCollpase"></i>
</template>
<script>
export default {
  props: {
    defaultCollpase: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      isCollpase: false,
    };
  },
  computed: {
    title() {
      return this.isCollpase ? '展开' : '收起';
    },
    domClass() {
      return this.isCollpase ? 'fa-angle-double-down' : 'fa-angle-double-up';
    },
  },
  methods: {
    toggleCollpase() {
      this.isCollpase = !this.isCollpase;
      this.$emit('changed', this.isCollpase);
    },
  },
  mounted() {
    this.isCollpase = this.defaultCollpase;
  }
};
</script>
