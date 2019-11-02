<template>
  <div :class="[$store.state.appPrefix + '-p-menu']">
    <div
      v-loading="isPageLoading"
    >
      <!-- 标题 -->
      <div class="u-page-title">
        <span><i class="fa fa-th-list g-mr5"></i>菜单管理</span>
        <span>
          <button
            class="u-btn u-btn-default"
            @click.prevent="isFilterCollpase = !isFilterCollpase">
            <i class="fa fa-filter g-mr5"></i>
            {{ isFilterCollpase ? '查询' : '隐藏' }}
          </button>
          <button
            v-if="$hasPermission('menu--add')"
            class="u-btn u-btn-default"
            @click.prevent="add(null)">
            <i class="fa fa-plus g-mr5"></i>新建
          </button>
        </span>
      </div>
      <!-- 操作项 -->
      <div
        class="list-filter"
        :class="{'list-filter-coll': isFilterCollpase}">
        <el-form label-suffix=":" :inline="true" ref="filterForm" :model="filterForm" size="small">
          <el-form-item label="菜单名" label-width="60px">
            <el-input v-model="filterForm.menuName" clearable placeholder="请输入菜单名"></el-input>
          </el-form-item>
          <el-form-item label="菜单类型">
            <el-select v-model="filterForm.menuType" clearable placeholder="请选择菜单类型">
              <el-option
                v-for="(value, key, index) in menuTypeMap"
                :key="index"
                :value="key"
                :label="value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单归属">
            <el-select v-model="filterForm.belongType" clearable placeholder="请选择菜单归属类型">
              <el-option
                v-for="(value, key, index) in menuBelongTypeMap"
                :key="index"
                :value="key"
                :label="value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否显示">
            <el-select v-model="filterForm.isShow" clearable placeholder="请选择菜单是否显示">
              <el-option
                v-for="(value, key, index) in menuIsShowMap"
                :key="index"
                :value="key"
                :label="value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <button class="u-btn u-btn-primary u-fs-12 g-mr10" @click.prevent="search">查询</button>
            <button class="u-btn u-btn-default u-fs-12" @click.prevent="resetForm">重置</button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 列表 -->
      <div
        v-loading="isListLoading"
        class="list-content"
      >
        <div class="list-item list-item--tit">
          <span class="item1 g-tc">菜单名称</span>
          <span class="item2">排序号</span>
          <span class="item3">菜单类型</span>
          <span class="item4">链接</span>
          <span class="item5">菜单归属</span>
          <span class="item6">是否显示</span>
          <span class="item7">操作</span>
        </div>

        <el-tree
          :data="list"
          node-key="id"
          ref="orgTree"
          :default-expanded-keys="defaultExpandKeys"
          :props="defaultProps"
          :expand-on-click-node="false">
          <div class="list-item" slot-scope="{ node, data }">
            <span class="item1">
              <a @click.prevent="edit(data)">{{ data.menuName }}</a>
            </span>
            <span class="item2">{{ data.sortNo | filterBlank }}</span>
            <span class="item3">{{ data.menuType | convertMenuType | filterBlank }}</span>
            <span class="item4">{{ data.menuUrl | filterBlank }}</span>
            <span class="item5">{{ data.belongType | convertMenuBelongType | filterBlank }}</span>
            <span class="item6">{{ data.isShow | convertMenuIsShow | filterBlank }}</span>
            <span class="item7">
              <!-- 编辑 -->
              <i
                v-if="$hasPermission('menu--mod')"
                class="fa fa-pencil u-btn-tool u-clr-success"
                title="编辑"
                @click="edit(data)"></i>
              <!-- 停用/启用 -->
              <i
                v-if="$hasPermission(data.status == 0 ? 'menu--expire' : 'menu--recover')"
                class="fa u-btn-tool"
                :class="{
                  'u-clr-danger fa-stop-circle': data.status == 0,
                  'fa-play-circle': data.status == 1
                }"
                :title="data.status == 0 ? '停用' : '启用'"
                @click="toggleMenuStatus(data)"
              ></i>
              <!-- 删除 -->
              <i
                v-if="$hasPermission('menu--del')"
                class="fa fa-trash-o u-btn-tool u-clr-danger"
                title="删除"
                @click="delConfirm(data)"></i>
              <!-- 新建 -->
              <i
                v-if="$hasPermission('menu--add')"
                class="fa fa-plus u-btn-tool"
                title="新增下级菜单"
                @click="add(data)"></i>
            </span>
          </div>
        </el-tree>
      </div>
    </div>
  </div>
</template>

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
