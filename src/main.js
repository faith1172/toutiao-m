import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载动态设置REM基准值
import 'amfe-flexible'
// 引入全局样式
import '@/styles/index.less'

// 引入Vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
