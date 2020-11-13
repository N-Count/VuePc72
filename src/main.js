import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import '@/utils/element'
// 自己设置的样式优先级最高，所以放在引用的最后面
import '@/stylus/index.css'
import HmBreadcrumb from '@/components/HmBreadcrumb'

Vue.component('HmBreadcrumb', HmBreadcrumb)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
