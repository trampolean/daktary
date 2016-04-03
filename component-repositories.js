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
      `<li><a title="${repo.title}" href="${repo.link}"` +
      ` data-owner="${repo.owner}" data-repo="${repo.repo}">${repo.label}</a></li>`
     ).join('\n') +
  `</ul>`
/**
 * Attach an event click on repositories list.
 *
 * @param {String} An HTML string representing a github Url contribution.
 */
const selectedRepositories = ({owner, repo, branch, path}) => {
  document.querySelector(`a[data-owner="${owner}"][data-repo="${repo}"]`)
    .classList.add('selected')
}
/**
 * Create data for breadcrumb with a github tree Url.
 *
 * @param {String} A string representing a github Url tree.
 * @result {String} A string representing an html list.
 */
const dataRepositories = () =>
  ({repos: [
    { title: 'Bienvenue sur multiBàO',
      link: '#multibao/contributions/tree/master/pages',
      label: 'Accueil Multibao',
      owner: 'multibao',
      repo: 'contributions'
    }, {
      title: 'Réseau Transition BE',
      link: '#reseautransitionwb/reseau_transition/tree/master/contributions',
      label: 'Réseau Transition BE',
      owner: 'reseautransitionwb',
      repo: 'reseau_transition'
    }, {
      title: 'Réseau Coop-tic',
      link: '#supagroflorac/cooptic/tree/master/contributions',
      label: 'Coop-TIC',
      owner: 'supagroflorac',
      repo: 'cooptic'
    }, {
      title: 'Réseau Transition BE',
      link: '#reseautransitionwb/reseau_transition/contributions/Ingrédients',
      label: 'The Transition Network',
      owner: 'reseautransitionwb',
      repo: 'contributions'
    }, {
      title: 'Centre pratiques coopération',
      link: '#multibao/contributions/tree/master/contributions/cpcoop',
      label: 'CPCOOP',
      owner: 'multibao',
      repo: 'contributions'
    }, {
      title: 'Traducteurs agiles',
      link: '#les-traducteurs-agiles/les-traducteurs-agiles.github.io/tree/master/_posts',
      label: 'Traducteurs agiles',
      owner: 'les-traducteurs-agiles',
      repo: 'les-traducteurs-agiles.github.io'
    }, {
      title: 'Chiendent',
      link: '#multibao/contributions/tree/master/contributions/chiendent',
      label: 'Collectif Chiendent',
      owner: 'multibao',
      repo: 'contributions'
    }, {
      title: 'Onpassealacte',
      link: '#onpassealacte/videos_initiatives/tree/master/',
      label: 'Onpassealacte',
      owner: 'onpassealacte',
      repo: 'videos_initiatives'
    }
  ]})
/**
 * Inject HTML code in #breadcrumb tag.
 *
 * @param {String} An HTML string representing a github Url contribution.
 *
 */
const injectRepositories = () => {
  // const
  document.querySelector('#gh-repo-list').innerHTML =
    tplRepositories(dataRepositories())
  selectedRepositories(router.params)
}

