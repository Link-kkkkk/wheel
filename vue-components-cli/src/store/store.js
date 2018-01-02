import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'  
import * as getters from './getters'  
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
  isload:false,
  login:false, 

  routerSheet:[
    {name:'Mercury',style:'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)'},
    {name:'Venus',style:'linear-gradient(to right, #fa709a 0%, #fee140 100%)'},
    {name:'Earth',style:'linear-gradient(to right, #74ebd5 0%, #9face6 100%)'},
    {name:'Mars',style:'linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)'},
    {name:'Jupiter',style:'linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)'},
    {name:'Saturn',style:'linear-gradient(to right, #f6d365 0%, #fda085 100%)'}
  ],
  userRouterSheet:[]
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,

  // 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
  // 不要在发布环境下启用严格模式！严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。
  // strict: process.env.NODE_ENV !== 'production'
});

export default store