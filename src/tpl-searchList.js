{
  template.create('searchList')

  template.searchList.data = () => {
    const [req, query, user] = router.queries.q
      .match(/(.*)\+language:Markdown\+user:([0-9A-Za-z\u00C0-\u017F\-\_\.]*)/)
    router.params.owner = user
    const apiUrl = new GithubUrl(router.params).toGhApiSearch(query)
    const html = []
    fetch(apiUrl, {headers: {Accept: 'application/vnd.github.v3.html'}})
      .then(response => response.json())
      .then(json => {
        json.items.map(({name, type, path, html_url, repository}) => {
          const readmeUrl = { owner: router.params.owner, repo: repository.name, branch: 'master', path: path }
          const apiUrl = new GithubUrl(readmeUrl).toGhApiUrl()
          fetch(apiUrl, {headers: {Accept: 'application/vnd.github.v3.raw'}})
            .then(response => response.text())
            .then(md => {
              let contribution = new Markdown(md)
              let prose_url = `http://prose.io/#${html_url.match(/^https:\/\/github.com\/(.*)/)[1]}`.replace('blob', 'edit')
              let git_url = html_url
              let url = `${repository.full_name}/blob/master/${path}`
              let description = contribution.metas.description
              let title = contribution.metas.titre
              let authors = contribution.metas.auteurs
              let banner_url = contribution.metas.bandeau_url
              html.push(
                `<article class="gh-list-item gh-type-${type}">
                   <h2 class="gh-list-title"><a href="#${url}">${title}</a></h2>
                   <div class="gh-list-meta">
                     <p>Créé par : ${authors}</p>
                     <p>
                       ${type === 'file' ? `<a href="${prose_url}">Editer la fiche</a> - ` : ''}
                       <a href="${git_url}">Voir sur Github</a>
                     </p>
                   </div>
                   <img src="${(banner_url) ? banner_url : 'http://lorempixel.com/g/350/150/'}">
                   <p class="gh-list-excerpt">${description}</p>
                   <a class="gh-list-readmore"
                     title="Lire la suite de la fiche Titre de la fiche"
                     href="#${url}">Lire la fiche</a>
                  </article>`)
                template.searchList.html(html.join('\n'))
                template.searchList.renderAsync(template.searchList._htmlTpl)
              })
          })
        })
  }
}
