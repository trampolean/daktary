
  describe('#GhUrl', () => {
    it('should create a GitHubUrl object', () => {
      const noValidGhUrl = new GithubUrl('#NotAnUrl')
      expect(noValidGhUrl).to.be.an('object')
    })
    it('should check a GitHubUrl with a invalid url', () => {
      const noValidGhUrl = new GithubUrl('#NotAnUrl')
      expect(noValidGhUrl.isValid).to.be(false)
    })
    it('should check a GitHubUrl with a valid url', () => {
      const validGhUrl = new GithubUrl(
        'daktary-team/contributions/blob/master/créer_un_depôt_github.md')
      expect(validGhUrl.isValid).to.be(true)
    })
    it('should generate an API GitHub url', () => {
      const validGhUrl = new GithubUrl('owner/repo/blob/master/file.md')
      expect(validGhUrl.toGhApiUrl().startsWith(
        'https://api.github.com/repos/owner/repo/contents/' +
        'file.md?ref=master&client_id='
      )).to.be(true)
    })
  })
  describe('#GithubBlob', () => {
    it('should load a ressource with a local url', (done) => {
      const keys = {id: atob(GH_ID), secret: atob(GH_SECRET)}
      const localUrl =
        new GithubBlob('daktary-team/daktary-team/blob/master/README.md')
      const ghApiUrl =
        `https://api.github.com/repos/daktary-team/daktary-team/` +
        `contents/README.md?ref=master&client_id=${keys.id}` +
        `&client_secret=${keys.secret}`
      localUrl.loadGhContrib(ghApiUrl, (html) => {
        expect(html).to.contain('daktary')
        done()
      })
    })
  })
