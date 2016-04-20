 /**
 * Layout for manage and display Github contribution.
 *
 */
{
  layout.new('viewer')
  layout.viewer.html(`
  <main>
    <div id="parentRepo" class="breadcrumbs" data-template="parentRepo">
    </div>
    <article data-template="contribution" id="contribution">
    </article>
  </main>
  `)
}

