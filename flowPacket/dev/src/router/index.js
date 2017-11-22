import Vue from 'vue'
import Router from 'vue-router'

// 页面
import init from '../init.vue'
import vipnew from '../pages/vipnew.vue'
import dynamic from '../pages/dynamic.vue'
import iqiyitic from '../pages/iqiyiTic.vue'
import flow from '../pages/flowPacket.vue'
import error from '../pages/error.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/iqiyitic'
    },
    {
      path: '/vipnew',
      name: 'vipnew',
      component: vipnew
    },
    {
      path: '/dynamic',
      name: 'dynamic',
      component: dynamic
    },
    {
      path: '/iqiyitic',
      name: 'iqiyitic',
      component: iqiyitic
    },
    {
      path: '/flow',
      name: 'flow',
      component: flow
    },
    {
      path: '*',
      component: error
    }
  ]
})