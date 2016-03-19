describe('Viewer', function() {
  describe('#injectHTML()', function() {
    it('should inject text: "A contribution" in mocha test page', function() {
      injectHTML('<p>A contribution</p>')
      expect(document.querySelector('#contribution').textContent)
        .to.eql('A contribution')
    })
  })
})
