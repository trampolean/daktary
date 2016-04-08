# Retours sur dev.multibao.org

Tests semaine du 4 au 10 avril 2016

## Relatifs à l'utilsateur du routeur

En renseignant [...] dans la barre hypertexte      |   j'obtiens le résultat suivant
--------|------
http://multibao.org/#**orga/repo**/tree/master  |    Dysfonctionnel pour repos comme en démo: dev.multibao.org/#multibao/documentation/tree/master. Fonctionne pour les repos spécifiés par daktary. Je continue de chercher pourquoi.
http://multibao.org/#**user/repo**/tree/master  |    Dysfonctionnel comme en démo: dev.multibao.org/#alecoz/democracy-story/tree/master
http://multibao.org/#**org/repo**/tree/master/**dossier**  |    Dysfonctionnel, comme en démo: http://dev.multibao.org/#alecoz/democratie_ouverte/tree/master/contributions; la liste des fiches n'apparait pas
http://multibao.org/#**user/repo**/tree/master/**dossier**  |    Dysfonctionnel, la liste des fiches n'apparaît pas
http://multibao.org/#**orga/repo**/tree/master/**nomfiche.md**  |    Fonctionnel
http://multibao.org/#**user/repo**/tree/master/**nomfiche.md**  |    Fonctionnel
http://multibao.org/#**orga/repo**/tree/master/**dossier/nomfiche.md** |    Fonctionnel
http://multibao.org/#**user/repo**/tree/master/**dossier/nomfiche.md**  |    Fonctionnel
http://multibao.org/#**orga/repo**/tree/master/**dossier/dossier/nomfiche.md** |    Dysfonctionnel, comme en démo: dev.multibao.org/#multibao/contributions/blob/master/financements/subventions_2016/0-lisez-moi.md. Redirige vers une page 404.
http://multibao.org/#**user/repo**/tree/master/**dossier/dossier/nomfiche.md**  |    Dysfonctionnel, redirige vers une page 404.

### Relatif à la lecture des fiches 

Lire une fiche en markdown  |   Ok, sauf si nom fichier ne respectant pas la charte de nommage ou déposée dans un dossier de 2e niveau
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













