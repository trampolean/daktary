describe('#Breadcrumb', () => {
  it('should create an html list with data injection.', () => {
    const breadcrumb = tplBreadcrumb({
      owner: {label: 'Antonin Artaud', link: 'http://daktary.com'},
      repo: {label: 'Théatre', link: 'http://multibao.org'},
      folders: [{label: 'Arto le Momo', link: 'http://antonio'}]
    })
    expect(breadcrumb).to.contain('>Arto le Momo</a>')
  }),
  it('should compose an object data with a github Url.', () => {
    const breadcrumb = dataBreadcrumb('daktary/contribs/blob/master/ex/test.md')
    expect(breadcrumb.repo.label).to.be.equal('contribs')
  })
})
