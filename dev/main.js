import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import VueTabs from './../src/index'
import './../themes/paper.scss'
import './themify-icons.css'
const First = {template: '<div>First</div>'}
const Second = {template: '<div>Second</div>'}
const Third = {template: '<div>Third</div>'}

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/first', component: First},
    {path: '/second', component: Second},
    {path: '/third', component: Third}
  ]
})
Vue.use(VueRouter)
Vue.use(VueTabs)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
