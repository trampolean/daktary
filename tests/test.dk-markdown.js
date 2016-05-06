describe('#Markdown', () => {
  it('should retrieve a metadata from markdown', () => {
    const mdContent =
      '---\n' +
      'type: astringent\n' +
      'mood: doom\n' +
      '---\n' +
      'Comme je descendais des fleuves...'
    const md = new Markdown(mdContent)
    expect(md.metas.mood).to.be('doom')
  })
  it('should retrieve a metadata from markdown with just one metadata', () => {
    const mdContent =
      '---\n' +
      'type: astringent\n' +
      '---\n' +
      'Comme je descendais des fleuves...'
    const md = new Markdown(mdContent)
    expect(md.metas.type).to.be('astringent')
  })
  it('should accept markdown without metadata', () => {
    const mdContent = 'Comme je descendais des fleuves...'
    const md = new Markdown(mdContent)
    expect(md.metas.keys).to.be(undefined)
  })
})
