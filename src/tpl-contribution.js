{
  const html = ({link, label, html}) => `
    <aside class="contribution-tools">
      <a href="" class="github-link">Voir sur Github</a>
      <a href="" class="proseio-link">Editer sur prose.io</a>
      <a href="" class="help-link">Aide</a>
      <a href="" class="page-top">Haut de page</a>
    </aside>
    <div id="parentRepo" class="breadcrumbs">
      À retrouver dans le dépôt : <a href="${link}">${label}</a>
    </div>
    <article id="contribution">
      ${html}
    </article>
  `

  template.create('contribution')
  template.contribution.data = () => {
    const ghApi = new GithubUrl(router.params)
    ghApi.getHtmlBlob().then(htmlResponse => {
      const {owner, repo, branch, path} = router.params
      const data = {
        html: htmlResponse,
        link: `#${owner}/${repo}/tree/${branch}/` +
          `${path.replace(/(\/|)[0-9A-Za-z\u00C0-\u017F\-\_\.]*$/, '')}`,
        label: `${owner} - ${repo}`
      }
      template.contribution.html(html(data))
      template.contribution.renderAsync()
    })
  }
}
