# Mini-Projet SUPINFO – Application Web Cinéma

Note obtenue : **81.60/100**

Projet réalisé dans le cadre de ma formation à SUPINFO pour appliquer des compétences front-end avec une API publique.

## Contexte

- Projet individuel ou binôme.
- Livraison du code source complet.
- Plagiat et usage d’IA interdits.
- Code structuré sans variables globales.
- Évaluation : fonctionnalités, qualité du code, Git, cahier des charges.

## Installation et lancement

Créer un fichier `.env` à la racine contenant :

```env
VITE_API_KEY=ta_clé_API_OMDb
```

Ensuite, lancer :

```bash
pnpm i
pnpm dev --open
```

(npm fonctionne aussi, pnpm recommandé)

## Objectif

Développer une application web permettant :

- Afficher les films tendances.
- Rechercher des films en temps réel.
- Voir les détails d’un film.

Les données proviennent de l’API OMDb.

## Fonctionnalités principales

### Page index

- Affiche au moins 3 films tendances avec poster, titre, lien fiche détaillée.
- Bouton pour charger plus de films de 2024.
- Bonus : résumé court.

### Page search

- Barre de recherche avec résultats en temps réel.
- Résultats affichent poster, titre, lien fiche film.
- Bouton pour charger plus.

### Page movie

- Affiche titre, poster, résumé complet, genre, acteurs.
- Bonus : notes et date DVD format français.

## Contraintes techniques

- Exécuter via serveur HTTP local (Live Server ou `serve`).
- Code réparti en plusieurs fichiers JS/TS, un par page.
- Logique partagée centralisée.

## Git

- Dépôt GitHub public avec lien dans README.
- Branches et commits clairs et explicites.

## Remarques

- Clé API OMDb obligatoire (https://www.omdbapi.com/apikey.aspx).
- Recherche en anglais recommandée.
- Priorité à l’UX, code modulaire, interactivité temps réel.
