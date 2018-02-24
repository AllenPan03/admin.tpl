import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
//入口组件
// import App from './App'
//路由组件
// import Hello from './components/Hello.vue'

import main from './main.vue'
import welcome from './components/welcome/welcome.vue'
import whiteList from './components/white-list-manage/white-list-manage.vue' 

//自定义表单验证
//require('./js/customize-validate.js')
// import tabShow from './components/basic/tab-show.vue'
//安装路由
Vue.use(VueRouter)
Vue.use(VueResource)
//配置组件和路由映射
const routes = [
    { path: '/', redirect: 'welcome'}
    ,{ path: '/welcome', component: welcome, name: 'welcome'}
    //白名单
    ,{ path: '/whiteList', component: whiteList, name: 'whiteList'}
]
const router = new VueRouter({
    routes
    //,mode: 'history'
})

/* eslint-disable no-new */
// const main = new Vue({
//   router

const eventHub = new Vue()
//设置全局变量
window.eventHub = eventHub
new Vue({
    el: "#main"
    ,router
    ,render: h => h(main)
})

