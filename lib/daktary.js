  /**
   * An object to manage Github ressources.
   *
   * @param {String} An HTML string reprsenting a github Url.
   *
   */
class GithubUrl {
  constructor(ghUrl) {
    this.ghUrl = ghUrl
    this.isValid = this.isValid(ghUrl)
    this.htmlContent = '...'

    if (this.isValid) {
      this.loadGhContrib(ghUrl, (htmlContent) => this.htmlContent = htmlContent)
    }
  }
  isValid(ghUrl) {
    return this.checkGhBlob(ghUrl)
  }
  checkGhBlob(ghUrl) {
    const owner = '[A-Za-z\u00C0-\u017F+\-]*'
    const repo = '[A-Za-z\u00C0-\u017F+\-]*'
    const branch = 'master'
    const path = ''
    const filename = '[A-Za-z\u00C0-\u017F+\-\_]*[.]md'
    return !! ghUrl.match(`^${owner}\/${repo}\/blob\/${branch}\/${filename}$`)
  }
  loadGhContrib(ghUrl, callback) {
    fetch(ghUrl)
      .then(response => response.text())
      .then(html => callback(html))
  }
}
