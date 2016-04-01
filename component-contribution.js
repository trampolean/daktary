/**
 * Load data from a Github contribution with a Github blob Url.
 *
 * @param {String} A string representing a github Url blob.
 * @param {Function} A callback function to treat data after is loading.
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
/**
 * Template for parent repository.
 *
 * @param {Object} Data to be injects in the template.
 * {repo {link, label}}
 *
 * @result {String} A string representing an html link.
 */
const tplParentRepo = (data) =>
  `À retrouver dans le dépôt : <a href="${data.link}">${data.label}</a>`

/**
 * Create data for parent repository using a github blobs Url.
 *
 * @param {String} A string representing a github Url blobs.
 * @result {Object} A object with label and link to parent repository.
 */
const dataParentRepo = ghUrl => {
  const {owner, repo, branch, filename} = new GithubUrl(ghUrl).ghData
  const urlParentRepo = `/repos.html#${owner}/${repo}/tree/${branch}/` +
    `${filename.replace(/(\/|)[A-Za-z\u00C0-\u017F+\-\_]*[.]md$/, '')}`
  return {link: urlParentRepo, label: `${owner} - ${repo}`}
}
/**
 * Inject HTML code in #breadcrumb tag.
 *
 * @param {String} An HTML string representing a github Url contribution.
 *
 */
const injectParentRepo = ghUrl =>
  document.querySelector('#parentRepo').innerHTML =
    tplParentRepo(dataParentRepo(ghUrl))
