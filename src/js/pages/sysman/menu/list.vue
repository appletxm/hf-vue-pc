<template src="./template.html"></template>

<script>
import { getMenuList, expireOrRecMenu, delMenus } from './models'
import { MENU_TYPE, MENU_BE_LONG_TYPE, MENU_STATE } from 'common/consts'
import { listToTree } from 'utils/tree'

const defaultFormData = {
  menuName: '',
  menuType: '',
  belongType: '',
  isShow: '',
};
export default {
  name: 'MenuList',
  data() {
    return {
      // 树的属性配置
      defaultProps: {
        children: 'children',
        label: 'menuName',
      },
      // 页面是否正在加载
      isPageLoading: false,
      // 列表是否正在加载
      isListLoading: false,
      // 搜索区域是否折叠
      isFilterCollpase: false,
      // 搜索字段
      filterForm: { ...defaultFormData },
      // 列表
      list: [],
      // 总条数
      totalRecordCount: 0,
      // 菜单类型map
      menuTypeMap: MENU_TYPE,
      // 菜单归属类型map
      menuBelongTypeMap: MENU_BE_LONG_TYPE,
      // 菜单是否显示map
      menuIsShowMap: MENU_STATE,
      // 在父节点下新增子节点
      selectedParentId: '',
      // 默认展开的菜单
      defaultExpandKeys: []
    };
  },
  methods: {
    // 搜索
    search() {
      // 重新获取列表
      this.getList();
    },
    // 重置
    resetForm() {
      this.filterForm = { ...defaultFormData };
    },
    // 新建
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
    // 编辑
    edit(item) {
      const selectedId = item.id;

      this.$router.push({
        name: 'menu.edit',
        params: {
          id: selectedId,
        },
      });
    },
    // 删除提示窗
    delConfirm(item) {
      const title = '提示';
      // 删除的提示
      let tips = '删除后将无法恢复。确定删除吗？';
      if (item.children && item.children.length > 0) {
        tips = '删除此菜单时，连同子菜单也会一起删除。确定删除吗？';
      }
      this.$confirm(tips, title, {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.del(item);
      }).catch(() => {
        //
      });
    },
    // 删除
    async del(item) {
      const params = {
        ids: item.id,
      };
      this.isPageLoading = true;
      try {
        const { retCode } = await delMenus(params);
        this.isPageLoading = false;
        if (retCode === '000000') {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          });
        }
        // 重新获取列表
        this.getList();
      } catch (err) {
        this.isPageLoading = false;
        this.$message.error(err.message || '删除菜单出错！');
      }
    },
    // 停用/启用 确认
    toggleMenuStatus(record) {
      const status = record.status + '';
      const title = '提示';
      const tips = `确认要 ${status === '0' ? '停用' : '启用'} 该菜单吗？`;

      this.$confirm(tips, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.expireOrRecMenu(record);
      }).catch(() => {
        //
      });
    },
    // 停用/启用
    async expireOrRecMenu(record) {
      const params = {
        id: record.id,
      };

      this.isPageLoading = true;
      try {
        await expireOrRecMenu(params);
        this.isPageLoading = false;
        this.$message({
          message: '操作成功',
          type: 'success',
          duration: 1000
        });
        this.getList();
      } catch (err) {
        this.isPageLoading = false;
        this.$message.error(err.message || '停用/开启菜单出错！');
      }
    },
    // 获取列表
    async getList() {
      // 填入筛选项
      const params = { pageSize: 99999, ...this.filterForm }
      this.isListLoading = true;

      try {
        const { data } = await getMenuList(params);
        // console.log('list', list)
        this.defaultExpandKeys = []
        this.isListLoading = false;

        this.list = listToTree(data) || [];
        // 如果是添加条件搜索，则默认展开
        if (this.filterForm.menuName || this.filterForm.menuType || this.filterForm.isShow) {
          this.defaultExpandKeys = this.list.map((item) => item.id)
        }
        // this.totalRecordCount = total;
      } catch (err) {
        this.list = [];
        this.isListLoading = false;
        this.$message.error(err.message || '获取菜单列表出错！');
      }
    },
    // 初始化
    init() {
      // 获取菜单
      this.getList();
    },
  },
  mounted() {
    // 初始化
    this.init();
  },
};
</script>
