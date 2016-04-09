/**
 * Template for Github repositories.
 *
 * @param {Object} Data to be injects in the template.
 * {owner {link, label}}
 * {repo {link, label}}
 * {folders [{link, label}, ...]}
 *
 * @result {String} A string representing an html list.
 */
const tplRepositories = (data) =>
  data.repositories.map(elt =>
    `<article class="gh-list-item gh-type-repo">
       <h2 class="gh-list-title"><a href="${elt.url}">${elt.name}</a></h2>
       <div class="gh-list-meta">
         <p>Mis à jour le : 02/02/16</p>
         <p>Créé par : <a href="">pntbr</a> / Contributeurs les plus actifs :
           <a href="">pntbr</a> / <a href="">wolffgang</a>
         </p>
         <p>
           <a href="${elt.git_url}">Voir sur Github</a>
         </p>
       </div>
       <!--si <image--></image-->
         <img src="http://placehold.it/350x150">
       <!--/si image-->
       <p class="gh-list-excerpt">Le début de la fiche qui parle de ...</p>
       <a class="gh-list-readmore"
          title="Lire la suite de la fiche Titre de la fiche"
          href="${elt.url}">Lire la fiche</a>
     </article>`).join('\n')
/**
 * Create data for Github repositories with a Github tree Url.
 *
 * @param {String} A string representing a github Url.
 * @result {String} A string representing an html list.
 */
const dataRepositories = ({owner}, callback) => {
  const apiUrl = new GithubUrl({owner: owner}).toGhRepoApiUrl()
  fetch(apiUrl, {headers: {Accept: 'application/vnd.github.v3.html'}})
    .then(response => response.json())
    .then(json => {
      const repositories = json.map(elt => ({
        name: elt.name,
        type: elt.type,
        git_url: elt.html_url,
        url: `/#${elt.html_url.match(/^https:\/\/github.com\/(.*)/)[1]}`
      }))
      callback(repositories)
    })
}
/**
 * Inject HTML code in #gh-list tag.
 *
 * @param {String} An HTML string representing a github Url contribution.
 *
 */
const injectRepositories = () =>
  dataRepositories(router.params, repositories =>
    document.querySelector('#gh-list').innerHTML =
      tplRepositories({repositories: repositories}))
