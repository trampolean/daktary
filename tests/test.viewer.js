describe('Viewer', () => {
  describe('#injectHTML()', () => {
    it('should inject text: "A contribution" in mocha test page', done => {
      injectHTML('/tests/assets/contrib.html')
      setTimeout(() => {
        expect(document.querySelector('#contribution')
          .textContent).to.eql('A contribution\n')
        done()
      }, 100)
    })
  })
})
