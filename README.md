# (WIP) Vue-tabs

## Demo
[Basic demo](https://jsfiddle.net/CristiJ/b44cc4dq/11/) WIP
## Usage
```js
Vue.use(VueTabs)
```
```html
<vue-tabs>
    <tab-content title="First tab">
      First tab content
    </tab-content>

    <tab-content title="Second tab">
      Second tab content
    </tab-content>

    <tab-content title="Third tab">
      Third tab content
    </tab-content>
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

## Tab-content props

```js
props: {
  startIndex: {
    type: Number,
    default: 0
  }
}
```
