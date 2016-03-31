/**
 * Template for breadcrumb.
 *
 * @param {Object} Data to be injects in the template.
 * {owner {link, label}}
 * {repo {link, label}}
 * {folders [{link, label}, ...]}
 *
 * @result {String} A string representing an html list.
 */
const tplBreadcrumb = (data) =>
  `<ul>
     <li><a href="/repos.html">Accueil</a></li>
     <li><a href="${data.owner.link}">${data.owner.label}</a></li>
     <li><a href="${data.repo.link}">${data.repo.label}</a></li>` +
     data.folders.map(folder =>
      `<li><a href="${folder.link}">${folder.label}</a></li>`
     ).join('\n') +
   `</ul>`

/**
 * Create data for breadcrumb with a github tree Url.
 *
 * @param {String} A string representing a github Url tree.
 * @result {String} A string representing an html list.
 */
const dataBreadcrumb = ghUrl => {
  const {owner, repo, branch, filename} = new GithubUrl(ghUrl).ghData
  const folders = filename.split('/').map(elt => ({
    link: `/repos.html#${owner}/${repo}/tree/${branch}/${elt}`,
    label: elt
  }))
  return {
    owner: {
      label: owner,
      link: `//github.com/${owner}`
    },
    repo: {
      label: repo,
      link: `//github.com/${owner}/${repo}`
    },
    folders: folders
  }
}
/**
 * Inject HTML code in #breadcrumb tag.
 *
 * @param {String} An HTML string representing a github Url contribution.
 *
 */
const injectBreadcrumb = ghUrl =>
  document.querySelector('#breadcrumb').innerHTML =
    tplBreadcrumb(dataBreadcrumb(ghUrl))
