import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import '@/utils/element'
// 自己设置的样式优先级最高，所以放在引用的最后面
import '@/stylus/index.css'
import '@/utils/global'
import '@/utils/quill'
// 初始化时间总线
const bus = new Vue()
// 将事件总线挂载到vue的原型上
Vue.prototype.$bus = bus

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
