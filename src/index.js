module.exports = {

  VueTabs: require('./components/VueTabs.vue'),
  TabContent: require('./components/TabContent.vue'),

  install (Vue) {
    Vue.component('vue-tabs', module.exports.VueTabs)
    Vue.component('tab-content', module.exports.TabContent)
  }
}
