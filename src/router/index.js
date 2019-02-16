import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/home/home.vue'
import Login from '@/components/login/login.vue'
import Users from '@/components/users/users.vue'
import Demos from '@/components/demos/demos.vue'
import Ceshi from '@/components/ceshi/ceshi.vue'
import { Loading } from 'element-ui';
Vue.use(Router)

var router =  new Router({
  routes: [
    {path: '/', redirect: {path: '/home'}},
    {path: '/home', name: 'home', component: Home, children: [
        {path: '/users', name: 'users', component: Users},
        {path: '/demos', name: 'demos', component: Demos},
        {path: '/ceshi', name: 'ceshi', component: Ceshi}
      ]},
    {path: '/login', name: 'login', component: Login}
  ]
})
export default router
