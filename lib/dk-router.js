/**
   * A Router to manage client side url.
   *
   * @param {String} An HTML string reprsenting an arguments
   * and queries option Url.
   *
   */
const Router = class Router {
  constructor(url) {
    this.url =  ''
    this.currentRoute = ''
    this.injectLayout = () => {}
    this._routes = []
    this.params = {}
    if (this._isOffLine()) {
      this._go503()
    }
  }
  _isOffLine() {
    return ! navigator.onLine
  }
  _go503() {
    window.location = './503.html'
  }
  _shortUrl() {
    return this.url.split('?')[0]
  }
  _resetRoute() {
    this.currentRoute = ''
    this.layout = ''
    this.params = []
  }
  _setParams(pattern) {
    const paramsName = pattern.split('/')
    const paramsValue = this._shortUrl().split('/')
    for (let index in paramsName) {
      // Store all remain values
      if (paramsName[index].match(/\(\.\*\)/)) {
        this.params[paramsName[index].match(/^:(\w+)/)[1]] =
          paramsValue.slice(index).join('/')
      // Store single value
      } else if (paramsName[index].match(/^:/)) {
        this.params[paramsName[index].match(/^:(\w+)/)[1]] =
          paramsValue[index]
      }
    }
  }
  _patternToRegex(pattern) {
    const regex = []
    regex.push('^')
    pattern.split('/').map(patternItem => {
      // Capture a parameter
      if (patternItem.match(/^:/)) {
        let regTmp = '[A-Za-z\u00C0-\u017F\-\_\.]*'
        // Capture all the parameters
        if (patternItem.match(/\(\.\*\)$/)) {
          regTmp = '[A-Za-z\u00C0-\u017F\-\_\.\/]*'
        }
        // Capture optional parameters
        if (patternItem.match(/\?$/)) {
          regex.pop()
          regTmp = '(\/[A-Za-z\u00C0-\u017F\-\_\.\/]*|)'
        }
        regex.push(regTmp)
      } else {
        // Capture a fixed parameter
        regex.push(patternItem)
      }
      regex.push('\/')
    })
    regex.pop()
    regex.push('$')
    return regex.join('')
  }
  _checkPatternWithUrl(pattern) {
    return !! this._shortUrl().match(this._patternToRegex(pattern))
  }
  _findAndSetCurrentRoute() {
    return this._routes.map(route => {
      if (this._checkPatternWithUrl(route.pattern)) {
        // Execute the action attach on a route
        (route.action.bind(this))()
        this._setParams(route.pattern)
        return route
      }
    })
  }
  isNoRoute() {
    return ! this.currentRoute
  }
  go(url) {
    this._resetRoute()
    this.url = url
    this._findAndSetCurrentRoute()
    this.injectLayout()
  }
  route(pattern, action) {
    this._routes.push({
      pattern: pattern,
      action: action
    })
  }
}
