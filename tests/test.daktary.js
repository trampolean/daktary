describe('#GhUrl', () => {
  it('should create a GitHubUrl object', () => {
    const noValidGhUrl = new GithubUrl('#NotAnUrl')
    expect(noValidGhUrl).to.be.an('object')
  })
  it('should check a GitHubUrl with a invalid url', () => {
    const noValidGhUrl = new GithubUrl('#NotAnUrl')
    expect(noValidGhUrl.isValid).to.be(false)
  })
  it('should check a GitHubUrl with a blob valid url', () => {
    const validGhUrl = new GithubUrl(
      'daktary-team/contributions/blob/master/créer_un_depôt_github.md')
    expect(validGhUrl.checkGhBlob()).to.be(true)
  })
  it('should check a GitHubUrl with a valid tree url', () => {
    const validGhUrl = new GithubUrl(
      'daktary-team/contributions/tree/master/toast/recipes')
    expect(validGhUrl.checkGhTree()).to.be(true)
  })
  it('should generate an API GitHub url', () => {
    const validGhUrl = new GithubUrl('owner/repo/blob/master/file.md')
    expect(validGhUrl.toGhApiUrl().startsWith(
      'https://api.github.com/repos/owner/repo/contents/' +
      'file.md?ref=master&client_id='
    )).to.be(true)
  })
})
