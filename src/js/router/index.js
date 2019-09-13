/* global VueRouter */
import Vue from 'vue'
import VueRouter from 'vue-router'
let routes, router

Vue.use(VueRouter)

const Home = () => import(/* webpackChunkName: "Home" */ 'pages/home')
const About = () => import(/* webpackChunkName: "Home" */ 'pages/about')
const ErrorPage = () => import(/* webpackChunkName: "Error" */ 'pages/error')

routes = [
  { path: '/', component: Home },
  { path: '/#/', component: Home },
  { path: '/home', component: Home },
  { path: '/about', component: About },
  { path: '*', component: ErrorPage }
]

router = new VueRouter({routes})
router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0
  next()
})

export default router
