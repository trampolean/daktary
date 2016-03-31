/**
 * Create data for Github ressources with a Github tree Url.
 *
 * @param {String} A string representing a github Url tree.
 * @result {String} A string representing an html list.
 */
const dataContribution = (ghUrl, callback) => {
  const apiUrl = new GithubUrl(ghUrl).toGhApiUrl()
  fetch(apiUrl, {headers: {Accept: 'application/vnd.github.v3.html'}})
    .then(response => response.text())
    .then(html => callback(html))
}
/**
   * Inject HTML code in #contribution tag.
   *
   * @param {String} An HTML string representing a github Url contribution.
   *
   */
const injectContribution = ghUrl => {
  dataContribution(ghUrl,
    (html) => document.querySelector('#contribution').innerHTML = html)
}
