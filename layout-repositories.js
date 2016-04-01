/**
 * Layout for manage and display Github repositories.
 *
 */
const tplLayoutRepos = () => `
  <header>
    <h1>MultiBao</h1>
    <div class="search-engine-wrapper">
      <h2>Recherche</h2>
      <div class="search-engine">
        <fieldset>
          <input id="gh-search" type="text">
          <input value="Rechercher" type="submit">
        </fieldset>
      </div>
    </div>
  </header>
  <aside>
    <h3>Liste des repos</h3>
    <div id="gh-repo-list">
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
const injectLayoutRepos = () =>
  document.querySelector('#container').innerHTML = tplLayoutRepos()
