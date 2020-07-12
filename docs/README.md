# Vue-tabs
Simplified, customizable bootstrap based tabs
Vue-tabs is a tab component which simplifies the usage of tabs and their customization
## Demos
* [Basic demo](https://jsfiddle.net/b44cc4dq/187/)
* [Icons and colors](https://jsfiddle.net/b44cc4dq/188/)
* [Full width centered tabs with text bellow](https://jsfiddle.net/b44cc4dq/189/)
* [Vertical tabs](https://jsfiddle.net/b44cc4dq/190/)
* [Close or add tabs dynamically](https://jsfiddle.net/b44cc4dq/245/)
* [Change tabs programatically](https://jsfiddle.net/b44cc4dq/275/)

## NPM/YARN
```
npm install --save vue-nav-tabs 
yarn add vue-nav-tabs 
```

## Direct script include
```html
<link rel="stylesheet" href="https://unpkg.com/vue-nav-tabs/themes/vue-tabs.css">
<script src="https://unpkg.com/vue-nav-tabs/dist/vue-tabs.js"></script>

```
## Component registration
```js
//global registration
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
Vue.use(VueTabs)

//local registration
import {VueTabs, VTab} from 'vue-nav-tabs'
//you can also import this in your style tag
import 'vue-nav-tabs/themes/vue-tabs.css'
//component code
components: {
  VueTabs,
  VTab
}
```
```html
<vue-tabs>
    <v-tab title="First tab">
      First tab content
    </v-tab>

    <v-tab title="Second tab">
      Second tab content
    </v-tab>

    <v-tab title="Third tab">
      Third tab content
    </v-tab>
</vue-tabs>
```

# Theming
Vue-tabs supports 3 different themes by default:
* [Default (bootstrap)](https://jsfiddle.net/CristiJ/b44cc4dq/22/)
* [Paper](https://jsfiddle.net/b44cc4dq/191/)
* [Material](https://jsfiddle.net/b44cc4dq/198/)

# Props

## Vue-tabs props
```js
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
}
```

## V-tab props

```js
props: {
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  }
}
```
!> **Important** Not all prop combinations will look ok or display correctly (especially centered with vertical direction).
Feel free to do a PR if you fixed something :)

## Events
 
Event Name | Params
------------ | -------------
tab-change | tabIndex, newTab, oldTab
input | tabTitle
tab-added | tabsLength

### tab-change example

Template
```html
<vue-tabs @tab-change="handleTabChange">
    <v-tab title="First tab">
      First tab content
    </v-tab>

    <v-tab title="Second tab">
      Second tab content
    </v-tab>

    <v-tab title="Third tab">
      Third tab content
    </v-tab>
</vue-tabs>
```

```html
methods:{
    handleTabChange(tabIndex, newTab, oldTab){
        //your code here
    }
}
```

JSFiddle example - https://jsfiddle.net/b44cc4dq/56/

