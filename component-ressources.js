/**
 * Template for Github ressources.
 *
 * @param {Object} Data to be injects in the template.
 * {owner {link, label}}
 * {repo {link, label}}
 * {folders [{link, label}, ...]}
 *
 * @result {String} A string representing an html list.
 */
const tplRessources = (data) =>
  data.ressources.map(({name, type, url, prose_url, git_url}) =>
    `<article class="gh-list-item gh-type-${type}">
       <h2 class="gh-list-title"><a href="${url}">${name}</a></h2>
       <div class="gh-list-meta">
         <p>Mis à jour le : 02/02/16</p>
         <p>Créé par : <a href="">pntbr</a> / Contributeurs les plus actifs :
           <a href="">pntbr</a> / <a href="">wolffgang</a>
         </p>
         <p>
           ${type === 'file' ? `<a href="${prose_url}">Editer la fiche</a> - ` : ''}
           <a href="${git_url}">Voir sur Github</a>
         </p>
       </div>
       <!--si <image--></image-->
         <img src="http://placehold.it/350x150">
       <!--/si image-->
       <p class="gh-list-excerpt">Le début de la fiche qui parle de ...</p>
       <a class="gh-list-readmore"
          title="Lire la suite de la fiche Titre de la fiche"
          href="${url}">Lire la fiche</a>
     </article>`).join('\n')
/**
 * Create data for Github ressources with a Github tree Url.
 *
 * @param {String} A string representing a github Url tree.
 * @result {String} A string representing an html list.
 */
const dataRessources = ({owner, repo, branch, path}, callback) => {
  const params = {owner: owner, repo: repo, branch: branch, path: path}
  const apiUrl = new GithubUrl(params).toGhApiUrl()
  fetch(apiUrl, {headers: {Accept: 'application/vnd.github.v3'}})
    .then(response => response.json())
    .then(json => {
      const ressources = json.map(({name, type, html_url}) => ({
        name: name,
        type: type,
        prose_url: `http://prose.io/#${html_url.match(/^https:\/\/github.com\/(.*)/)[1]}`.replace('blob', 'edit'),
        git_url: html_url,
        url: `/#${html_url.match(/^https:\/\/github.com\/(.*)/)[1]}`
      }))
      callback(ressources)
    })
}
/**
 * Create data for Github ressources by searching with a Github tree Url.
 *
 * @param {String} A string representing a github Url tree.
 * @result {String} A string representing an html list.
 */
const dataSearch = ({owner, repo, branch, path}, search, callback) => {
  const params = {owner: owner, repo: repo, branch: branch, path: path}
  const apiUrl = new GithubUrl(params).toGhApiSearch(search)
  fetch(apiUrl, {headers: {Accept: 'application/vnd.github.v3.html'}})
    .then(response => response.json())
    .then(json => {
      const ressources = json.items.map(
        ({name, type, path, html_url, repository}) => ({
          name: name,
          type: type,
          prose_url: `http://prose.io/#${html_url.match(/^https:\/\/github.com\/(.*)/)[1]}`.replace('blob', 'edit'),
          git_url: html_url,
          url: `/#${repository.full_name}/blob/master/${path}`
        }))
      callback(ressources)
    })
}
/**
 * Inject HTML code in #gh-list tag.
 *
 * @param {String} An HTML string representing a github Url contribution.
 *
 */
const injectRessources = () =>
  dataRessources(router.params, ressources =>
    document.querySelector('#gh-list').innerHTML =
      tplRessources({ressources: ressources}))
/**
 * Inject HTML code in #gh-list tag.
 *
 * @param {String} An HTML string representing a github Url contribution.
 *
 */
const injectSearchRessources = (userQuery)  =>
  dataSearch(router.params, userQuery, ressources =>
    document.querySelector('#gh-list').innerHTML =
      tplRessources({ressources: ressources}))
