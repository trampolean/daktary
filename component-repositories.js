/**
 * Template for repositories list.
 *
 * @param {Object} Data to be injects in the template.
 * {repos [{title, link, label, selected}, ...]}
 *
 * @result {String} A string representing an html list.
 */
const tplRepositories = (repos) =>
  `<ul>` +
     repos.map(({title, repo, label, link, owner, classAttr}) =>
      `<li><a title="${title}" class="${classAttr}" href="${link}"` +
      ` data-owner="${owner}" data-repo="${repo}">${label}</a></li>`
     ).join('\n') +
  `</ul>`
/**
 * Add selected in current repo and return the repositories list.
 *
 * @param {String} An HTML string representing a github Url contribution.
 * @result {Array} A array with each repository Object.
 */
const reposWithSelectedClass = (owner, repos) => {
  return repos.map(elt => {
    if (elt.owner === owner) {
      elt.classAttr = 'selected'
    }
    return elt
  })
}
/**
 * Create data for repositories list with a github tree Url.
 *
 * @param {String} A string representing a github Owner.
 * @result {String} A string representing an html list.
 */
const dataRepositories = ({owner}) =>
  reposWithSelectedClass(owner, REPOS.repos)
/**
 * Inject HTML code in #breadcrumb tag.
 *
 * @param {String} An HTML string representing a github Url contribution.
 *
 */
const injectRepositories = () => {
  // const
  document.querySelector('#gh-repo-list').innerHTML =
    tplRepositories(dataRepositories(router.params))
}

