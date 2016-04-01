/**
 * Layout for display a Github ressource.
 *
 */
const tplLayoutViewer = () => `
  <main>
    <div id="parentRepo" class="breadcrumbs">
      <!-- from component-breadcrumb.js -->
    </div>
    <article id="contribution">
      <!-- from component-contribution.js -->
    </article>
  </main>`

/**
 * Inject HTML code in #container tag.
 *
 */
const injectLayoutViewer = () =>
  document.querySelector('#container').innerHTML = tplLayoutViewer()
