  /**
   * Inject HTML code in #contribution tag.
   *
   * @param {String} An HTML string reprsenting a contribution.
   *
   */
const injectHTML = (content) => {
  document.querySelector('#contribution').innerHTML = content
}
