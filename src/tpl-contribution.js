{
  const html = ({link, label, html}) => `
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
