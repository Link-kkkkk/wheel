import Vue from 'vue'
import Router from 'vue-router'
import Lockr from 'lockr'
import store from './../store/store'
import com from './../util/common'
// import index from '../pages/index.vue'
const index = r => require.ensure([], () => r(require('../pages/index.vue')))
const home = r => require.ensure([], () => r(require('../pages/home.vue')))
const star = r => require.ensure([], () => r(require('../pages/star.vue')))
const error = r => require.ensure([], () => r(require("../pages/error.vue")))

Vue.use(Router)

var router = new Router({
  mode: 'history',
  base: '/',
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      // name: 'index',
      component: index,
      children: [
        {
          path: '/',
          redirect: 'home'
        },
        {
          path: 'home',
          name: 'home',
          component: home
        }
      ]
    }
  ]
})
// 要先暴露给公用方法
export default router

var routerSheet = [];
var userIdentity = '';
var route = [];

var logining = store.state.login
if (!logining) {
  if (Lockr.get('login') === 'true') {
    logining = true
    com.loadingRouter()
    // store.dispatch("UserLogin");
  }
} else if (logining) {
  com.loadingRouter()
}

// 动态操作路由404页面要在最后push进数组
var errorPage = [
  {
    path: "*",
    component: error,
    name: error
  }
];
router.addRoutes(errorPage);