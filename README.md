# Security+ SY0-801 — Plateforme d'apprentissage Windows

Application de bureau **100 % hors ligne** couvrant l'intégralité des **27 objectifs officiels** de la certification CompTIA Security+ SY0-801 V8 (document v2.0, ©2025).

## Lancer l'application

- **Exécutable portable** : `release/SecurityPlus-SY0-801-Portable-0.1.0.exe` (~106 Mo, aucun installateur, droits utilisateur suffisants).
- Le premier lancement peut être retardé de quelques secondes par l'analyse antivirus de Windows.
- **Depuis les sources** : `npm install` → `npm run build` → `npm start`
- **Mode développement** : `npm run dev` puis `SP801_DEV=1 npm start`
- **Reconstruire l'exe** : `npm run dist`

## Contenu livré

| Élément | Quantité |
|---|---|
| Objectifs officiels couverts | **27 / 27** (5 domaines, 716 sous-thèmes) |
| Leçons structurées | **64** |
| Flashcards (répétition espacée Leitner, 5 boîtes) | **520** |
| Quiz corrigés avec explication et source | **27** (6 questions chacun) |
| Exercices pratiques (PBQ : classement, ordre, association, tableau, calcul) | **28** |
| Scénarios d'évaluation à 3 niveaux de décision | **27** |
| Schémas interactifs SVG (Explorer / Quiz / Ordre) | **92** — au moins un dans chacune des 64 leçons, deux dans 28 d'entre elles ; bouton **Agrandir** pour un affichage plein écran |
| Simulations animées (TLS, crypto, attaque réseau, OSI, Zero Trust, RTO/RPO, IR, IAM) | **8** |

Chaque notion est rattachée à une **référence réelle** (livre, chapitre, page) ou, lorsqu'aucun des quatre livres ne la contient, au **référentiel officiel** avec un badge explicite « Hors livres ». Aucune attribution mensongère.

## Expérience d'apprentissage interactive

- **Tableau de bord = centre de formation** : progression globale pondérée, cinq domaines cliquables, taux de maîtrise par domaine, objectifs maîtrisés, reprise de la dernière activité, recommandations calculées depuis la progression réelle, résultats récents, temps d'apprentissage, série de révision et activité des 7 derniers jours.
- **Lecteur de leçon par étapes** : chaque leçon est découpée en étapes avec navigation, explications progressives, et bascule vers une lecture continue. Les schémas, simulations et vérifications sont des étapes à part entière.
- **Simulations animées** : échange TLS, symétrique vs asymétrique, attaque réseau, couches OSI, composants Zero Trust, RTO/RPO, cycle de réponse à incident, cycle IAM. Chaque simulation se joue étape par étape et se termine par une question de compréhension avec explication immédiate.
- **Feedback pédagogique** : toute réponse incorrecte est expliquée ; les notions mal maîtrisées (quiz < 70 % ou cartes avec ≥ 3 échecs) remontent automatiquement dans « À faire ensuite ».
- **Déblocage progressif** : le premier objectif de chaque domaine est ouvert ; les suivants s'ouvrent à 35 % de progression sur l'objectif précédent, avec possibilité d'ouverture manuelle.
- **Évaluation de fin d'objectif** : quiz corrigé, exercice pratique et scénario, reliés depuis la fiche objectif.
- **Adaptatif et tactile** : mise en page responsive, cibles tactiles larges, navigation souris ou toucher. La couche d'interface React est séparée de la logique (`lib/`) et des données (`content/`) pour une réutilisation ultérieure sur Android via Capacitor/WebView — une seule base de code, pas deux applications.

## Interface et design

- Thème **sombre élégant** par défaut, accents cyan/bleu, couleurs par domaine, animations discrètes.
- **Bouton clair/sombre** dans la barre supérieure (préférence conservée localement).
- Icône Windows personnalisée (bouclier dégradé) intégrée à l'exécutable.
- Tableau de bord avec poids officiels des domaines (16 / 24 / 19 / 27 / 14 %) et progression pondérée.
- Navigation par domaine et objectif, recherche plein texte (`Ctrl+K`), glossaire bilingue, suivi de progression.
- Progression sauvegardée localement ; export/import JSON via le menu **Fichier**.

## Structure du code

```
src/content/objectives.json        # Les 27 objectifs officiels et leurs sous-thèmes
src/content/lessons/*.json         # 64 leçons (blocs typés)
src/content/flashcards/*.json      # 27 decks
src/content/quizzes/*.json         # 27 quiz
src/content/pbqs/*.json            # 28 exercices pratiques
src/content/scenarios/*.json       # 27 scénarios
src/content/diagrams.json          # Schémas du prototype initial
src/content/diagrams-extra/*.json  # Schémas des objectifs de production
src/content/diagrams-extra/        # Schémas interactifs par objectif et par lot
src/content/simulations.json       # 8 simulations animées
tools/insert_diagrams.py           # Insertion et validation des schémas dans les leçons
src/engines/                       # Moteurs de rendu leçons, schémas, simulations, lecteur par étapes
src/routes/                        # Écrans (dashboard, objectif, leçon, quiz, lab, scénario…)
src/lib/learning.ts                # Insights pédagogiques (recommandations, faiblesses, déblocage)
src/lib/                           # Chargement du contenu, progression, recherche, routeur
electron/                          # Processus principal Electron (fenêtre, menu, sauvegarde)
build/icon.ico                     # Icône Windows
tools/integrate.py                 # Validation et intégration des contenus
docs/CONTENT_SPEC.md               # Spécification de contenu
```

Ajouter ou corriger un objectif = modifier ses fichiers JSON puis lancer `python tools/integrate.py`. **Aucune modification du code n'est nécessaire.**

## Vérifications effectuées

- `python tools/integrate.py` : 27/27 objectifs complets, **0 problème** de référence.
- `npm run typecheck` : OK · `npm run build` : OK · `npm run dist` : OK.
- Version de production testée dans un navigateur : tableau de bord, leçons (domaines 1, 2, 4, 5), scénario 3.1, exercice 4.8, quiz 5.5, flashcards, progression — **aucune erreur console**.
- Exécutable lancé avec succès : fenêtre « Security+ SY0-801 — Plateforme d'apprentissage ».

## Pagination des sources

- *SOC Analyst Notes* : page PDF = page du livre.
- *11 Strategies of a World-Class SOC* (Knerler, Parker & Zimmerman, MITRE, 2ᵉ éd. 2022) : page imprimée = page PDF − 20.
- *Defensive Security Handbook* (Brotherston & Berlin, O'Reilly, 2017) : page imprimée = page PDF − 22.
- *Networking Fundamentals for SOC Analyst* (CyberSecXperts, OCR) : page PDF.
