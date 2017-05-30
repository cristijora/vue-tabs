module.exports = {

  VueTabs: require('./components/VueTabs.vue'),
  VTab: require('./components/TabContent.vue'),

  install: function (Vue) {
    Vue.component('vue-tabs', module.exports.VueTabs)
    Vue.component('v-tab', module.exports.VTab)
  }
}
