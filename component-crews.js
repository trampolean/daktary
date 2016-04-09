/**
 * Template for crews list.
 *
 * @param {Object} Data to be injects in the template.
 * {crews [{title, link, label, selected}, ...]}
 *
 * @result {String} A string representing an html list.
 */
const tplCrews = (crews) =>
  `<ul>` +
     crews.map(({title, repo, label, link, owner, classAttr}) =>
      `<li><a title="${title}" class="${classAttr}" href="/#${owner}"` +
      ` data-owner="${owner}">${label}</a></li>`
     ).join('\n') +
  `</ul>`
/**
 * Add selected in current crew and return the crews list.
 *
 * @param {String} An HTML string representing a github Url contribution.
 * @result {Array} A array with each crew Object.
 */
const crewsWithSelectedClass = (owner, crews) => {
  return crews.map(elt => {
    if (elt.owner === owner) {
      elt.classAttr = 'selected'
    }
    return elt
  })
}
/**
 * Create data for crews list with a github tree Url.
 *
 * @param {String} A string representing a github Owner.
 * @result {String} A string representing an html list.
 */
const dataCrews = ({owner}) =>
  crewsWithSelectedClass(owner, CREWS.crews)
/**
 * Inject HTML code in #breadcrumb tag.
 *
 * @param {String} An HTML string representing a github Url contribution.
 *
 */
const injectCrews = () => {
  // const
  document.querySelector('#gh-crew-list').innerHTML =
    tplCrews(dataCrews(router.params))
}
