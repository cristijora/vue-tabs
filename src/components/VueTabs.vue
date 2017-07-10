<template>
  <div class="vue-tabs" :class="stackedClass">
    <ul :class="classList" role="tablist">

      <slot name="tab" v-for="(tab, index) in tabs"
            :tab="tab"
            :index="index"
            :click-handler="navigateToTab">
        <li :class="{active:tab.active}" class="tab" :key="tab" role="presentation">
          <span v-if="textPosition === 'top'" class="title title_top" :style="tab.active ? activeTitleColor: {}">
              {{tab.title}}
          </span>

          <a :href="`#${tab.id}`"
             @click.prevent="navigateToTab(index)"
             :style="tab.active ? activeTabStyle : {}"
             :aria-selected="tab.active"
             :aria-controls="`#${tab.id}`"
             role="tab">

            <i :class="tab.icon">
              <span v-if="textPosition === 'center'">
                 {{tab.title}}
              </span>
            </i>
          </a>

          <span v-if="textPosition === 'bottom'" class="title title_bottom"
                :style="tab.active ? activeTitleColor: {}">
              {{tab.title}}
          </span>

        </li>
      </slot>

    </ul>
    <div class="tab-content">
      <slot>
      </slot>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'vue-tabs',
    props: {
      activeTabColor: String,
      activeTextColor: String,
      /**
       * Tab title position: center | bottom | top
       */
      textPosition: {
        type: String,
        default: 'center'
      },
      /**
       * Tab type: tabs | pills
       */
      type: {
        type: String,
        default: 'tabs'
      },
      direction: {
        type: String,
        default: 'horizontal'
      },
      /**
       * Centers the tabs and makes the container div full width
       */
      centered: Boolean,
      /***
       * Index of the initial tab to display
       */
      startIndex: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        activeTabIndex: 0,
        tabs: []
      }
    },
    computed: {
      tabCount () {
        return this.tabs.length
      },
      isTabShape () {
        return this.type === 'tabs'
      },
      isStacked () {
        return this.direction === 'vertical'
      },
      classList () {
        let navType = this.isTabShape ? 'nav-tabs' : 'nav-pills'
        let centerClass = this.centered ? 'nav-justified' : ''
        let isStacked = this.isStacked ? 'nav-stacked' : ''
        let classes = `nav ${navType} ${centerClass} ${isStacked}`
        return classes
      },
      stackedClass () {
        return this.isStacked ? 'stacked' : ''
      },
      activeTabStyle () {
        return {
          backgroundColor: this.activeTabColor,
          color: this.activeTextColor
        }
      },
      activeTitleColor () {
        return {
          color: this.activeTabColor
        }
      }
    },
    methods: {
      navigateToTab (index) {
        this.beforeTabChange(this.activeTabIndex, () => {
          this.changeTab(this.activeTabIndex, index)
        })
      },
      setLoading (value) {
        this.loading = value
        this.$emit('on-loading', value)
      },
      setValidationError (tab, error) {
        this.tabs[this.activeTabIndex].validationError = error
        this.$emit('on-error', error)
        if (error && tab.$emit) {
          tab.$emit('on-error', error)
        }
      },
      validateBeforeChange (promiseFn, tab, callback) {
        this.setValidationError(tab, null)
        // we have a promise
        if (promiseFn.then && typeof promiseFn.then === 'function') {
          this.setLoading(true)
          promiseFn.then((res) => {
            this.setLoading(false)
            let validationResult = res === true
            this.executeBeforeChange(validationResult, callback)
          }).catch((error) => {
            this.setLoading(false)
            this.setValidationError(tab, error)
          })
          // we have a simple function
        } else {
          let validationResult = promiseFn === true
          this.executeBeforeChange(validationResult, callback)
        }
      },
      executeBeforeChange (validationResult, callback) {
        this.$emit('on-validate', validationResult, this.activeTabIndex)
        if (validationResult) {
          callback()
        } else {
          this.tabs[this.activeTabIndex].validationError = 'error'
        }
      },
      beforeTabChange (index, callback) {
        if (this.loading) {
          return
        }
        let oldTab = this.tabs[index]
        if (oldTab && oldTab.beforeChange !== undefined) {
          let tabChangeRes = oldTab.beforeChange()
          this.validateBeforeChange(tabChangeRes, oldTab, callback)
        } else {
          callback()
        }
      },
      changeTab (oldIndex, newIndex) {
        if (newIndex < 0 || newIndex >= this.tabCount) {
          return
        }
        let oldTab = this.tabs[oldIndex]
        let newTab = this.tabs[newIndex]
        if (oldTab) {
          oldTab.active = false
          if (newTab) {
            newTab.active = true
          }
        }
        this.activeTabIndex = newIndex
        this.$emit('tab-change', newIndex, newTab, oldTab)
        this.tryChangeRoute(newTab)
      },
      tryChangeRoute (tab) {
        if (this.$router && tab && tab.route) {
          this.$router.push(tab.route)
        }
      },
      getTabs () {
        if (this.$slots.default) {
          return this.$slots.default
            .filter(comp => comp.componentOptions)
            .map(comp => comp.componentInstance)
        } else {
          return []
        }
      },
      initTabs () {
        if (this.tabs.length > 0 && this.startIndex === 0) {
          let firstTab = this.tabs[this.activeTabIndex]
          firstTab.active = true
          this.tryChangeRoute(firstTab)
        }
        if (this.startIndex < this.tabs.length) {
          let tabToActivate = this.tabs[this.startIndex]
          this.activeTabIndex = this.startIndex
          tabToActivate.active = true
          this.tryChangeRoute(this.tabs[this.startIndex])
        }
      }
    },
    updated () {
      let currentTabs = this.getTabs()
      if (this.tabs.length === currentTabs.length) return
      this.tabs = currentTabs
      this.initTabs()
    },
    mounted () {
      this.tabs = this.getTabs()
      this.initTabs()
    }
  }
</script>
<style>
</style>
<style lang="scss">
  @import "./../assets/tabs";
</style>
