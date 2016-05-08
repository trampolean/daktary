{
  const htmlRepos = ({url, title, folders, contributions, contributors, git_url, banner_url, description, readme_url}) =>
    `<article class="gh-list-item gh-type-repo">
      <h2 class="gh-list-title"><a href="#${url}">${title}</a></h2>
      <div class="gh-list-meta">
        <p>Dossiers : ${folders} - Fiches : ${contributions}</p>
        <p>Contributeurs : ${contributors}</p>
        </p>
        <p>
          <a href="${git_url}">Voir sur Github</a>
        </p>
      </div>
      <img src="${(banner_url) ? banner_url : 'http://lorempixel.com/g/350/150/'}">
      <p class="gh-list-excerpt">${description}</p>
      <a class="gh-list-readmore"
          title="Lire la suite de la fiche Titre de la fiche"
          href="#${readme_url}">Lire la présentation complète</a>
    </article>`

  const htmlReposSimple = ({url, title}) =>
    `<article class="gh-list-item gh-type-repo">
      <h2 class="gh-list-title"><a href="#${url}">${title}</a></h2>
    </article>`

  template.create('repos')

  template.repos.data = () => {
    const ghApi = new GithubUrl(router.params)
    const html = []
    ghApi.getJsonRepo().then(jsonResponse => {
      jsonResponse.map(({name, type, html_url, url}) => {
        const readmeUrl = {owner: router.params.owner, repo: name, branch: 'master', path: 'README.md'}
        const ghApiBlob = new GithubUrl(readmeUrl)
        ghApiBlob.getMdBlob()
          .then(mdResponse => {
            const contribution = new Markdown(mdResponse)
            if (contribution.isMetas()) {
              const data = {
                url: html_url.replace('https://github.com/', ''),
                git_url: html_url,
                readme_url: html_url.replace('https://github.com/', '') + '/blob/master/README.md',
                title: contribution.metas.titre,
                banner_url: contribution.metas.bandeau_url,
                description: contribution.metas.description,
                contributors: contribution.metas.contributeurs,
                folders: contribution.metas.dossiers,
                contributions: contribution.metas.fiches
              }
              html.push(htmlRepos(data))
            } else {
              const dataSimple = {
                url: html_url.replace('https://github.com/', ''),
                title: name
              }
              html.push(htmlReposSimple(dataSimple))
            }
            template.repos.html(html.join('\n'))
            template.repos.renderAsync(template.repos._htmlTpl)
          })
      })
    })
  }
}
