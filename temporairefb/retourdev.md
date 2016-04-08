# Retours sur dev.multibao.org

Tests semaine du 4 au 10 avril 2016

## Relatifs à l'utilsateur du routeur

### Dépôts liés à une organisation et/ou un utilisateur

Cas de figure     |   Retours
--------|------
Faire apparaître les contenus d'un repo spécifié dans barre recherche > http://multibao.org/#**orga/repo**/tree/master  |    Dysfonctionnel pour repos comme en démo: dev.multibao.org/#multibao/documentation/tree/master. Fonctionne pour les repos spécifiés par daktary. Je continue de chercher pourquoi.
Faire apparaître les contenus d'un repo spécifié dans barre de recherche > http://multibao.org/#**user/nomrepo**/tree/master  |    Dysfonctionnel comme en démo: dev.multibao.org/#alecoz/democracy-story/tree/master
Faire apparaître une fiche en spécifiant dans la barre de recherche > http://multibao.org/#nomorga/nomrepo/tree/master/nomfiche.md  |    Fonctionnel
Faire apparaître une fiche en spécifiant dans la barre de recherche > http://multibao.org/#**orga/repo**/tree/master/1er niveau dossier/nomfiche.md  |    Fonctionnel
Faire apparaître une fiche en spécifiant dans la barre de recherche > http://multibao.org/#**user/repo**/tree/master/nomfiche.md  |    Fonctionnel
Faire apparaître une fiche en spécifiant dans la barre de recherche > http://multibao.org/#**user/repo**/tree/master/1er niveau dossier/nomfiche.md  |    Fonctionnel

### Relatif à la lecture des fiches 

Lire une fiche en markdown  |   Ok, sauf si nom fichier ne respectant pas la charte de nommage
Lire une fiche en yml, css  |   Ok, sauf si nom fichier ne respectant pas la charte de nommage

## Relatifs à la navigation 

Fonctionnalité testée     |   Retours
--------|------
Naviguer dans la partie gauche: ouvrir organisations  |   Ok, sauf si nom de repo ne respectant pas la charte de nommage 
Naviguer dans le breadcrum  |   Top! Pour le niveau orga & user renvoie vers github.com. Je réfléchis à la valeur de le laisser ou non.

## Relatifs à la création et modifications de ressources

Fonctionnalité testée     |   Retours
--------|------
Editer une fiche   |   "Editer la fiche" uniquement visible depuis le dossier où sont présentés les articles > ok
Editer une fiche via prose.io  |   Ok
Editer une fiche: mettre en forme le texte  |   Ok
Editer une fiche: insérer une image en hypertexte  |   Ok
Editer une fiche: insérer une image via prose.io  |   Dysfonctionnement avec le {{site.baseurl}} qui n'est pas reconnu dans l'incorporation de la photo. 
Editer une fiche: renseigner les metadatas  |   Ok et top: n'apparaissent pas dans la lecture de la fiche sur multibao.org
Editer une fiche: renseigner des notes de bas de page  |   Non fonctionnel: les notes renvoient vers dev.multibao.org/#note qui renvoie vers une page d'erreur 404.
Editer une fiche: commiter  |   Ok

## Relatifs aux navigateurs faisant apparaitre http://dev.multibao.org

Navigateurs     |   Retours
--------|------
Firefox 45.0 (Ubuntu)  |   Fonctionnel
Firefox 45.0.1 (Ubuntu)  |   Fonctionnel
Internet Explorer v 11.162 (Windows)  |   Page blanche
Google Chome 49.0.2623.112 (Windows) | Fonctionnel













