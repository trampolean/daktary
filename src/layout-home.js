{
  layout.create('home')
  layout.home.html(`
  <header class="clearfix">
    <h1>multi<span>BàO</span></h1>
  </header>
  <main>
    <section class="home-intro">
        <h2>Partager en équipe et au monde <span>ses apprentissages sur le faire ensemble</span></h2>
        <a href="#multibao/contributions/blob/master/pages/commencer_ici.md">Commencer ici</a>
        <a href="#multibao/documentation/blob/master/README.md">Guide d'utilisation</a>
    </section>
    <section id="gh-crew-list" data-template="crews">
    </section>
  </main>`)
}
