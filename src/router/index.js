import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入登录组件
import Login from '../components/Login.vue'
// 导入主页组件
import Home from '../components/Home.vue'
// 导入欢迎组件(主页的子组件)
import Welcome from '../components/Welcome.vue'
// 导入异常数据生成组件(主页的子组件)
import Data from '../components/Data.vue'
// 导入cnn神经网络组件(主页的子组件)
import Cnn from '../components/Cnn.vue'

Vue.use(VueRouter)



const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },     //当访问/主页的时候，重定向到login
    { path: '/login', component: Login },   //当访问/login的时候，展示登录组件
    {
      path: '/home',
      component: Home,
      // 只要访问了home，就重定向到welcome
      redirect: '/welcome',
      children: [{ path: '/welcome', component: Welcome },

      { path: '/data', component: Data },

      { path: '/cnn', component: Cnn },
      ],

    },

  ]
})


// 挂载全局路由导航守卫
router.beforeEach((to, from, next) => {
  // to:将要访问的路径,from:从哪个路径来,next:放行 next(/login)强制跳转

  // 如果访问登录页，直接放行
  if (to.path == '/login') return next()

  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 判断，如果没有token，证明没登录，就强制跳转到登录页,有就放行
  if (!tokenStr) {
    next('/login')
  } else {
    next()
  }

})


export default router


