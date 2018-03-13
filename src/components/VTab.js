export default {
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
        tabData: {
            default: null
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
        disabled: Boolean,
        transitionName: String,
        transitionMode: String
    },
    computed: {
        isValidParent () {
            return this.$parent.$options.name === 'vue-tabs'
        },
        hash () {
            return `#${this.id}`
        },
        tabId () {
            return this.id ? this.id : this.title
        }
    },
    data () {
        return {
            active: false,
            validationError: null
        }
    },
    mounted () {
        this.$parent.addTab(this)
    },
    destroyed () {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
        this.$parent.removeTab(this);
    },
    render () {
        return (
            <section class="tab-container"
                     id={`p-${this.tabId}`}
                     aria-labelledby={`t-${this.tabId}`}
                     role="tabpanel" v-show={this.active}>
                {this.$slots.default}
            </section>)
    }
}
