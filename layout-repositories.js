/**
 * Layout for manage and display Github repositories.
 *
 */
const tplLayoutRepos = () => `
  <header>
    <h1>MultiBao</h1>
    <div id="search-engine-wrapper" class="search-engine-wrapper">
      <!-- from component-search.js -->
    </div>
  </header>
  <aside>
    <h3>Liste des collectifs</h3>
    <div id="gh-crew-list">
      <!-- from component-repositories.js -->
    </div>
  </aside>
  <main>
    <div id="breadcrumb" class="breadcrumbs">
      <!-- from component-breadcrumb.js -->
    </div>
    <section id="gh-list" class="gh-list">
      <!-- from component-ressources.js -->
    </section>
  </main>`

/**
 * Inject HTML code in #container tag.
 *
 */
const injectLayoutRepos = (ghUrl) => {
  document.querySelector('#container').innerHTML = tplLayoutRepos()
  injectSearch()
  injectCrews()
  injectBreadcrumb()
  if (router.currentRoute === 'repos') {
    injectRepositories()
  } else {
    injectRessources()
  }
}
