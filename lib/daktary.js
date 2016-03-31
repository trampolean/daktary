/**
   * An object to manage Github url.
   *
   * @param {String} An HTML string reprsenting a github Url.
   *
   */
class GithubUrl {
  constructor(url) {
    this.url =  url
    this.isValid = this.checkGhBlob() || this.checkGhTree()

    if (this.isValid) {
      let [owner, repo, , branch, ...filename] = this.url.split('/')
      this.ghData = {
        keys: {
          secret: atob(GH_SECRET),
          id: atob(GH_ID )
        },
        owner: owner,
        repo: repo,
        branch: branch,
        filename: filename.join('/')
      }
    }
  }
  checkGhBlob() {
    const owner = '[A-Za-z\u00C0-\u017F+\-]*'
    const repo = '[A-Za-z\u00C0-\u017F+\-]*'
    const branch = 'master' || 'gh-pages'
    const filename = '[A-Za-z\u00C0-\u017F+\-\_]*[.]md'
    return !! this.url
      .match(`^${owner}\/${repo}\/blob\/${branch}\/${filename}$`)
  }
  checkGhTree() {
    const owner = '[A-Za-z\u00C0-\u017F+\-]*'
    const repo = '[A-Za-z\u00C0-\u017F+\-]*'
    const branch = 'master' || 'gh-pages'
    const path = '[A-Za-z\u00C0-\u017F+\-\_]*'
    return !! this.url
      .match(`^${owner}\/${repo}\/tree\/${branch}\/${path}$`)
  }
  toGhApiUrl() {
    let {keys, owner, repo, branch, filename} = this.ghData
    return `https://api.github.com` +
           `/repos/${owner}/${repo}/contents/${filename}` +
           `?ref=${branch}&client_id=${keys.id}&client_secret=${keys.secret}`
  }
}
