  /**
   * An object to manage Github ressources.
   *
   * @param {String} An HTML string reprsenting a github Url.
   *
   */

class GithubUrl {
  constructor(ghUrl) {
    this.ghUrl = ghUrl
    this.isValid = this.isValid()
  }
  isValid() {
    return this.checkGhBlob(this.ghUrl)
  }
  checkGhBlob(url) {
    const owner = '[A-Za-z\u00C0-\u017F+\-]*'
    const repo = '[A-Za-z\u00C0-\u017F+\-]*'
    const branch = 'master'
    const path = ''
    const filename = '[A-Za-z\u00C0-\u017F+\-\_]*[.]md'
    return !! this.ghUrl
      .match(`^${owner}\/${repo}\/blob\/${branch}\/${filename}$`)
  }
}
