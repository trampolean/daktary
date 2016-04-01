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
  data.ressources.map(elt =>
    `<article class="gh-list-item gh-type-${elt.type}">
       <h2 class="gh-list-title"><a href="${elt.url}">${elt.name}</a></h2>
       <div class="gh-list-meta">
         <p>Créé le : 02/02/12 / Mis à jour le : 02/02/16</p>
         <p>Créé par : <a href="">pntbr</a> / Contributeurs les plus actifs :
           <a href="">pntbr</a> / <a href="">wolffgang</a>
         </p>
         <p>
           ${elt.type === 'file' ? `<a href="${elt.prose_url}">Editer la fiche</a> - ` : ''}
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
 * Create data for Github ressources with a Github tree Url.
 *
 * @param {String} A string representing a github Url tree.
 * @result {String} A string representing an html list.
 */
const dataRessources = (ghUrl, callback) => {
  const apiUrl = new GithubUrl(ghUrl).toGhApiUrl()
  fetch(apiUrl)
    .then(response => response.json())
    .then(json => {
      const ressources = json.map(elt => ({
        name: elt.name,
        type: elt.type,
        prose_url: `http://prose.io/#${elt.html_url.match(/^https:\/\/github.com\/(.*)/)[1]}`.replace('blob', 'edit'),
        git_url: elt.html_url,
        url: `/#${elt.html_url.match(/^https:\/\/github.com\/(.*)/)[1]}`
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
const injectRessources = ghUrl =>
  dataRessources(ghUrl, ressources =>
    document.querySelector('#gh-list').innerHTML = tplRessources({ressources: ressources}))
