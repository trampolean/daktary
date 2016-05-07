{
  template.create('repos')

  template.repos.data = () => {
    const reposUrl = new GithubUrl(router.params).toGhRepoApiUrl()
    const html = []
    fetch(reposUrl, {headers: {Accept: 'application/vnd.github.v3'}})
      .then(response => response.json())
      .then(json => {
        json.map(({name, type, html_url, url}) => {
          const readmeUrl = { owner: router.params.owner, repo: name, branch: 'master', path: 'README.md' }
          const apiUrl = new GithubUrl(readmeUrl).toGhApiUrl()
          fetch(apiUrl, {headers: {Accept: 'application/vnd.github.v3.raw'}})
            .then(response => response.text())
            .then(md => {
              let contribution = new Markdown(md)
              let url = html_url.replace('https://github.com/', '')
              let git_url = html_url
              let readme_url = html_url.replace('https://github.com/', '') + '/blob/master/README.md'
              let banner_url = contribution.metas.bandeau_url
              let description = contribution.metas.description
              let contributors = contribution.metas.contributeurs
              let folders = contribution.metas.dossiers
              let contributions = contribution.metas.fiches
              html.push(
                `<article class="gh-list-item gh-type-repo">
                  <h2 class="gh-list-title"><a href="#${url}">${name}</a></h2>
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
                </article>`)
              template.repos.html(html.join('\n'))
              template.repos.renderAsync(template.repos._htmlTpl)
            })
        })
      })
  }
}
