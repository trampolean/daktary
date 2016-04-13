describe('#Contribution', () => {
  it('should load the README of daktary-team repo.', (done) => {
    dataContribution({
      owner: 'daktary-team',
      repo: 'daktary',
      branch: 'master',
      path: 'README.md'
    }, html => {
      expect(html).to.contain('daktary')
      done()
    })
  })
})
