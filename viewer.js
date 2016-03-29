  /**
   * Inject HTML code in #contribution tag.
   *
   * @param {String} An HTML string representing a github Url contribution.
   *
   */
const injectHTML = ghUrl => {
  const ghContrib = new GithubUrl(ghUrl)
  ghContrib.loadGhContrib(ghContrib.ghUrl, (html) => {
    document.querySelector('#contribution').innerHTML = html
  })
}
