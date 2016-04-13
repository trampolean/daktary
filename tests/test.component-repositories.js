describe('#Repositories', () => {
  it('should create an html list with data injection.', () => {
    const breadcrumb = tplBreadcrumb({
      owner: {label: 'Antonin Artaud', link: 'http://daktary.com'},
      repo: {label: 'Théatre', link: 'http://multibao.org'},
      folders: [{label: 'Arto le Momo', link: 'http://antonio'}]
    })
    expect(breadcrumb).to.contain('>Arto le Momo</a>')
  })
})
