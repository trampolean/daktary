class Markdown {
  constructor(content) {
    this.content = content
    this.metas = {}
    if (this._isMetas()) {
      this._extractMetas()
    }
  }
  _isMetas() {
    return !! this.content.match(/---([\s\S]*?)---/)
  }
  _extractMetas() {
    this.content.match(/---([\s\S]*?)---/)[1]
      .split('\n')
      .filter(elt => elt.trim())
      .map(elt => {
        const [, key, value] = elt.match(/([\s\S]*?): (.*)/)
        this.metas[key.trim()] = value.trim()
      })
  }
}
