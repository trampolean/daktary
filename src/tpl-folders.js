{
  const htmlContribWithMetas = ({url, title, authors, git_url, prose_url, image_url, description}) =>
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

  const htmlContribNoMetas = ({url, title}) =>
    `<article class="gh-list-item gh-type-file">
        <h2 class="gh-list-title"><a href="#${url}">${title}</a></h2>
     </article>`

  const htmlFolderWithMetas = ({url, title, folders, files, contributors, git_url, image_url, description}) =>
    `<article class="gh-list-item gh-type-repo">
          <h2 class="gh-list-title"><a href="#${url}">${title}</a></h2>
          <div class="gh-list-meta">
            <p>Dossiers : ${folders} - Fiches : ${files}</p>
            <p>Contributeurs : ${contributors}</p>
            </p>
            <p>
              <a href="${git_url}">Voir sur Github</a>
            </p>
          </div>
          <img src="${image_url}">
          <p class="gh-list-excerpt">${description}</p>
          <a class="gh-list-readmore"
              title="Lire la suite de la fiche Titre de la fiche"
              href="#${url}">Lire la présentation complète</a>
        </article>`
  const htmlFolderNoMetas = ({url, title}) =>
    `<article class="gh-list-item gh-type-repo">
      <h2 class="gh-list-title"><a href="#${url}">${title}</a></h2>
    </article>`

  template.create('folders')

  template.folders.data = () => {
    const ghApi = new GithubUrl(router.params)
    const html = []
    ghApi.getJsonFolders()
      .then(jsonResponse => {
        jsonResponse.map(({name, type, html_url}) => {
          if (type === 'file') {
            const readmeUrl = {owner: router.params.owner, repo: router.params.repo, branch: 'master', path: `${(router.params.path) ? `${router.params.path}/${name}` : name}`}
            const ghApiBlob = new GithubUrl(readmeUrl)
            ghApiBlob.getMdBlob()
              .then(mdResponse => {
                const contribution = new Markdown(mdResponse)
                if (contribution.isMetas()) {
                  const metas = {
                    prose_url: `http://prose.io/#${html_url.match(/^https:\/\/github.com\/(.*)/)[1]}`.replace('blob', 'edit'),
                    git_url: html_url,
                    url: `${html_url.match(/^https:\/\/github.com\/(.*)/)[1]}`,
                    description: contribution.metas.description,
                    title: contribution.metas.title || name,
                    authors: contribution.metas.authors,
                    image_url: contribution.metas.image_url || 'http://lorempixel.com/g/350/150/'
                  }
                  html.push(htmlContribWithMetas(metas))
                } else {
                  const noMetas = {
                    title: name,
                    url: `${html_url.match(/^https:\/\/github.com\/(.*)/)[1]}`,
                  }
                  html.push(htmlContribNoMetas(noMetas))
                }
                template.folders.html(html.join('\n'))
                template.folders.renderAsync(template.folders._htmlTpl)
              })
          } else {
            const readmeUrl = {owner: router.params.owner, repo: name, branch: 'master', path: `${(router.params.path) ? `${router.params.path}/README.md` : 'README.md'}`}
            const ghApiBlob = new GithubUrl(readmeUrl)
            ghApiBlob.getMdBlob()
              .then(mdResponse => {
                const contribution = new Markdown(mdResponse)
                if (contribution.isMetas()) {
                  const metas = {
                    url: `${html_url.match(/^https:\/\/github.com\/(.*)/)[1]}`,
                    title: contribution.metas.title || name,
                    git_url: html_url,
                    folders: 12,
                    files: 5,
                    contributors: contribution.metas.contributors,
                    description: 'Lorem ipsum',
                    image_url: '' || 'http://lorempixel.com/g/350/150/'
                  }
                  html.push(htmlFolderWithMetas(metas))
                } else {
                  const noMetas = {
                    title: name,
                    url: `${html_url.match(/^https:\/\/github.com\/(.*)/)[1]}`
                  }
                  html.push(htmlFolderNoMetas(noMetas))
                }
                template.folders.html(html.join('\n'))
                template.folders.renderAsync(template.folders._htmlTpl)
              })
          }
        })
      })
  }
}
