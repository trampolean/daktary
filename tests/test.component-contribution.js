describe('#Contribution', () => {
  it('should load the README of daktary-team repo.', (done) => {
    dataContribution('daktary-team/daktary-team/blob/master/README.md',
      (html) => {
        expect(html).to.contain('daktary')
        done()
      })
  })
})
