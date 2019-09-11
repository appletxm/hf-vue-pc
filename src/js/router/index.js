/* global VueRouter */
let routes, router

const Home = () => import(/* webpackChunkName: "Home" */ 'pages/home')
const ErrorPage = () => import(/* webpackChunkName: "Error" */ 'pages/error')

routes = [
  { path: '/', component: Home },
  { path: '/#/', component: Home },
  { path: '/home', component: Home },
  { path: '*', component: ErrorPage }
]

router = new VueRouter({routes})
router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0
  next()
})

export default router
