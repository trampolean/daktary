describe('#Repositories', () => {
  it('should create an html list with data injection.', () => {
    const repositories = tplRepositories({repos: [{
      class: 'selected',
      title: 'daktary : contribs > examples',
      link: '#daktary/contribs/tree/master/examples',
      label: 'daktary-contribs'
    }]})
    expect(repositories).to.contain('>daktary-contribs</a>')
  })
})
