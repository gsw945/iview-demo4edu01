import Vue from 'vue'
import App from './App.vue'
import './plugins/iview.js'

Vue.config.productionTip = false

// vue2.0 下对网页标题(document.title)更新的一种实现思路:
// https://segmentfault.com/a/1190000007387556
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
