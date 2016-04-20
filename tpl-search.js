{
  template.new('search')

  template.search.data = () => {
    template.search.html(`
      <h2>Recherche</h2>
       <div class="search-engine">
         <fieldset>
           <input id="gh-search" type="text">
           <input id="button-gh-search" value="Rechercher" type="submit">
         </fieldset>
       </div>
    `)
    template.search.events({
      'click #button-gh-search': () => {
        const userQuery = document.querySelector('#gh-search').value
        const apiUrl = new GithubUrl(router.params).toGhApiSearch(userQuery)
        router.go(apiUrl.replace('https://api.github.com/', ''))
      },
      'keypress #gh-search': evt => {
        if (evt.key === 'Enter' && document.querySelector('#gh-search').value) {
          const userQuery = document.querySelector('#gh-search').value
          const apiUrl = new GithubUrl(router.params).toGhApiSearch(userQuery)
          router.go(apiUrl.replace('https://api.github.com/', ''))
        }
      }
    })
  }
}
