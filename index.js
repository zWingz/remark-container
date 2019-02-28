const unified = require('unified')
const remark = require('remark')
const stringify = require('remark-stringify')
const visit = require('unist-util-visit')
const html = require('remark-html')
const START_CODE = ':'
function attechment() {
  const parser = this.Parser
  const { blockTokenizers, blockMethods, interruptParagraph } = parser.prototype
  const paragraph = 'paragraph'
  blockTokenizers.container = tokenizer
  blockMethods.splice(blockMethods.indexOf('newline') + 1, 0, 'container')
  interruptParagraph.unshift(['container'])
  function tokenizer(eat, value, silent) {
    if (silent) {
      return true
    }
    const reg = /^\s*:::\s*(\w+)\s*(?<title>.*?)[\n\r]([\s\S]+?)(\s*:::\s*?)/
    let match = value.match(reg)
    console.log(match);
    if (!match) return
    const [input, type, title, content] = match
    const start = eat.now()
    const add = eat(input)
    const end = eat.now()
    const children = [
      {
        type: paragraph,
        children: [
          {
            type: 'text',
            value: (title || type).trim().toUpperCase()
          }
        ],
        data: { hProperties: { className: ['remark-container-title'] } }
      },
      ...this.tokenizeBlock(content.trim(), {})
    ]
    return add({
      type: 'container',
      children,
      data: {
        hName: 'div',
        hProperties: { className: ['remark-container', type.toLowerCase()] }
      },
      position: {
        start,
        end
      }
    })
  }
  tokenizer.notInList = true
  tokenizer.notInLink = true
}

function transform() {
  return tree => {
    visit(tree, 'container', node => {})
    visit(tree, 'paragraph', node => {})
  }
}

function parse(md) {
  return remark()
    .use([attechment, transform])
    .use(html)
    .processSync(md).contents
}

const d = parse(`
::: tips STOP fdsa f     
this is content     
this is content line 2   
:::

::: WARING     
this is content  123
this is content line 432   
:::
ddd`)
console.log(d)
