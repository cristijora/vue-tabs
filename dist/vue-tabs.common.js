/*!
 * vue-nav-tabs v0.5.0
 * (c) 2017-present cristij <joracristi@gmail.com>
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var VueTabs = {
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
    data: function data() {
        return {
            activeTabIndex: 0,
            tabs: []
        };
    },

    computed: {
        isTabShape: function isTabShape() {
            return this.type === 'tabs';
        },
        isStacked: function isStacked() {
            return this.direction === 'vertical';
        },
        classList: function classList() {
            var navType = this.isTabShape ? 'nav-tabs' : 'nav-pills';
            var centerClass = this.centered ? 'nav-justified' : '';
            var isStacked = this.isStacked ? 'nav-stacked' : '';
            return 'nav ' + navType + ' ' + centerClass + ' ' + isStacked;
        },
        stackedClass: function stackedClass() {
            return this.isStacked ? 'stacked' : '';
        },
        activeTabStyle: function activeTabStyle() {
            return {
                backgroundColor: this.activeTabColor,
                color: this.activeTextColor
            };
        }
    },
    methods: {
        navigateToTab: function navigateToTab(index, route) {
            this.changeTab(this.activeTabIndex, index, route);
        },
        activateTab: function activateTab(index) {
            this.activeTabIndex = index;
            var tab = this.tabs[index];
            tab.active = true;
            this.$emit('input', tab.title);
        },
        changeTab: function changeTab(oldIndex, newIndex, route) {
            this.activeTabIndex = newIndex;
            var oldTab = this.tabs[oldIndex];
            var newTab = this.tabs[newIndex];
            oldTab.active = false;
            newTab.active = true;
            this.$emit('input', this.tabs[newIndex].title);
            this.$emit('tab-change', newIndex, newTab, oldTab);
            this.tryChangeRoute(route);
        },
        tryChangeRoute: function tryChangeRoute(route) {
            if (this.$router && route) {
                this.$router.push(route);
            }
        },
        addTab: function addTab(item) {
            var index = this.$slots.default.indexOf(item.$vnode);
            this.tabs.splice(index, 0, item);
        },
        removeTab: function removeTab(item) {
            var tabs = this.tabs;
            var index = tabs.indexOf(item);
            if (index > -1) {
                tabs.splice(index, 1);
            }
        },
        getTabs: function getTabs() {
            if (this.$slots.default) {
                return this.$slots.default.filter(function (comp) {
                    return comp.componentOptions;
                });
            }
            return [];
        },
        findTabAndActivate: function findTabAndActivate(tabName) {
            var indexToActivate = this.tabs.findIndex(function (tab) {
                return tab.title === tabName;
            });
            if (indexToActivate != -1) {
                this.changeTab(this.activeTabIndex, indexToActivate);
            } else {
                this.changeTab(this.activeTabIndex, 0);
            }
        },
        renderTabTitle: function renderTabTitle(index) {
            var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
            var h = this.$createElement;

            if (this.tabs.length === 0) return;
            var tab = this.tabs[index];
            var active = tab.active,
                title = tab.title;

            var titleStyles = { color: this.activeTabColor };
            if (position === 'center') titleStyles.color = this.activeTextColor;
            var simpleTitle = h(
                'span',
                { 'class': 'title title_' + position, style: active ? titleStyles : {} },
                [title]
            );

            if (tab.$slots.title) return tab.$slots.title;
            return simpleTitle;
        },
        renderIcon: function renderIcon(index) {
            var h = this.$createElement;

            if (this.tabs.length === 0) return;
            var tab = this.tabs[index];
            var icon = tab.icon;

            var simpleIcon = h(
                'i',
                { 'class': icon },
                []
            );
            if (!tab.$slots.title && icon) return simpleIcon;
        },
        renderTabs: function renderTabs() {
            var _this = this;

            var h = this.$createElement;

            return this.tabs.map(function (tab, index) {
                if (!tab) return;
                var route = tab.route,
                    id = tab.id,
                    title = tab.title,
                    icon = tab.icon;

                var active = _this.activeTabIndex === index;
                return h(
                    'li',
                    {
                        attrs: { name: 'tab',
                            role: 'presentation' },
                        on: {
                            'click': function click() {
                                return _this.navigateToTab(index, route);
                            }
                        },
                        'class': ['tab', { active: active }],
                        key: title },
                    [_this.textPosition === 'top' && _this.renderTabTitle(index, _this.textPosition), h(
                        'a',
                        {
                            attrs: { href: '#' + tab.id,

                                'aria-selected': active,
                                'aria-controls': '#' + id,
                                role: 'tab' },
                            on: {
                                'click': function click() {
                                    return _this.navigateToTab(index);
                                }
                            },

                            style: active ? _this.activeTabStyle : {},
                            'class': { 'active_tab': active } },
                        [_this.renderIcon(index), _this.textPosition === 'center' && _this.renderTabTitle(index, _this.textPosition)]
                    ), _this.textPosition === 'bottom' && _this.renderTabTitle(index, _this.textPosition)]
                );
            });
        }
    },
    render: function render() {
        var h = arguments[0];

        var tabList = this.renderTabs();
        return h(
            'div',
            { 'class': ['vue-tabs', this.stackedClass] },
            [h(
                'div',
                { 'class': [{ 'nav-tabs-navigation': !this.isStacked }, { 'left-vertical-tabs': this.isStacked }] },
                [h(
                    'div',
                    { 'class': ['nav-tabs-wrapper', this.stackedClass] },
                    [h(
                        'ul',
                        { 'class': this.classList, attrs: { role: 'tablist' }
                        },
                        [tabList]
                    )]
                )]
            ), h(
                'div',
                { 'class': ['tab-content', { 'right-text-tabs': this.isStacked }] },
                [this.$slots.default]
            )]
        );
    },

    watch: {
        tabs: function tabs(newList) {
            if (newList.length > 0 && !this.value) {
                this.activateTab(this.activeTabIndex);
            }
            if (newList.length > 0 && this.value) {
                this.findTabAndActivate(this.value);
            }
        }
    },
    value: function value(newVal) {
        this.findTabAndActivate(newVal);
    }
};

var VTab = {
    name: 'v-tab',
    props: {
        title: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        },
        /***
         * Function to execute before tab switch. Return value must be boolean
         * If the return result is false, tab switch is restricted
         */
        beforeChange: {
            type: Function
        },
        id: String,
        route: {
            type: [String, Object]
        },
        transitionName: String,
        transitionMode: String
    },
    computed: {
        isValidParent: function isValidParent() {
            return this.$parent.$options.name === 'vue-tabs';
        },
        hash: function hash() {
            return '#' + this.id;
        }
    },
    data: function data() {
        return {
            active: false,
            validationError: null
        };
    },
    mounted: function mounted() {
        this.$parent.addTab(this);
    },
    destroyed: function destroyed() {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
        this.$parent.removeTab(this);
    },
    render: function render() {
        var h = arguments[0];

        return h(
            'section',
            { 'class': 'tab-container',
                attrs: { role: 'tabpanel' },
                directives: [{
                    name: 'show',
                    value: this.active
                }]
            },
            [this.$slots.default]
        );
    }
};

var VueTabsPlugin = {
  install: function install(Vue) {
    Vue.component('vue-tabs', VueTabs);
    Vue.component('v-tab', VTab);
  }
};
// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueTabsPlugin);
}

exports['default'] = VueTabsPlugin;
exports.VueTabs = VueTabs;
exports.VTab = VTab;
