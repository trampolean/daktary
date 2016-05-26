# Daktary

Pré-prod : http://dev.multibao.org

## Technologies

Langages :
* [ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla)

Tests unitaires :
* [Mocha](https://mochajs.org/)
* [Expect](https://github.com/Automattic/expect.js)

## À prévoir
* Classement par le titre
* Merge contribution et breadcrumb parent repo
* Version simplifiée pour les non métas
* Garder la recherche - searchList
* link # et /#
* Link absolute/relatif
* Cacher autres que .md
* Faire remonter les dossiers en premier
* Ressources : réponses not found => 404
* virer le lien sur le breadcrumb
* recherche en home
* Récupérer le nombre de dossiers et nombres de contributeurs
* vrai SLA
* Travis
* Classement des dossiers
* Notifications
* Meta-Data : Contribs - Repos - Folders
* Loading
* Infinite scroll
* Simplify tests writes merge on async

* Cacher les ressources
* Doc de développement
* Se passer de Prose.io

## Pour tester le site en local
```bash
$ git clone git@github.com:daktary-team/daktary.git .
$ cd daktary
```

## Serveur local
C'est optionnel, mais les exemples qui suivent sont testés sur un serveur local.

Par exemple :
https://github.com/indexzero/http-server

```bash
$ http-server -p 8000
```

## Pour lancer les tests
Dans un [Firefox](https://www.mozilla.org/fr/firefox/developer/) **récent** lancer :
http://127.0.0.1:8000/tests

## Intégration
* Affichage fiches : typo, justified text

* Responsive : mobile first ?

## Discussion intégration
* Regarder GitBook
* 
* Affichage fiches : tooltip sur les outils ?
* Affichage fiches : lien pied de page en gras, pourquoi ?
* Affichage fiches : embed, abbr, cite, acronym impossible en markdown ?
* Affichage fiches : affichage des metas inutile, déjà utilisées autrement
* Affichage fiches : affichage des notes et utilisation de #user-content-note
* Affichage fiches : [exemple des balises HTML](http://dev.multibao.org/#newick/grill/blob/master/styleguide.md)
* Affichage recherche : boucle if pour afficher le bon message
* Affichage recherche : dynamiser nombre de résultat, recherche, repo
* Affichage recherche : afficher ou non moteur de recherche

## Discussion PO
* Seul les dépôts avec README sont visibles
