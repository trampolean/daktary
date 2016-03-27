// daktary-team/contributions/blob/master/créer_un_dépôt_github.md
class GithubUrl {
  constructor(ghUrl) {
    this.ghUrl = ghUrl
    this.isValid = this.isValid()
  }
  isValid() {
    const pathName = '[A-Za-z\u00C0-\u017F+\-\_]*'
    return !! this.ghUrl
      .match(`^${pathName}\/${pathName}\/blob\/master\/${pathName}[.]md$`)
  }
}
