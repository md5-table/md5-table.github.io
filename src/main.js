import Vue from 'vue'
import ElementUI from 'element-ui'
import VueClipboard from 'vue-clipboard2'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import loadPlugins from './plugins'

Vue.use(ElementUI)
Vue.use(VueClipboard)
loadPlugins({App, router, Vue})

new Vue({
  el: '#app',
  router: router,
  render: h => h(App),
  mounted() {
    console.log('xxxx')
    document.dispatchEvent(new Event('render-event'))
  }
})
