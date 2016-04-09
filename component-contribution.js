/**
 * Load data from a Github contribution with a Github blob Url.
 *
 * @param {String} A string representing a github Url blob.
 * @param {Function} A callback function to treat data after is loading.
 * @result {String} A string representing an html list.
 */
const dataContribution = ({owner, repo, branch, path}, callback) => {
  const params = {owner: owner, repo: repo, branch: branch, path: path}
  const apiUrl = new GithubUrl(params).toGhApiUrl()
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
const injectContribution = () => {
  dataContribution(router.params,
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
const tplParentRepo = data =>
  `À retrouver dans le dépôt : <a href="${data.link}">${data.label}</a>`

/**
 * Create data for parent repository using a github blobs Url.
 *
 * @param {String} A string representing a github Url blobs.
 * @result {Object} A object with label and link to parent repository.
 */
const dataParentRepo = ({owner, repo, branch, path}) => {
  const urlParentRepo = `/#${owner}/${repo}/tree/${branch}/` +
    `${path.replace(/(\/|)[0-9A-Za-z\u00C0-\u017F\-\_\.]*$/, '')}`
  return {link: urlParentRepo, label: `${owner} - ${repo}`}
}
/**
 * Inject HTML code in #breadcrumb tag.
 *
 * @param {String} An HTML string representing a github Url contribution.
 *
 */
const injectParentRepo = () =>
  document.querySelector('#parentRepo').innerHTML =
    tplParentRepo(dataParentRepo(router.params))
