{
  layout.create('home')
  layout.home.html(`
  <header class="clearfix">
    <h1>multi<span>BàO</span></h1>
    <div id="search-engine-wrapper" class="search-engine-wrapper" data-template="search">
    </div>
  </header>
  <main>
    <section class="home-intro">
        <h2>Partager en équipe et au monde ses apprentissages sur le faire ensemble</h2>
        <a href="">Commencer ici</a>
        <a href="">Guide d'utilisation</a>
    </section>
    <section id="gh-crew-list" data-template="crews">
    </section>
  </main>`)
}