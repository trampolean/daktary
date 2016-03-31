/**
 * Template for repositories list.
 *
 * @param {Object} Data to be injects in the template.
 * {repos [{title, link, label, selected}, ...]}
 *
 * @result {String} A string representing an html list.
 */
const tplRepositories = (data) =>
  `<ul>` +
     data.repos.map(repo =>
      `<li><a class="${repo.class}" title="${repo.title}" href="${repo.link}"` +
      ` title="${repo.title}">${repo.label}</a></li>`
     ).join('\n') +
  `</ul>`

/**
 * Create data for breadcrumb with a github tree Url.
 *
 * @param {String} A string representing a github Url tree.
 * @result {String} A string representing an html list.
 */
const dataRepositories = () =>
  ({repos: [
    {
      class: 'selected',
      title: 'daktary : contribs > examples',
      link: 'repos.html#daktary/contribs/tree/master/examples',
      label: 'daktary-contribs'
    }, {
      title: 'vferries : blog > _posts',
      link: 'repos.html#vferries/blog/tree/gh-pages/_posts',
      label: 'Vincent Ferries'
    }, {
      title: 'multibao : contributions > contributions',
      link: 'repos.html#multibao/contributions/tree/master/contributions',
      label: 'multibao'
    }, {
      title: 'traducteurs-agiles : traducteurs-agiles.github.io > _posts',
      link: 'repos.html#les-traducteurs-agiles/les-traducteurs-agiles.github.io/tree/gh-pages/_posts',
      label: 'Les traducteurs agiles'
    }
  ]})
/**
 * Inject HTML code in #breadcrumb tag.
 *
 * @param {String} An HTML string representing a github Url contribution.
 *
 */
const injectRepositories = () =>
  document.querySelector('#gh-repo-list').innerHTML =
    tplRepositories(dataRepositories())
