{
  const htmlWithMetas = ({url, title, authors, prose_url, git_url, image_url, description}) =>
    `<article class="gh-list-item gh-type-file">
       <h2 class="gh-list-title"><a href="#${url}">${title}</a></h2>
       <div class="gh-list-meta">
         <p>Créé par : ${authors}</p>
         <p>
           <a href="${prose_url}">Editer la fiche</a>
           <a href="${git_url}">Voir sur Github</a>
         </p>
       </div>
       <img src="${image_url}">
       <p class="gh-list-excerpt">${description}</p>
       <a class="gh-list-readmore"
         title="Lire la suite de la fiche Titre de la fiche"
         href="#${url}">Lire la fiche</a>
     </article>`

  const htmlNoMetas = ({url, title}) =>
    `<article class="gh-list-item gh-type-file">
        <h2 class="gh-list-title"><a href="#${url}">${title}</a></h2>
     </article>`

  template.create('searchList')
  template.searchList.data = () => {
    const [req, query, user] = router.queries.q
      .match(/(.*)\+language:Markdown\+user:([0-9A-Za-z\u00C0-\u017F\-\_\.]*)/)
    router.params.owner = user
    const ghApi = new GithubUrl(router.params)
    const html = []
    ghApi.getJsonSearch(query).then(jsonResponse => {
      jsonResponse.items.map(({name, path, html_url, repository}) => {
        const readmeUrl = {owner: router.params.owner, repo: repository.name, branch: 'master', path: path}
        const ghApiBlob = new GithubUrl(readmeUrl)
        ghApiBlob.getMdBlob()
          .then(mdResponse => {
            const contribution = new Markdown(mdResponse)
            if (contribution.isMetas()) {
              const metas = {
                prose_url: `http://prose.io/#${html_url.match(/^https:\/\/github.com\/(.*)/)[1]}`.replace('blob', 'edit'),
                git_url: html_url,
                url: `${repository.full_name}/blob/master/${path}`,
                description: contribution.metas.description,
                title: contribution.metas.title,
                authors: contribution.metas.contributors,
                image_url: contribution.metas.image_url || 'http://lorempixel.com/g/350/150/'
              }
              html.push(htmlWithMetas(metas))
            } else {
              const noMetas = {
                title: name,
                url: `${repository.full_name}/blob/master/${path}`
              }
              html.push(htmlNoMetas(noMetas))
            }
            template.searchList.html(html.join('\n'))
            template.searchList.renderAsync(template.searchList._htmlTpl)
          })
      })
    })
  }
}
