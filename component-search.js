/**
 * Template for search engine.
 *
 * @result {String} A string representing the search engine.
 */
const tplSearch = () =>
  `<h2>Recherche</h2>
     <div class="search-engine">
       <fieldset>
         <input id="gh-search" type="text">
         <input id="button-gh-search" value="Rechercher" type="submit">
       </fieldset>
     </div>`
/**
 * Attach an event click on search engine button.
 *
 * @param {String} An HTML string representing a github Url contribution.
 */
const eventsSearch = (ghUrl) =>
  document.querySelector('#button-gh-search').addEventListener('click',
    (evt) => {
      const userQuery = document.querySelector('#gh-search').value
      injectSearchRessources(ghUrl, userQuery)
    })
/**
 * Inject HTML code in #search-engine-wrapper tag.
 *
 * @param {String} An HTML string representing a github Url contribution.
 *
 */
const injectSearch = (ghUrl) => {
  document.querySelector('#search-engine-wrapper').innerHTML = tplSearch()
  eventsSearch(ghUrl)
}
