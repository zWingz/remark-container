# Remark Container

## Usage

`npm install remark-container`
or
`yarn remark-container`

```javascript
const remark = require('remark')
const html = require('remark-html')
remark()
    .use(plugin, opt)
    .use(html).process(`
::: tip
hello
:::
`)
```

output

```html
<div class="remark-container tip">
  <p class="remark-container-title">TIP</p>
  <p>hello</p>
</div>
```

## Options

- className: class for `div` container, default `remark-container`
