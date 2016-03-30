/**
 * Create a breadcrumb with a github tree Url.
 *
 * @param {String} A string representing a github Url tree.
 * @result {String} A string representing an html list.
 */
const createBreadcrumb = ghUrl => {
  const {owner, repo, branch, filename} = new GithubUrl(ghUrl).ghData
  const foldersWithLiTags = filename.split('/')
    .map(elt => `<li><a href="/repos.html#${owner}/${repo}/tree/` +
                `${branch}/${elt}">${elt}</a></li>`).join('\n')
  return `
    <ul>
      <li><a href="/repos.html">Accueil</a></li>
      <li><a href="//github.com/${owner}">${owner}</a></li>
      <li><a href="//github.com/${owner}/${repo}">${repo}</a></li>
      ${foldersWithLiTags}
    </ul>
  `
}
/**
 * Inject HTML code in #breadcrumb tag.
 *
 * @param {String} An HTML string representing a github Url contribution.
 *
 */
const injectBreadcrumb = ghUrl =>
  document.querySelector('#breadcrumb').innerHTML = createBreadcrumb(ghUrl)
