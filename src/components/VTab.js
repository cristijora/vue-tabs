export default{
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
        aniimateInClass: String,
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
        }
    },
    data () {
        return {
            active: false,
            validationError: null
        }
    },
    mounted(){
      this.$parent.addTab(this)
    },
    destroyed() {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
        this.$parent.removeTab(this);
    },
    render () {
        return ( <section class="tab-container"
                          role="tabpanel" class={{[this.aniimateInClass] : this.active}} v-show={this.active}>
            {this.$slots.default}
        </section>)
    }
}
