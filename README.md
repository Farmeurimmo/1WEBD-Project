# Mini-Projet SUPINFO – Application Web de Cinéma

Note obtenue : **81.60/100**

Ce projet a été réalisé dans le cadre de la formation SUPINFO, dans le but de mettre en pratique les compétences en
développement front-end à travers un cas concret intégrant l’utilisation d’une API publique et le rendu dynamique de
contenu.

## Contexte

- Projet individuel ou en binôme.
- Livraison au format `.zip` contenant l'intégralité du code source.
- Plagiat et recours à une IA interdits (note éliminatoire : 0/100).
- Qualité du code exigée : pas de variables globales, structure claire.
- Évaluation basée sur la fonctionnalité, la qualité du code, l'utilisation de Git, et le respect du cahier des charges.

## Running the project

Vous devez créer un fichier `.env` à la racine du projet.

```env
VITE_API_KEY=your_api_key
```

(remplacez `your_api_key` par votre clé API OMDb).

Ensuite lancer ces commandes: (npm fonctionne aussi mais pnpm est recommandé)

```bash
pnpm i
pnpm dev --open
```

---

## Objectif

Développer une application web interactive permettant :

1. D’afficher les films en tendance.
2. De rechercher des films via une barre de recherche en direct.
3. De consulter les détails d’un film sélectionné.

Les données sont issues de l’API **OMDb (The Open Movie Database)**.

---

## Cahier des charges

### `index.html`

- Afficher **au moins 3 films tendances**.
- Pour chaque film :
  - Son poster
  - Son titre
  - Un lien vers une fiche détaillée (`movie.html`)
  - *(Bonus)* Un court résumé
- Bouton pour charger plus de films de 2024

### `search.html`

- Contenu requis :
  - Une barre de recherche
  - Résultats affichés **en temps réel** (sans rechargement de page)
  - Bouton pour afficher plus de résultats
- Chaque résultat doit inclure :
  - Le poster
  - Le titre
  - Un lien vers la fiche film

### `movie.html`

- Doit afficher :
  - Le titre du film
  - Le poster
  - Le résumé complet
  - Le genre
  - Les acteurs
  - *(Bonus)* Notes obtenues
  - *(Bonus)* Date de sortie DVD (format français : `jj/mm/aaaa`)

---

## Contraintes techniques

- Le projet doit être exécuté depuis un serveur HTTP local :
  - Options possibles :
    - Live Server (extension VS Code)
    - `serve` via npm (script réutilisable des TP précédents)
- Utilisation de plusieurs fichiers JS (ou TypeScript)
  - Un fichier par page conseillé
  - La logique partagée (ex. : authentification) doit être centralisée

---

## Critères Git

- **25 points** attribués pour l’utilisation correcte de Git :
  - Dépôt GitHub distant avec lien dans `README.md`
  - Organisation claire des branches
  - Nommage explicite des commits (`feat:`, `fix:`, `refactor:`, etc.)

---

## Remarques

- Une clé API OMDb est requise (obtenue sur [omdbapi.com](https://www.omdbapi.com/apikey.aspx)).
- Les titres doivent être saisis en anglais pour de meilleurs résultats (ex. : “Guardians of the Galaxy”).
- Le projet met l’accent sur l’UX, l’interaction en temps réel et un code modulaire.

---

## Livraison

Le rendu final a été déposé sur Moodle au format archive `.zip`, contenant :

- Le code source complet (HTML, CSS, JS/TS)
- Un `README.md` décrivant le projet et le lien GitHub
- Éléments annexes éventuels (icônes, images, etc.)

Ce projet a été noté dans le cadre du module de développement web front-end de **SUPINFO**.
