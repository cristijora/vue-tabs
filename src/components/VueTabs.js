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
            this.activeTabIndex = newIndex
            let oldTab = this.tabs[oldIndex]
            let newTab = this.tabs[newIndex]
            oldTab.active =false
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
        addTab(item) {
            const index = this.$slots.default.indexOf(item.$vnode);
            this.tabs.splice(index, 0, item);
        },
        removeTab(item) {
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
        findTabAndActivate (tabName) {
            let indexToActivate = this.tabs.findIndex(tab => tab.title === tabName)
            if (indexToActivate != -1) {
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
                                        {position === 'center' && this.renderIcon(index)}&nbsp;{title}
                                  </span> )

            if (tab.$slots.title) return tab.$slots.title
            return simpleTitle
        },
        renderIcon (index) {
            if (this.tabs.length === 0) return
            let tab = this.tabs[index]
            let {icon} = tab
            let simpleIcon = <i class={icon}></i>
            if (!tab.$slots.title && icon) return simpleIcon
        },
        renderTabs () {
            return this.tabs.map((tab, index) => {
                if (!tab) return
                let {route, id, title, icon} = tab
                let active = this.activeTabIndex === index
                return (
                    <li name="tab" onClick={() => this.navigateToTab(index, route)} class={['tab', {active: active}]}
                        key={title}
                        role="presentation">
                        {this.textPosition === 'top' &&
                        this.renderTabTitle(index, this.textPosition)
                        }
                        <a href="javascript:void(0)"
                           onClick={() => this.navigateToTab(index)}
                           style={active ? this.activeTabStyle : {}}
                           class={{'active_tab': active}}
                           aria-selected={active}
                           aria-controls={`#${id}`}
                           role="tab">
                            {this.textPosition !=='center' && !tab.$slots.title && this.renderIcon(index)}
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
            <div class={['vue-tabs',this.stackedClass ]}>
                <div class={[{'nav-tabs-navigation': !this.isStacked}, {'left-vertical-tabs': this.isStacked }]}>
                    <div class={['nav-tabs-wrapper', this.stackedClass]}>
                        <ul class={this.classList} role="tablist">
                            {tabList}
                        </ul>
                    </div>
                </div>
                <div class={['tab-content',{'right-text-tabs': this.isStacked } ]}>
                    {this.$slots.default}
                </div>
            </div>)
    },
    watch: {
        tabs: function (newList) {
            if (newList.length > 0 && !this.value) {
                this.activateTab(this.activeTabIndex)
            }
            if (newList.length > 0 && this.value) {
                this.findTabAndActivate(this.value)
            }
        }
    },
    value: function (newVal) {
        this.findTabAndActivate(newVal)
    }
}
