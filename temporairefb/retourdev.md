# Retours sur dev.multibao.org

Tests semaine du 4 au 10 avril 2016

## Relatifs à lecture

Fonctionnalité testée     |   Retours
--------|------
Lire une fiche à partir du 2eme niveau de dossier  |    Dysfonctionnel, voir [cette fiche](https://github.com/multibao/contributions/blob/master/financements/subventions_2016/0-lisez-moi.md) qui n'apparait pas sur [dev.multibao.org](dev.multibao.org/#multibao/contributions/blob/master/financements/subventions_2016/0-lisez-moi.md)
Lire une fiche en markdown  |   Ok, sauf si nom fichier ne respectant pas la charte de nommage
Lire une fiche en yml, css  |   Ok, sauf si nom fichier ne respectant pas la charte de nommage
Reconnaître une fiche d'un dossier   |   Incapacité à reconnaître une fiche d'un dossier

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













