import VueTabs from './components/VueTabs.js'
import VTab from './components/VTab.js'
const VueTabsPlugin = {
  install(Vue) {
    Vue.component('vue-tabs', VueTabs)
    Vue.component('v-tab', VTab)
  }
}
// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueTabsPlugin)
}
export default VueTabsPlugin
export {
    VueTabs,
    VTab
}