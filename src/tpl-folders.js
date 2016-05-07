{
  const htmlContrib = ({type, url, name, git_url, prose_url}) =>
    `<article class="gh-list-item gh-type-${type}">
        <h2 class="gh-list-title"><a href="#${url}">${name}</a></h2>
        <div class="gh-list-meta">
          <p>Mis à jour : 02/02/16</p>
          <p>Créé par : <a href="">pntbr</a> / Contributeurs les plus actifs :
            <a href="">pntbr</a> / <a href="">wolffgang</a>
          </p>
          <p>
           <a href="${prose_url}">Editer la fiche</a>
           <a href="${git_url}">Voir sur Github</a>
          </p>
        </div>
        <!--si <image--></image-->
        <img src="http://placehold.it/350x150">
        <!--/si image-->
        <p class="gh-list-excerpt">Le début de la fiche qui parle de ...</p>
        <a class="gh-list-readmore"
          title="Lire la suite de la fiche Titre de la fiche"
          href="${url}">Lire la fiche</a>
      </article>`

  const htmlFolder = ({url, name, folders, contributions, contributors, git_url, banner_url, description}) =>
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
              href="#${url}">Lire la présentation complète</a>
        </article>`

  template.create('folders')

  template.folders.data = () => {
    const ghApi = new GithubUrl(router.params)
    const html = []
    ghApi.getJsonFolders()
      .then(jsonResponse => {
        jsonResponse.map(({name, type, html_url}) => {
          const data = {
            type: type,
            url: `${html_url.match(/^https:\/\/github.com\/(.*)/)[1]}`,
            name: name,
            git_url: html_url,
            prose_url: `http://prose.io/#${html_url.match(/^https:\/\/github.com\/(.*)/)[1]}`.replace('blob', 'edit')
          }
          if (type === 'file') {
            html.push(htmlContrib(data))
          } else {
            data.folders = 12
            data.contributions = 5
            data.contributors = 'pntbr - newick - tom'
            html.push(htmlFolder(data))
          }
          template.folders.html(html.join('\n'))
        })
        template.folders.renderAsync(template.folders._htmlTpl)
      })
  }
}
