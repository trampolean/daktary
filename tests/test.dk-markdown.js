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
  it('should retrieve a metadata from markdown with just many metadatas', () => {
    const mdContent = `
---
contributors: Pntbr
folders: 8
files: 120
title: Dépôt contributions
description: Dossier contenant une belle centaine de ressources non classées dans des domaines aussi variés que la Démocratie participative, la facilitation ou encore la gestion de produits innovants.
image_url: https://github.com/captain-berrotte/astuces_stages_creatifs/blob/master/media/daily%20reunions.jpg?raw=true
---
Comme je descendais des fleuves...`

    const md = new Markdown(mdContent)
    expect(md.metas.title).to.be('Dépôt contributions')
  })
  it('should accept markdown without metadata', () => {
    const mdContent = 'Comme je descendais des fleuves...'
    const md = new Markdown(mdContent)
    expect(md.metas.keys).to.be(undefined)
  })
  it('should retrieve a list metadata from markdown', () => {
    const mdContent = `
---
contributors: Pntbr
folders: 8
tags:
  - fuseki
  - ogeima
files: 120
title: Dépôt contributions
---
Comme je descendais des fleuves...`
    const md = new Markdown(mdContent)
    expect(md.metas.tags[0]).to.be('fuseki')
  })
})
