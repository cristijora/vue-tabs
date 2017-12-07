export default {
    name: 'vue-tabs',
    props: {
        activeTabColor: String,
        activeTextColor: String,
        disabledColor: String,
        disabledTextColor: String,
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
        value: [String, Number, Object]
    },
    data () {
        return {
            activeTabIndex: 0,
            tabs: []
        }
    },
    computed: {
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
            return `nav ${navType} ${centerClass} ${isStacked}`
        },
        stackedClass () {
            return this.isStacked ? 'stacked' : ''
        },
        activeTabStyle () {
            return {
                backgroundColor: this.activeTabColor,
                color: this.activeTextColor
            }
        }
    },
    methods: {
        navigateToTab (index, route) {
            this.changeTab(this.activeTabIndex, index, route)
        },
        activateTab (index) {
            this.activeTabIndex = index
            let tab = this.tabs[index]
            tab.active = true
            this.$emit('input', tab.title)
        },
        changeTab (oldIndex, newIndex, route) {
            let oldTab = this.tabs[oldIndex]
            let newTab = this.tabs[newIndex]
            if (newTab.disabled) return;
            this.activeTabIndex = newIndex
            oldTab.active = false
            newTab.active = true
            this.$emit('input', this.tabs[newIndex].title)
            this.$emit('tab-change', newIndex, newTab, oldTab)
            this.tryChangeRoute(route)
        },
        tryChangeRoute (route) {
            if (this.$router && route) {
                this.$router.push(route)
            }
        },
        addTab (item) {
            const index = this.$slots.default.indexOf(item.$vnode);
            this.tabs.splice(index, 0, item);
        },
        removeTab (item) {
            const tabs = this.tabs;
            const index = tabs.indexOf(item);
            if (index > -1) {
                tabs.splice(index, 1);
            }
        },
        getTabs () {
            if (this.$slots.default) {
                return this.$slots.default.filter(comp => comp.componentOptions)
            }
            return []
        },
        findTabAndActivate (tabNameOrIndex) {
            let indexToActivate = this.tabs.findIndex((tab, index) => tab.title === tabNameOrIndex || index === tabNameOrIndex)
            if (indexToActivate === this.activeTabIndex) return
            if (indexToActivate !== -1) {
                this.changeTab(this.activeTabIndex, indexToActivate)
            } else {
                this.changeTab(this.activeTabIndex, 0)
            }
        },
        renderTabTitle (index, position = 'top') {
            if (this.tabs.length === 0) return
            let tab = this.tabs[index]
            let {active, title} = tab
            let titleStyles = {color: this.activeTabColor}
            if (position === 'center') titleStyles.color = this.activeTextColor
            let simpleTitle = (<span class={`title title_${position}`} style={active ? titleStyles : {}}>
                                        {position === 'center' && this.renderIcon(index)}{title}
                                  </span> )

            if (tab.$slots.title) return tab.$slots.title
            return simpleTitle
        },
        renderIcon (index) {
            if (this.tabs.length === 0) return
            let tab = this.tabs[index]
            let {icon} = tab
            let simpleIcon = <i class={icon}>&nbsp;</i>
            if (!tab.$slots.title && icon) return simpleIcon
        },
        tabStyles (tab) {
            if (tab.disabled) {
                return {
                    backgroundColor: this.disabledColor,
                    color: this.disabledTextColor
                }
            }
            return {}
        },
        renderTabs () {
            return this.tabs.map((tab, index) => {
                if (!tab) return
                let {route, id, title, icon, tabId} = tab
                let active = this.activeTabIndex === index
                return (
                    <li name="tab" onClick={() => !tab.disabled && this.navigateToTab(index, route)}
                        class={['tab', {active: active}, {disabled: tab.disabled}]}
                        key={title}
                        id={`t-${tabId}`}
                        aria-selected={active}
                        aria-controls={`p-${tabId}`}
                        role="tab">
                        {this.textPosition === 'top' &&
                        this.renderTabTitle(index, this.textPosition)
                        }
                        <a href="#"
                           onClick={(e) => {
                             e.preventDefault();
                             return false;
                           }}
                           style={active ? this.activeTabStyle : this.tabStyles(tab)}
                           class={[{'active_tab': active}, 'tabs__link']}
                           role="tab">
                            {this.textPosition !== 'center' && !tab.$slots.title && this.renderIcon(index)}
                            {this.textPosition === 'center' &&
                            this.renderTabTitle(index, this.textPosition)
                            }
                        </a>
                        {this.textPosition === 'bottom' &&
                        this.renderTabTitle(index, this.textPosition)
                        }
                    </li>
                )
            })
        }
    },
    render () {
        const tabList = this.renderTabs()
        return (
            <div class={['vue-tabs', this.stackedClass]}>
                <div class={[{'nav-tabs-navigation': !this.isStacked}, {'left-vertical-tabs': this.isStacked}]}>
                    <div class={['nav-tabs-wrapper', this.stackedClass]}>
                        <ul class={this.classList} role="tablist">
                            {tabList}
                        </ul>
                    </div>
                </div>
                <div class={['tab-content', {'right-text-tabs': this.isStacked}]}>
                    {this.$slots.default}
                </div>
            </div>)
    },
    watch: {
        tabs (newList) {
            if (newList.length > 0 && !this.value) {
                if (newList.length <= this.activeTabIndex) {
                    this.activateTab(this.activeTabIndex - 1);
                } else {
                    this.activateTab(this.activeTabIndex);
                }
            }
            if (newList.length > 0 && this.value) {
                this.findTabAndActivate(this.value)
            }
        },
        value (newVal) {
            this.findTabAndActivate(newVal)
        }
    }
}
