# Vue-tabs
Simplified, customizable bootstrap based tabs
Vue-tabs is a tab component which simplifies the usage of tabs and their customization
## Demos
* [Basic demo](https://jsfiddle.net/CristiJ/b44cc4dq/22/)
* [Icons and colors](https://jsfiddle.net/CristiJ/b44cc4dq/26/)
* [Full width centered tabs with text bellow](https://jsfiddle.net/CristiJ/b44cc4dq/29/)
* [Vertical tabs](https://jsfiddle.net/CristiJ/b44cc4dq/32/)

## Usage
## NPM
`npm install vue-nav-tabs`

## Or alternatively directly include the javascript
Download the css and js files from `dist` folder or reference them directly from github (check jsfiddle links)
```html
<link rel="stylesheet" href="vue-tabs.min.css">
<script src="vue-tabs.js"></script>
```
## Component registration
```js
//global registration
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/dist/vue-tabs.min.css'
Vue.use(VueTabs)

//local registration
import {VueTabs, VTab} from 'vue-nav-tabs'
import 'vue-nav-tabs/dist/vue-tabs.min.css'
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

# Props

## Vue-tabs props
```js
props: {
  title: {
    type: String,
    default: ''
  },
  /***
   * Icon name for the upper circle corresponding to the tab
   * Supports themify icons only for now.
   */
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
  route: {
    type: [String, Object]
  }
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
