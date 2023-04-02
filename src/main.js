import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
Vue.config.productionTip = false
// 全局导入echarts
// import echarts from './plugins/echarts.min.js'
// Vue.prototype.$echarts = echarts

// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

// // 导入tensorflow
// import * as tf from '@tensorflow/tfjs'
// Vue.prototype.$tf = tf

//导入axios
import axios from 'axios'
// 挂载之前设置一个请求拦截器，吧token给加到请求头中,不然除了登录的接口，都没有权限
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

Vue.prototype.$axios = axios
// 配置请求的根路径
axios.defaults.baseURL = 'http://localhost:80'
// 导入并使用qs,用来解析axio post请求发给服务器端的数据的
import qs from 'qs'
Vue.prototype.$qs = qs




new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
