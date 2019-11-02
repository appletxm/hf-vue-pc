/**
 * 默认的最基础的路由表
 */

const ErrorPage = () => import(/* webpackChunkName: "Error" */ 'pages/error')
// const Home = () => import(/* webpackChunkName: "Home" */ 'pages/home')

export default [
  {
    path: '/',
    name: 'home.index',
    redirect: '/menu/list',
    meta: {
      title: '首页',
      keepAlive: true,
      auth: false,
    }
  },

  {
    path: '*',
    component: ErrorPage,
    meta: {
      title: 'Not Found',
      auth: false,
      keepAlive: true,
    },
  },
];
