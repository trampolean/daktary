describe('Daktary', function() {
  describe('#GhUrl', function() {
    it('should create a GitHubUrl object', function() {
      const noValidGhUrl = new GithubUrl('#NotAnUrl')
      expect(noValidGhUrl).to.be.an('object')
    })
    it('should check a GitHubUrl with a invalid url', function() {
      const noValidGhUrl = new GithubUrl('#NotAnUrl')
      expect(noValidGhUrl.isValid).to.be(false)
    })
    it('should check a GitHubUrl with a valid url', function() {
      const validGhUrl = new GithubUrl(
        'daktary-team/contributions/blob/master/créer_un_depôt_github.md')
      expect(validGhUrl.isValid).to.be(true)
    })
  })
})
