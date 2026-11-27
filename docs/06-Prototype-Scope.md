# 06 — Périmètre du prototype

**Objectif :** démontrer l'architecture, l'expérience d'apprentissage et le modèle de contenu
sur une **tranche verticale complète**, sans construire les 86 leçons.

---

## 1. Principe

Le prototype n'est pas une maquette. C'est une application qui **fonctionne réellement** sur
6 objectifs, et qui **affiche les 27** avec leurs sous-thèmes officiels. Il prouve trois choses :

1. **La navigation complète** : les 5 domaines et les 27 objectifs sont présents et explorables.
2. **La profondeur pédagogique** : 6 objectifs sont traités de bout en bout (leçon → schéma →
   flashcards → quiz → exercice → scénario).
3. **La scalabilité** : ajouter un objectif = ajouter des fichiers JSON, sans modifier le code.

---

## 2. Les 6 objectifs retenus

Sélection couvrant **les 5 domaines** et les **méthodes pédagogiques les plus différentes**.

| # | Objectif | Dom. | Pourquoi cet objectif | Ce qu'il démontre |
|---|---|---|---|---|
| 1 | **1.1** Concepts et contrôles de sécurité | D1 | Fondation de tout le programme, très visuel | Matrice de contrôles interactive (4×6), exercice de classement |
| 2 | **1.3** Solutions cryptographiques | D1 | Objectif le plus lacunaire du corpus → prouve la valeur ajoutée | Chaîne PKI interactive, comparateur symétrique/asymétrique, laboratoire de hachage |
| 3 | **2.5** Indicateurs d'activité malveillante | D2 | Objectif « donné un scénario » → prouve l'application pratique | Triage d'alertes sur journaux fictifs, scénario d'investigation |
| 4 | **3.3** Protection des données | D3 | Objectif de classification, très « diagrammable » | Diagramme états × méthodes, exercice de conception DLP |
| 5 | **4.7** Réponse aux incidents | D4 | Cœur du domaine le plus lourd (27 %) | Cycle IR interactif, exercice d'ordonnancement, tabletop |
| 6 | **5.2** Gestion des risques | D5 | Objectif quantitatif → prouve les exercices calculés | Calculateur SLE/ALE/ARO, registre des risques noté |

**Couverture des domaines :** D1 (×2), D2, D3, D4, D5 → **les 5 domaines sont représentés**.

---

## 3. Contenu à produire pour le prototype

### 3.1 Leçons

| Objectif | Leçons | Titres |
|---|---|---|
| 1.1 | 3 | ① CIA, AAA et non-répudiation ② Défense en profondeur et Zero Trust ③ Catégories et types de contrôles |
| 1.3 | 3 | ① Symétrique vs asymétrique ② La chaîne de confiance PKI ③ Hachage, salage et signatures |
| 2.5 | 3 | ① Les 12 indicateurs de compromission ② Malwares et attaques réseau ③ Attaques applicatives et d'identifiants |
| 3.3 | 2 | ① États, types et classifications ② Méthodes de protection et rôles |
| 4.7 | 3 | ① Le cycle en 7 phases ② Confinement, éradication, notification ③ Post-incident et PIR |
| 5.2 | 2 | ① Le processus de gestion des risques ② Quantitatif : SLE, ALE, ARO |
| **Total** | **16** | |

Chaque leçon : 12-20 min de lecture, 1 schéma ou 1 comparateur, 1 encadré « terminologie d'examen »,
1-3 références sourcées (livre + page), 1 question de vérification intégrée.

### 3.2 Schémas interactifs (5)

| ID | Objectif | Mode | Description |
|---|---|---|---|
| `d-controls-matrix` | 1.1 | explore + quiz | Matrice 4 catégories × 6 types, 24 cases cliquables |
| `d-pki-chain` | 1.3 | explore + build | CSR → CA → certificat → validation → révocation |
| `d-crypto-compare` | 1.3 | explore | Symétrique vs asymétrique vs hachage, flux animés |
| `d-data-lifecycle` | 3.3 | explore + quiz | 5 étapes × contrôles associés |
| `d-ir-cycle` | 4.7 | explore + order | Cycle IR en 7 phases, avec livrables par phase |

### 3.3 Flashcards (6 decks, ~130 cartes)

| Deck | Cartes |
|---|---|
| `fc-1.1` | 24 |
| `fc-1.3` | 26 |
| `fc-2.5` | 26 |
| `fc-3.3` | 20 |
| `fc-4.7` | 18 |
| `fc-5.2` | 18 |

Répétition espacée de type Leitner (5 boîtes), avec révision « dues aujourd'hui ».

### 3.4 Quiz (6 quiz, ~90 questions)

| Quiz | Questions | Types |
|---|---|---|
| `qz-1.1` | 16 | QCM, multi-réponses |
| `qz-1.3` | 18 | QCM, multi-réponses, appariement |
| `qz-2.5` | 18 | QCM, scénario court |
| `qz-3.3` | 14 | QCM, multi-réponses |
| `qz-4.7` | 14 | QCM, ordonnancement |
| `qz-5.2` | 12 | QCM, calcul |

Chaque question : explication obligatoire, référence à la leçon, marquage « lacune » si applicable.

### 3.5 Exercices pratiques (6 PBQ)

| ID | Objectif | Type | Énoncé |
|---|---|---|---|
| `pbq-1.1-classify` | 1.1 | classify | Classer 12 contrôles dans les 4 catégories |
| `pbq-1.3-pki` | 1.3 | order + hotspot | Reconstruire une chaîne de confiance |
| `pbq-2.5-triage` | 2.5 | table | Trier 8 alertes : vrai positif / faux positif / à escalader |
| `pbq-2.5-logs` | 2.5 | table | Corréler 3 sources de journaux pour reconstituer une intrusion |
| `pbq-3.3-dlp` | 3.3 | match | Associer 8 types de données à la méthode de protection adaptée |
| `pbq-5.2-ale` | 5.2 | calc | Calculer SLE, ALE et justifier un traitement du risque |

### 3.6 Scénarios (3)

| ID | Objectif | Situation |
|---|---|---|
| `sc-1.1-control-choice` | 1.1 | Choisir et justifier 4 contrôles pour un site distant |
| `sc-2.5-ransomware` | 2.5 | Rançongiciel sur le serveur de fichiers — décisions J+0 à J+3 |
| `sc-4.7-tabletop` | 4.7 | Tabletop : fuite de données client, 8 décisions |

### 3.7 Les 21 autres objectifs

Affichés dans la navigation avec :
- leur intitulé officiel (anglais) et leur traduction ;
- **la liste complète de leurs sous-thèmes officiels** ;
- leur verdict de couverture par les livres ;
- un badge « Contenu en préparation » et la liste des leçons prévues.

**Aucun objectif n'est caché.** L'utilisateur voit immédiatement que le programme complet est
cartographié, et ce qui reste à produire.

---

## 4. Fonctionnalités transverses livrées

| Fonctionnalité | Détail |
|---|---|
| Tableau de bord | 5 cartes de domaine avec % officiel, progression, score de préparation global |
| Navigation | Barre latérale repliable, arborescence domaine → objectif → leçon |
| Lecteur de leçon | Sommaire, blocs typés, schémas, encadrés, sources, question intégrée |
| Flashcards | Deck par objectif, retournement, notation (à revoir / moyen / acquis), SRS |
| Quiz | Correction immédiate ou en fin, explication, score, révision des erreurs |
| Exercices | 6 types de tâches, score, corrigé détaillé par item |
| Scénarios | Arbre de décision, score par choix, débrief final |
| Recherche | `Ctrl+K`, index local, résultats groupés, navigation vers l'ancre |
| Progression | Sauvegarde locale, reprise « Continuer où j'en étais », export JSON |
| Références | Chaque notion affiche livre + chapitre + page (PDF et imprimée) |
| Terminologie | Encadré « terme officiel ↔ terme du terrain » sur les notions concernées |
| Marquage des lacunes | Badge explicite « non couvert par vos livres — rédigé pour l'examen » |
| Accessibilité | Navigation clavier, contraste AA, focus visible |
| Hors ligne | Aucun appel réseau, tout embarqué |

---

## 5. Critères d'acceptation du prototype

Le prototype sera considéré comme livré lorsque :

1. ☐ L'application démarre sous Windows et affiche le tableau de bord des 5 domaines.
2. ☐ Les 27 objectifs sont navigables et affichent leurs sous-thèmes officiels complets.
3. ☐ Les 16 leçons des 6 objectifs sont lisibles intégralement, avec leurs sources.
4. ☐ Les 5 schémas interactifs répondent au clic et affichent leurs panneaux de détail.
5. ☐ Les 6 decks de flashcards fonctionnent avec répétition espacée.
6. ☐ Les 6 quiz corrigent, expliquent et enregistrent le score.
7. ☐ Les 6 exercices pratiques notent et affichent un corrigé par item.
8. ☐ Les 3 scénarios produisent un score et un débrief.
9. ☐ La progression survit à la fermeture et à la réouverture de l'application.
10. ☐ La recherche renvoie des résultats pertinents et navigue vers le bon endroit.
11. ☐ Aucune erreur dans la console, aucun accès réseau.
12. ☐ Un exécutable Windows est produit et lancé avec succès sur cette machine.

---

## 6. Ce que le prototype ne fait pas (volontairement)

- Il ne contient pas les 80 leçons restantes.
- Il ne contient pas de simulateur SOC complet (ce n'est pas l'objectif du projet).
- Il n'inclut pas de génération d'examen blanc de 90 questions (prévu en phase 6).
- Il ne propose pas de synchronisation cloud (le projet est hors ligne par choix).
- Il n'y a **aucun développement Android**.

---

## 7. Estimation

| Lot | Contenu | Charge |
|---|---|---|
| L1 | Socle Electron + design system + routeur + navigation 27 objectifs | ~1,5 j |
| L2 | 6 moteurs (leçon, schéma, cartes, quiz, PBQ, scénario) | ~2,5 j |
| L3 | Progression, SRS, recherche, export | ~1 j |
| L4 | Rédaction du contenu des 6 objectifs (16 leçons, 5 schémas, 130 cartes, 90 questions, 6 PBQ, 3 scénarios) | ~3 j |
| L5 | Tests, corrections, packaging, exe | ~1 j |
| **Total** | | **~9 jours de travail** |

La phase de production complète (80 leçons restantes) est estimée à environ **6 à 8 semaines**
de rédaction et d'intégration, à planifier après votre validation du prototype.

---

## 8. Après votre test

Trois suites possibles, à votre choix :

1. **Ajuster le prototype** (contenu, design, objectifs couverts), puis re-tester.
2. **Lancer la production** objectif par objectif, en commençant par les 7 chantiers critiques
   identifiés dans `04-Gap-Register.md`.
3. **Ajouter une fonctionnalité** avant la production (examen blanc, mode révision quotidienne,
   statistiques détaillées).
