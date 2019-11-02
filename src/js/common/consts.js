
// 是否需要配置权限控制(false时不开启权限控制)
export const AUTH_CONTROL = false;

/**
 * 系统设置类的常量
 */
// 菜单类型
export const MENU_TYPE = {
  1: '菜单',
  2: '按钮',
  3: '接口',
  4: '公共接口',
};

// 菜单归属类型
export const MENU_BE_LONG_TYPE = {
  1: '后台',
  2: '前台',
};

// 菜单是否显示
export const MENU_STATE = {
  1: '显示',
  0: '隐藏',
};

// 菜单权重
export const MENU_WEIGHT = {
  0: '普通用户',
  1: '管理员',
  2: '系统管理员',
};

// 菜单权重
export const USER_TYPES = {
  0: '普通用户',
  1: '管理员',
  2: '系统管理员',
};

/**
 * 角色类的常量
 */
// 角色分类
export const ROLE_TYPES = {
  0: '通用角色',
  1: '机构角色',
  2: '系统角色',
};

// 角色状态
export const ROLE_STATUES = {
  0: '正常',
  1: '停用',
};

// 用户状态
export const USER_STATUS = {
  0: '有效',
  1: '失效',
};

/**
 * 翻页的常量定义
 */
export const PAGE_CONFIG = {
  // 可选的分页条数列表
  pageSizes: [10, 20, 30, 40],
  // 控制要加载的组件项
  layout: 'prev, pager, next, total, sizes', // , jumper
  // 简单版的组件项
  simpleLayout: 'prev, pager, next',
  // 默认单页条数
  defaultPageSize: 10,
  // 默认页起点
  defaultPageNo: 1,
};

export const DEFAULT_ERROR_MSG = '网络有问题，请稍后再试'

export const WEB_TITLE_PREFIX = '基础服务平台'
