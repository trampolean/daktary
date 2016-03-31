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
  data.ressources.map(ressource =>
    `<article class="gh-list-item">
       <h2 class="gh-list-title"><a href="./viewer.html">Plato</a></h2>
       <div class="gh-list-meta">
         <p>Créé le : 02/02/12 / Mis à jour le : 02/02/16</p>
         <p>Créé par : <a href="">pntbr</a> / Contributeurs les plus actifs :
           <a href="">pntbr</a> / <a href="">wolffgang</a>
         </p>
         <p><a href="">Editer la ficher</a> - <a href="">Voir sur Github</a></p>
       </div>
       <!--si image-->
         <img src="http://placehold.it/350x150">
       <!--/si image-->
       <p class="gh-list-excerpt">Le début de la fiche qui parle de ...</p>
       <a class="gh-list-readmore" title="Lire la suite de la fiche Titre de la fiche" href="/daktary/contribs/examples/plato.md">Lire la fiche</a>
     </article>`).join('\n')
/**
 * Create data for Github ressources with a Github tree Url.
 *
 * @param {String} A string representing a github Url tree.
 * @result {String} A string representing an html list.
 */
const dataRessources = ghUrl => {
  return {ressources: [1, 2, 3]}
}
/**
 * Inject HTML code in #breadcrumb tag.
 *
 * @param {String} An HTML string representing a github Url contribution.
 *
 */
const injectRessources = ghUrl =>
  document.querySelector('#gh-list').innerHTML =
    tplRessources(dataRessources(ghUrl))
