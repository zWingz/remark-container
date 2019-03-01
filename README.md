# Remark Container

markdown container like [markdown-it-container](https://github.com/markdown-it/markdown-it-container)

[![CircleCI](https://circleci.com/gh/zWingz/remark-container.svg?style=svg)](https://circleci.com/gh/zWingz/remark-container)
[![codecov](https://codecov.io/gh/zWingz/remark-container/branch/master/graph/badge.svg)](https://codecov.io/gh/zWingz/remark-container)

## Example

``` markdown
::: tip
content
:::
```

``` markdown
::: tip title
content
muliti line
:::
```

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
::: tip title
hello
:::
`)
```

output

```html
<div class="remark-container tip">
  <p class="remark-container-title">TITLE</p>
  <p>hello</p>
</div>
```

## Options

- className: class for `div` container, default `remark-container`
