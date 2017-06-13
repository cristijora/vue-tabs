# Vue-tabs
Simplified, customizable bootstrap based tabs
Vue-tabs is a tab component which simplifies the usage of tabs and their customization
## Demos
* [Basic demo](https://jsfiddle.net/CristiJ/b44cc4dq/22/)
* [Icons and colors](https://jsfiddle.net/CristiJ/b44cc4dq/26/)
* [Full width centered tabs with text bellow](https://jsfiddle.net/CristiJ/b44cc4dq/29/)
* [Vertical tabs](https://jsfiddle.net/CristiJ/b44cc4dq/32/)
* [In browser Plaground](?id=playground)

## Usage
## NPM
`npm install --save vue-nav-tabs `
`yarn add --dev vue-nav-tabs`

## Direct script include
Download the css and js files from `dist` folder or reference them directly from github (check jsfiddle links)
```html
<link rel="stylesheet" href="https://unpkg.com/vue-nav-tabs/dist/vue-tabs.min.css">
<script src="https://unpkg.com/vue-nav-tabs/dist/vue-tabs.js"></script>

```
## Component registration
```js
//global registration
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/dist/vue-tabs.min.css'
Vue.use(VueTabs)

//local registration
import {VueTabs, VTab} from 'vue-nav-tabs'
//you can also import this in your style tag
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

## Events
 
Event Name | Params
------------ | -------------
tab-change | tabIndex, newTab, oldTab

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
Javascript
```js
methods:{
    handleTabChange(tabIndex, newTab, oldTab){
        //your code here
    }
}
```

JSFiddle example - https://jsfiddle.net/b44cc4dq/56/

# Playground

## Simple

<vuep template="#simpleexample"></vuep>

<script v-pre type="text/x-template" id="simpleexample">
<template>
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
 
</template>

<script>
  Vue.use(VueTabs);
  export default {}
</script>
</script>


## Icons and colored tabs
<p class="tip">
 Note that the icons are imported separately (via script tag in this case).
 In the demos below themify-icons are used, but you can use pretty much any icons you wish.
</p>
<vuep template="#icons"></vuep>

<script v-pre type="text/x-template" id="icons">
<template>
   <vue-tabs active-tab-color="#9b59b6" 
             active-text-color="white">
      <v-tab title="First tab" icon="ti-user">
        First tab content
      </v-tab>
  
      <v-tab title="Second tab" icon="ti-settings">
        Second tab content
      </v-tab>
  
      <v-tab title="Third tab" icon="ti-check">
        Third tab content
      </v-tab>
  </vue-tabs>
 
</template>

<script>
  Vue.use(VueTabs);
  export default {}
</script>
</script>


## Full width tabs

<vuep template="#fullpage"></vuep>

<script v-pre type="text/x-template" id="fullpage">
<template>
    <vue-tabs active-tab-color="#e74c3c" 
              active-text-color="white"
              type="pills"
              text-position="bottom"
              centered
    >
       <v-tab title="First tab" icon="ti-user">
         First tab content
       </v-tab>
   
       <v-tab title="Second tab" icon="ti-settings">
         Second tab content
       </v-tab>
   
       <v-tab title="Third tab" icon="ti-check">
         Third tab content
       </v-tab>
   </vue-tabs>
 
</template>

<script>
  Vue.use(VueTabs);
  export default {}
</script>
</script>

## Vertical tabs

<vuep template="#vertical"></vuep>

<script v-pre type="text/x-template" id="vertical">
<template>
    <vue-tabs active-tab-color="#e74c3c" 
               active-text-color="white"
               type="pills"
               :start-index="1"
               direction="vertical">
        <v-tab title="First tab" icon="ti-user">
          First tab content
        </v-tab>
    
        <v-tab title="Second tab" icon="ti-settings">
          Second tab content
        </v-tab>
    
        <v-tab title="Third tab" icon="ti-check">
          Third tab content
        </v-tab>
    </vue-tabs>
 
</template>

<script>
  Vue.use(VueTabs);
  export default {}
</script>
</script>
