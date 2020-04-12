import Vue from 'vue'
import Router from 'vue-router'
// import Pos from '@/components/page/Pos'
// import HelloWorld from '@/components/page/HelloWorld'
// import Handle from '@/components/page/Handle'
// import panel from '@/components/page/panel'
// import app from '@/components/page/app'

// import home from '@/components/page/appChild/home'
// import list from '@/components/page/appChild/list'
// import collect from '@/components/page/appChild/collect'
// import add from '@/components/page/appChild/add'
// import detail from '@/components/page/appChild/detail'

// import $ from 'jquery'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'pos',
      meta: { title: 'pos页面' },
      component: () => import('@/components/page/Pos')
    }, {
      path: '/panel',
      name: 'panel',
      meta: { title: 'panel页面' },
      component: () => import('@/components/page/panel')
    }, {
      path: '/handler',
      name: 'Handle',
      meta: { title: 'Handle页面' },
      component: () => import('@/components/page/Handle')
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      meta: { title: 'HelloWorld页面' },
      component: () => import('@/components/page/Handle')
    },
    {
      path: '/app',
      name: 'app',
      component: () => import('@/components/page/app'),
      // 跳转到下级第一层
      redirect: {path: '/app/home'},
      children: [ {
        path: 'home',
        meta: { keepAlive: true, title: '首页' },
        component: () => import('@/components/page/appChild/home')
      }, {
        path: 'list',
        meta: { title: '列表' },
        component: () => import('@/components/page/appChild/list')
      }, {
        path: 'collect',
        meta: { title: '收藏' },
        component: () => import('@/components/page/appChild/collect')
      }, {
        path: 'add',
        meta: { title: '添加' },
        component: () => import('@/components/page/appChild/add')
      }, {
        path: 'detail/:bid',
        component: () => import('@/components/page/appChild/detail'),
        name: 'detail',
        meta: { title: '详情' }
      }]
    }

  ]
})
