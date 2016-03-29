  /**
   * Inject HTML code in #contribution tag.
   *
   * @param {String} An HTML string representing a github Url contribution.
   *
   */
const injectHTML = ghUrl => {
  new GithubBlob(ghUrl,
    (html) => document.querySelector('#contribution').innerHTML = html)
}
