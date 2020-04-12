// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
/* eslint-disable no-new */
// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
Vue.config.productionTip = false
/* 引用之后全局都可以用 */
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper /* { default global options } */)
// 全局的钩子函数
router.beforeEach(function (to, from, next) {
  document.title = to.meta.title
  // 也可以进行拦截
  // if (to.path === '/list') {
  //   next({path: '/add'})
  // } else {
  //   next()
  // }
  next()
})
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
