  /**
   * Inject HTML code in #contribution tag.
   *
   * @param {String} An HTML string representing a github Url contribution.
   *
   */
const injectHTML = ghUrl =>
  fetch(ghUrl)
    .then(response => response.text())
    .then(html => document.querySelector('#contribution').innerHTML = html)
