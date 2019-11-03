<template src="./template.html"></template>

<script>
import { getMenuList } from './models'
import { MENU_TYPE, MENU_BE_LONG_TYPE, MENU_STATE } from 'common/consts'

const defaultFormData = {
  menuName: '',
  menuType: '',
  belongType: '',
  isShow: '',
}

export default {
  name: 'MenuList',
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'menuName',
      },
      isPageLoading: false,
      isListLoading: false,
      isFilterCollpase: false,
      filterForm: { ...defaultFormData },
      list: [],

      totalRecordCount: 0,
      menuTypeMap: MENU_TYPE,
      menuBelongTypeMap: MENU_BE_LONG_TYPE,
      menuIsShowMap: MENU_STATE,
      selectedParentId: '',
      defaultExpandKeys: []
    };
  },
  methods: {
    search() {
      this.getList();
    },
    resetForm() {
      this.filterForm = { ...defaultFormData };
    },
    add(item) {
      const path = {
        name: 'menu.add',
        params: {
          timestamp: new Date().getTime(),
        },
      };
      if (item) {
        this.selectedParentId = item.id;
        path.params.parentId = this.selectedParentId;
      }
      this.$router.push(path);
    },

    async $getList() {
      const params = { pageSize: 99999, ...this.filterForm }
      this.isListLoading = true;

      try {
        const { data } = await getMenuList(params);
        this.defaultExpandKeys = []
        this.isListLoading = false;

        this.list = data || [];
        if (this.filterForm.menuName || this.filterForm.menuType || this.filterForm.isShow) {
          this.defaultExpandKeys = this.list.map((item) => item.id)
        }
      } catch (err) {
        this.list = [];
        this.isListLoading = false;
        this.$message.error(err.message || '获取菜单列表出错！');
      }
    },

    $init() {
      this.$getList();
    },
  },

  created() {
  },

  mounted() {
    this.$init();
  },
};
</script>
