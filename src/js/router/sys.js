/**
 * 系统管理模块的路由表
 */
const MenuList = () => import(/* webpackChunkName: "MenuList" */ 'pages/sysman/menu/list')

export default [
  {
    path: '/menu/list',
    name: 'menu.list',
    component: MenuList,
    meta: {
      title: '菜单列表',
      menuPath: '/menu/list',
      authId: 'menu'
    }
  },
  {
    path: '/user/list',
    name: 'user.list',
    component: MenuList,
    meta: {
      title: '用户列表',
      menuPath: '/user/list',
      authId: 'user'
    },
  }
];
