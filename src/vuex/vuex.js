import Vue from 'vue'
import Vuex from 'vuex'
import logger from 'vuex/dist/logger'
import * as Types from './mutations-types' // 插件
Vue.use(Vuex)
const state = { count: 0 }
const mutations = {
  [Types.INCREMENT] (state, param1) { // state时自动放入的，默认就是当前的state
    state.count += 1
    // 其他组件提交add的Mutation用this.$store.commit('funtion()','param1') 提交页可以传参数，第一个默认就是状态，后面的才是自己传的
  },
  [Types.DECREMENT] (state) {
    state.count -= 1
  }
}
// 暴露接口,其他页面yinyong $store.state.count
export default new Vuex.Store({
  state,
  strict: true, // 只能通过mutation(管理员)来更改状态 而且不支持异步
  mutations,
  plugins: [
    logger() // 日志插件无实际含义
  ]
})

// 如果 state和mutations太多  也可以新建js文件 在导入即可 例如上面的写法  其他组件中引入Types用 即可
