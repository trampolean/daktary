class Markdown {
  constructor(content) {
    this.content = content
    this.metas = {}
    if (this.isMetas()) {
      this._extractMetas()
    }
  }
  isMetas() {
    return !! this.content.match(/---([\s\S]*?)---/)
  }
  _extractMetas() {
    let labelList = ''
    this.content.match(/---([\s\S]*?)---/)[1].split('\n')
      .map(elt => {
        if (!! elt.match(/^\w+:$/)) {
          console.log('elt ul', elt)
          console.log('labelList ul', labelList)
          const [, label] = elt.match(/^(\w+):$/)
          this.metas[label] = []
          labelList = label
        }
        if (elt.match(/^  - [\s\S]*?$/)) {
          console.log('elt', elt)
          console.log('labelList', labelList)
          const [, content] = elt.match(/^  - ([\s\S]*?)$/)
          this.metas[labelList].push(content)
        }
        if (elt.match(/^\w+: [\s\S]*?$/)) {
          const [, label, content] = elt.match(/^(\w+): ([\s\S]*?)$/)
          this.metas[label] = content.trim()
        }
      })
  }
}
