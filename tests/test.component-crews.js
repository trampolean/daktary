describe('#Repositories', () => {
  it('should add class selected to the current repo.', () => {
    const currentOwner = 'dktr'
    const repos = {repos: [
      { title: 'Panacee',
        link: '#dktr/badoom/tree/master/pages',
        label: 'Moustachu',
        owner: 'dktr',
        repo: 'badoom'
      }, {
        owner: 'transition'
      }
    ]}
    const currentRepoInList =
      reposWithSelectedClass(currentOwner, repos.repos)[0]
    expect(currentRepoInList.classAttr).to.contain('selected')
  })
  it('should create an html list with data injection.', () => {
    const repositories = tplRepositories([{
      class: 'selected',
      title: 'daktary : contribs > examples',
      link: '#daktary/contribs/tree/master/examples',
      label: 'daktary-contribs'
    }])
    expect(repositories).to.contain('>daktary-contribs</a>')
  })
})
