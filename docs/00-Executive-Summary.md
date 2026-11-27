# CompTIA Security+ SY0-801 — Plateforme d'apprentissage interactive

## 00 — Synthèse exécutive (Phase 1 : analyse, avant tout développement)

**Date :** 26 novembre 2026
**Périmètre :** CompTIA Security+ SY0-801 V8 (document officiel des objectifs, version 2.0, © 2025)
**Statut :** Analyse terminée — **en attente de votre approbation avant la phase de développement**

---

## 1. Ce qui a été fait

| Étape demandée | État | Livrable |
|---|---|---|
| 1. Vérifier les 4 livres PDF (+ le référentiel) | ✅ Terminé | `01-Resource-Verification.md` |
| 2. Analyser le référentiel officiel SY0-801 | ✅ Terminé | `03-Curriculum-Map.md` |
| 3. Analyser les 4 livres | ✅ Terminé | `02-Book-Analysis.md` |
| 4. Associer les contenus aux 27 objectifs | ✅ Terminé | `03-Curriculum-Map.md` |
| 5. Identifier lacunes et hors-programme | ✅ Terminé | `04-Gap-Register.md` |
| 6. Présenter le programme complet | ✅ Terminé | `03-Curriculum-Map.md` |
| 7. Proposer l'architecture | ✅ Terminé | `05-Architecture-Proposal.md` |
| 8. **Attendre votre approbation** | ⏸️ **Ici** | — |
| 9. Développer le prototype | ⬜ Après accord | `06-Prototype-Scope.md` |
| 10. Tester et livrer | ⬜ Après accord | — |

---

## 2. Résultats clés de l'analyse

### 2.1 Le référentiel

- **27 objectifs** officiels répartis sur **5 domaines** : 3 + 6 + 4 + 8 + 6.
- **716 sous-thèmes** distincts (comptage automatique du document officiel).
- Pondérations : D1 16 % · D2 24 % · D3 19 % · D4 27 % · D5 14 %.
- **32 sous-thèmes relèvent explicitement de l'IA** (objectif 2.6 + capacités IA de 4.6 + LLM de 2.4) : c'est une nouveauté majeure de la V8.

### 2.2 Les ressources

Les quatre livres sont **réels, lisibles et exploitables**, mais ils **ne constituent pas un cours Security+**. Ce sont :

| Livre | Nature réelle | Rôle dans le projet |
|---|---|---|
| **Defensive Security Handbook** (O'Reilly, 284 p.) | Manuel d'ingénierie défensive | **Source principale** pour D3, D4 et une partie de D5 |
| **11 Strategies of a World-Class SOC** (MITRE, 452 p.) | Ouvrage d'organisation des SOC | **Source principale** pour D4 (surveillance, IR, CTI, forensics) et D5 (gouvernance, audits) |
| **SOC Analyst Notes** (296 p., notes informelles) | Fiches de définitions d'un analyste SOC | **Source d'appoint** : vocabulaire, protocoles, SIEM, IOC |
| **Networking Fundamentals for SOC Analyst** (35 p. manuscrites, scannées) | Fiches de réseaux | **Source d'appoint** pour D3 (architecture) et D4 (télémétrie) |

### 2.3 Le constat central

> **Aucun des quatre livres ne couvre le programme SY0-801 de façon autonome.**
> Ils couvrent très bien la **pratique défensive** (opérations, monitoring, réponse à incident, gouvernance)
> et très mal la **théorie certifiante** (cryptographie/PKI, acteurs de menace, modèles de contrôle d'accès,
> risques quantitatifs, audit, conformité, IA).

Couverture moyenne des 716 sous-thèmes (présence terminologique vérifiée) :

| Domaine | Poids | Couverture livres | Verdict |
|---|---|---|---|
| D1 Concepts généraux | 16 % | ~31 % | ⚠️ **Insuffisant** — la cryptographie (1.3) est le trou le plus grave |
| D2 Menaces & attaques | 24 % | ~34 % | ⚠️ **Insuffisant** — taxonomie d'acteurs et IA quasi absentes |
| D3 Architecture | 19 % | ~40 % | 🟡 **Partiel** — bon sur segmentation/données, faible sur résilience |
| D4 Opérations | 27 % | ~41 % | 🟢 **Bon** — c'est le point fort des livres |
| D5 Programme & supervision | 14 % | ~30 % | ⚠️ **Insuffisant** — conformité, vie privée, audit très faibles |

**Conséquence pour la conception :** la plateforme ne peut pas être un simple « habillage » des livres.
Elle doit être un **cours original structuré sur le référentiel**, dans lequel les livres sont cités comme
**lectures d'approfondissement sourcées (livre + page)**, et où les **lacunes sont rédigées par le formateur**.

C'est exactement l'architecture que je propose : **contenu original aligné sur les objectifs + renvois
documentaires vérifiés vers les 4 livres**.

### 2.4 Ce qui est explicitement hors programme

Le `04-Gap-Register.md` détaille le tri. En résumé, sont **exclus du parcours principal** :

- contenus très « SOC/entreprise » des livres qui ne figurent dans aucun objectif : construction d'un SOC,
  recrutement et gestion de carrière des analystes, modèles organisationnels de SOC, métriques de SOC,
  purple teaming opérationnel, OSINT offensif détaillé, EMET, TACACS+, IPv6 détaillé, MSSQL/AD internes,
  guides de style de rédaction de politiques ;
- les sujets **pré-701** disparus du référentiel V8 (ex. : concepts de base de la virtualisation générique,
  notions de « cloud security » non rattachées à un objectif) ;
- le contenu **hors cybersécurité** (câblage, matériel, anecdotes).

Ces éléments restent disponibles dans une section **« Approfondissement »** clairement séparée,
non comptabilisée dans la progression d'examen.

---

## 3. Architecture proposée (résumé)

**Electron 45 + React 19 + TypeScript + Vite + Tailwind CSS**, contenu 100 % local (JSON), progression
stockée dans `%APPDATA%`, aucune connexion réseau requise, exécutable Windows autonome.

Vérifié dans cet environnement : Node 26.13, npm 11.20, Electron 45.5 opérationnels.
(Pas de SDK .NET ni de Rust installés → Electron est le choix le plus fiable et le plus maintenable ici.)

Détails complets, modèle de données et arborescence : `05-Architecture-Proposal.md`.

---

## 4. Prototype proposé (après votre accord)

Un prototype **réellement utilisable**, pas une maquette, couvrant **6 objectifs répartis sur les 5 domaines** :

| Objectif | Domaine | Ce que le prototype démontre |
|---|---|---|
| **1.1** Concepts et contrôles de sécurité | D1 | Leçon + **schéma interactif** « défense en profondeur / matrice des contrôles » |
| **1.3** Solutions cryptographiques | D1 | **Chaîne PKI interactive** + laboratoire hachage/sel + quiz |
| **2.5** Indicateurs d'activité malveillante | D2 | **PBQ de triage d'alertes** (logs fictifs) + scénario d'investigation |
| **3.3** Protection des données | D3 | Schéma états/classifications + exercice de conception DLP |
| **4.7** Réponse aux incidents | D4 | **Diagramme du cycle IR interactif** + exercice de tabletop |
| **5.2** Gestion des risques | D5 | **Calculateur SLE/ALE/ARO** + registre des risques noté |

Plus : tableau de bord des 5 domaines, navigation complète par les 27 objectifs (les 21 restants
affichés avec leurs sous-thèmes officiels et leur statut « à venir »), recherche globale, flashcards,
quiz corrigés avec explication, suivi de progression pondéré par les % d'examen, références
livre + page pour chaque notion.

---

## 5. Ce que j'attends de vous

Merci de valider ou d'ajuster :

1. **Le périmètre du prototype** : les 6 objectifs proposés conviennent-ils, ou préférez-vous en
   remplacer certains (ex. : 4.5 IAM ou 4.1 contrôles défensifs à la place de 3.3) ?
2. **La langue de l'interface et du contenu** : français, anglais, ou bilingue (objectifs officiels en
   anglais + explications en français) ?
3. **La profondeur du prototype** : niveau « démonstration crédible » (~6 objectifs complets) ou
   « prêt à réviser » (davantage de contenu, délai plus long) ?
4. **Le format de livraison** : exécutable portable `.exe` + code source, ou code source + script de build ?

Dès votre accord, je passe à la construction, aux tests et à la livraison du prototype.
