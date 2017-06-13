var VueTabsPlugin = {
  VueTabs: require('./components/VueTabs.vue'),
  VTab: require('./components/TabContent.vue'),

  install: function (Vue) {
    Vue.component('vue-tabs', module.exports.VueTabs)
    Vue.component('v-tab', module.exports.VTab)
  }
}
module.exports = VueTabsPlugin

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueTabsPlugin)
}
