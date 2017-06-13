import VueTabs from './components/VueTabs.vue'
import VTab from './components/TabContent.vue'
const VueTabsPlugin = {
  VueTabs: VueTabs,
  VTab: VTab,
  install: function (Vue) {
    Vue.component('vue-tabs', VueTabs)
    Vue.component('v-tab', VTab)
  }
}
// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueTabsPlugin)
}
export default VueTabsPlugin
