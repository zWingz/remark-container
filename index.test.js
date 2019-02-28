const remark = require('remark')
const html = require('remark-html')
const cheerio = require('cheerio')

const plugin = require('.')

function getHTML(md, opt) {
  const h = remark()
    .use(plugin, opt)
    .use(html)
    .processSync(md).contents
  return cheerio.load(h)
}

function testContainer(cheerioIns, { type, title, content }) {
  expect(cheerioIns.hasClass(type.toLowerCase())).toBeTruthy()
  expect(
    cheerioIns
      .find('p')
      .eq(0)
      .text(),
  ).toEqual(title.toUpperCase())
  let c = content
  if (!Array.isArray(content)) {
    c = [content]
  }
  c.forEach((each, idx) => {
    expect(
      cheerioIns
        .find('p')
        .eq(idx + 1)
        .text(),
    ).toEqual(each)
  })
}

describe('test generate container', () => {
  it('test normal render', () => {
    const str = `::: tip
this is content
:::
    `
    const $ = getHTML(str)
    const container = $('.remark-container')
    expect(container).toHaveLength(1)
    expect(container.hasClass('tip')).toBeTruthy()
    testContainer(container, {
      type: 'tip',
      title: 'TIP',
      content: 'this is content',
    })
  })
  it('test multi render', () => {
    const str = `
this is a paragraph
::: Warning
this is a warning content
:::
## heading
::: Error
this is a error content
:::
`
    const $ = getHTML(str)
    const container = $('.remark-container')
    expect(container).toHaveLength(2)
    const first = container.eq(0)
    const sec = container.eq(1)
    testContainer(first, {
      type: 'warning',
      title: 'warning',
      content: 'this is a warning content',
    })
    testContainer(sec, {
      type: 'error',
      title: 'Error',
      content: 'this is a error content',
    })
  })
  it('test multi content', () => {
    const str = `
  ::: fdsa custom title
this is line1
this is line2
  :::
    `
    const $ = getHTML(str)
    const container = $('.remark-container')
    testContainer(container, {
      title: 'custom title',
      type: 'fdsa',
      content: ['this is line1', 'this is line2'],
    })
  })
  it('test custom className', () => {
    const str = `
  ::: fdsa custom title
this is line1
this is line2
  :::
    `
    const className = 'fffff'
    const $ = getHTML(str, {
      className,
    })
    const container = $(`.${className}`)
    expect(container).toHaveLength(1)
  })
})
