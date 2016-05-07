/**
   * An object to manage Github url.
   *
   * @param {String} An HTML string reprsenting a github Url.
   *
   */
class GithubUrl {
  constructor({owner, repo, branch, path}) {
    this.ghData = {
      keys: {
        secret: atob(GH_SECRET),
        id: atob(GH_ID )
      },
      owner: owner,
      repo: repo,
      branch: branch,
      path: path ? `/${path}` : ''
    }
  }
  _listMd(json) {
    return json.filter((elt) => {
      if (elt.type === 'dir' || elt.name.match(/.md$/)) {
        return elt
      }
    })
  }
  _listByFolder(json) {
    const files = []
    const dirs = []
    json.map((elt) => {
      if (elt.type === 'file') {
        files.push(elt)
      }
      if (elt.type === 'dir') {
        dirs.push(elt)
      }
    })
    return dirs.concat(files)
  }
  toGhApiSearch(query) {
    const {owner} = this.ghData
    return `https://api.github.com/search/code` +
           `?q=${query}+language:Markdown+user:${owner}`
  }
  toGhApiUrl() {
    const {keys, owner, repo, branch, path} = this.ghData
    const branchParam = !! branch ? `ref=${branch}&` : ''
    return `https://api.github.com` +
           `/repos/${owner}/${repo}/contents${path}` +
           `?${branchParam}client_id=${keys.id}&client_secret=${keys.secret}`
  }
  toGhRepoApiUrl() {
    const {keys, owner} = this.ghData
    return `https://api.github.com/users/${owner}/repos` +
           `?client_id=${keys.id}&client_secret=${keys.secret}`
  }
  getHtmlBlob() {
    return new Promise(
      (resolve, reject) => {
        fetch(this.toGhApiUrl(), {headers: {Accept: 'application/vnd.github.v3.html'}})
          .then(response => response.text())
          .then(htmlResponse => {
            resolve(htmlResponse)
          })
      })}
  getMdBlob() {
    return new Promise(
      (resolve, reject) => {
        fetch(this.toGhApiUrl(), {headers: {Accept: 'application/vnd.github.v3.raw'}})
          .then(response => response.text())
          .then(mdResponse => {
            resolve(mdResponse)
          })
      })}
  getJsonRepo() {
    return new Promise(
      (resolve, reject) => {
        fetch(this.toGhRepoApiUrl(), {headers: {Accept: 'application/vnd.github.v3'}})
          .then(response => response.json())
          .then(json => {
            resolve(json)
          })
      })}
  getJsonSearch(query) {
    return new Promise(
      (resolve, reject) => {
        fetch(this.toGhApiSearch(query), {headers: {Accept: 'application/vnd.github.v3.html'}})
          .then(response => response.json())
          .then(json => {
            resolve(json)
          })
      })}
  getJsonFolders() {
    return new Promise(
      (resolve, reject) => {
        fetch(this.toGhApiUrl(), {headers: {Accept: 'application/vnd.github.v3'}})
          .then(response => response.json())
          .then(json => {
            resolve(this._listByFolder(this._listMd(json)))
          })
      })}
}
