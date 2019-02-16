// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import router from './router'
import ElementUI from 'element-ui'

import Myaxios from '@/assets/js/myaxios.js'
import Mybread from '@/components/common/mybread.vue'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'

Vue.use(ElementUI)

Vue.use(Myaxios)
// 关闭生产环境中的警告
Vue.config.productionTip = false

// 将面包屑组件注册为全局组件
Vue.component(Mybread.name, Mybread)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
