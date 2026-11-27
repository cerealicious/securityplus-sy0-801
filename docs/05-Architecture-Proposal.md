# 05 — Architecture applicative proposée

---

## 1. Contraintes et arbitrages

| Contrainte | Conséquence |
|---|---|
| Application **Windows** de bureau | Pas de web app hébergée ; binaire local |
| **Hors ligne** intégral | Tout le contenu est embarqué ; aucune requête réseau à l'exécution |
| **Léger** et **performant** | Démarrage < 2 s, mémoire < 300 Mo, pas de framework lourd côté données |
| **Maintenable** | Contenu séparé du code (JSON), moteurs génériques réutilisables |
| **Évolutif** vers 86 leçons / 600 flashcards / 390 questions | Le contenu ne doit pas exiger de code à chaque ajout |
| **Progression locale** | Fichier JSON dans `%APPDATA%`, exportable |
| **Traçabilité des sources** | Chaque notion porte livre + chapitre + page |

### Environnement vérifié sur cette machine

| Outil | État |
|---|---|
| Node.js | ✅ 26.13.1 |
| npm | ✅ 11.20.0 |
| Electron | ✅ 45.5.0 (binaire téléchargé et exécuté avec succès) |
| .NET SDK | ❌ absent (seulement les runtimes) |
| Rust / Cargo | ❌ absent |
| Python | ✅ 3.14 (utilisé pour l'analyse, pas pour l'app) |

### Décision

**Electron + React + TypeScript + Vite + Tailwind CSS.**

Justification :

- **Seule chaîne d'outils complète et vérifiée ici** — .NET exigerait d'installer un SDK (~250 Mo),
  Tauri exigerait Rust (~1,5 Go de toolchain). Electron fonctionne déjà.
- **Rendu d'interface** : HTML/CSS est le meilleur outil pour des schémas interactifs, des
  flashcards animées et une typographie soignée. Refaire cela en XAML serait beaucoup plus long.
- **Maintenance** : séparation nette contenu (JSON) / moteurs (React) / shell (Electron).
  Ajouter une leçon = ajouter un fichier JSON, sans toucher au code.
- **Performance** : avec un bundle local et du contenu JSON, l'app est instantanée. Le poids
  d'Electron (≈ 90 Mo compressé) est le compromis assumé pour la fiabilité et la vitesse de
  développement.
- **Évolutivité** : le même code pourra servir une version web ou macOS/Linux plus tard, sans
  réécriture. (Aucun développement Android dans ce projet.)

> Alternative écartée : **Tauri** (idéal en taille, ~8 Mo) — impossible sans Rust installé.
> Alternative écartée : **WPF + WebView2** — nécessite le SDK .NET, et le pont C#/JS ajoute de la
> complexité pour aucun gain fonctionnel.

---

## 2. Architecture en trois couches

```
┌─────────────────────────────────────────────────────────────────┐
│  COUCHE 1 — SHELL (Electron, processus principal)               │
│  • Fenêtre, barre de titre sombre, menu natif                   │
│  • Protocole app:// (sert le bundle local, pas de serveur HTTP) │
│  • IPC : lecture/écriture progression, export, sauvegarde       │
│  • Sécurité : contextIsolation, sandbox, CSP stricte, no node   │
├─────────────────────────────────────────────────────────────────┤
│  COUCHE 2 — APPLICATION (React + TypeScript)                    │
│  • Routeur (hash) : Dashboard / Domaine / Objectif / Leçon /    │
│    Flashcards / Quiz / Labo / Scénario / Recherche / Progression│
│  • Moteurs génériques : LessonRenderer, DiagramEngine,          │
│    FlashcardEngine, QuizEngine, PbqEngine, ScenarioEngine       │
│  • État : store de progression + SRS                            │
├─────────────────────────────────────────────────────────────────┤
│  COUCHE 3 — CONTENU (JSON versionné, 100 % local)               │
│  • curriculum/ domains, objectives, lessons, flashcards,        │
│    quizzes, pbqs, scenarios, glossary, sources                  │
└─────────────────────────────────────────────────────────────────┘
```

**Principe directeur :** les moteurs ne connaissent aucun sujet. Ils interprètent un format.
Le contenu est la seule chose qui change d'une leçon à l'autre.

---

## 3. Arborescence du projet

```
SecurityPlus-SY0-801/
├─ docs/                          # les présents livrables d'analyse
├─ electron/
│  ├─ main.ts                     # fenêtre, protocole app://, cycle de vie
│  ├─ preload.ts                  # API exposée (window.sp801)
│  ├─ store.ts                    # persistance JSON dans %APPDATA%
│  └─ menu.ts                     # menu natif (fichier, édition, aide)
├─ src/
│  ├─ main.tsx                    # point d'entrée React
│  ├─ App.tsx                     # routeur et layout
│  ├─ routes/
│  │  ├─ Dashboard.tsx            # 5 domaines, progression, reprise
│  │  ├─ DomainView.tsx           # objectifs du domaine
│  │  ├─ ObjectiveView.tsx        # leçons, cartes, quiz, labo, scénario
│  │  ├─ LessonView.tsx           # lecteur de leçon
│  │  ├─ FlashcardsView.tsx
│  │  ├─ QuizView.tsx
│  │  ├─ LabView.tsx              # exercices pratiques (PBQ)
│  │  ├─ ScenarioView.tsx
│  │  ├─ SearchView.tsx
│  │  └─ ProgressView.tsx
│  ├─ engines/
│  │  ├─ LessonRenderer.tsx       # blocs typés
│  │  ├─ DiagramEngine.tsx        # SVG interactif déclaratif
│  │  ├─ FlashcardEngine.tsx      # répétition espacée (Leitner)
│  │  ├─ QuizEngine.tsx           # QCM, multi-réponses, appariement
│  │  ├─ PbqEngine.tsx            # 6 types de tâches
│  │  └─ ScenarioEngine.tsx       # arbre de décision
│  ├─ components/                 # UI réutilisable (cards, badges, progress…)
│  ├─ state/                      # progression, SRS, préférences
│  ├─ content/                    # ← LE CONTENU (JSON)
│  │  ├─ domains.json
│  │  ├─ objectives/1.1.json … 5.6.json
│  │  ├─ lessons/1.1-01.json …
│  │  ├─ diagrams/…
│  │  ├─ flashcards/1.1.json …
│  │  ├─ quizzes/1.1.json …
│  │  ├─ pbqs/…
│  │  ├─ scenarios/…
│  │  ├─ glossary.json
│  │  └─ sources.json             # index des 4 livres + pages
│  ├─ lib/                        # recherche, scoring, formatage
│  └─ styles/
├─ build/                         # icônes, installeur
├─ package.json
├─ vite.config.ts
├─ tailwind.config.ts
└─ tsconfig.json
```

---

## 4. Modèle de données du contenu

### 4.1 Objectif

```json
{
  "id": "1.3",
  "domain": "1",
  "title": "Explain the importance of using appropriate cryptographic solutions.",
  "titleFr": "Expliquer l'importance d'utiliser des solutions cryptographiques adaptées.",
  "type": "explain",
  "subtopics": [
    { "group": "PKI", "items": [
      { "id": "1.3.pki.public-key", "official": "Public key", "fr": "Clé publique" }
    ]}
  ],
  "coverage": "weak",
  "lessonIds": ["1.3-01", "1.3-02", "1.3-03", "1.3-04", "1.3-05"],
  "flashcardDeck": "fc-1.3",
  "quizId": "qz-1.3",
  "pbqIds": ["pbq-1.3-pki"],
  "scenarioId": "sc-1.3-expired-cert"
}
```

### 4.2 Leçon — blocs typés

```json
{
  "id": "1.3-02",
  "objective": "1.3",
  "order": 2,
  "title": "La chaîne de confiance PKI",
  "minutes": 18,
  "blocks": [
    { "type": "lead", "text": "Un certificat n'est jamais cru « parce qu'il existe »…" },
    { "type": "term", "official": "Root of trust", "fr": "Racine de confiance",
      "fieldTerm": "trust anchor", "gap": false },
    { "type": "diagram", "diagramId": "d-pki-chain" },
    { "type": "text", "md": "…" },
    { "type": "compare", "left": {"title": "CRL", "points": ["…"]},
                          "right": {"title": "OCSP", "points": ["…"]} },
    { "type": "callout", "kind": "exam", "md": "À l'examen, « OCSP stapling »…" },
    { "type": "callout", "kind": "gap", "md": "Notion non couverte par vos livres." },
    { "type": "source", "book": "DSH", "chapter": "13", "page": 151,
      "printed": 129, "strength": "supporting", "note": "Hachage et salage" },
    { "type": "check", "question": "…", "options": ["…"], "answer": 1,
      "explain": "…" }
  ]
}
```

Types de blocs prévus : `lead`, `text`, `term`, `diagram`, `compare`, `table`, `callout`
(`exam` / `tip` / `warning` / `gap` / `field`), `source`, `code`, `check`, `summary`.

### 4.3 Schéma interactif — déclaratif

```json
{
  "id": "d-pki-chain",
  "kind": "flow",
  "title": "Chaîne de confiance PKI",
  "nodes": [
    { "id": "csr", "label": "CSR", "x": 40,  "y": 80,  "kind": "artifact",
      "detail": "Demande de signature contenant la clé publique et l'identité.",
      "exam": "Le CSR ne contient jamais la clé privée." },
    { "id": "ca",  "label": "CA",  "x": 240, "y": 80,  "kind": "actor" }
  ],
  "edges": [ { "from": "csr", "to": "ca", "label": "signe" } ],
  "modes": ["explore", "quiz"]
}
```

Trois modes réutilisables : **explorer** (clic = panneau de détail), **quiz** (retrouver le bon
élément), **build** (reconstruire l'ordre). Un même schéma sert donc de cours, d'exercice et
d'évaluation — c'est ce qui rend l'approche économique à produire.

### 4.4 Exercice pratique (PBQ) — 6 types de tâches

| Type | Description | Exemple |
|---|---|---|
| `classify` | Glisser 12 éléments dans 4 catégories | Classer des contrôles (1.1) |
| `order` | Remettre 7 étapes dans l'ordre | Cycle de réponse à incident (4.7) |
| `match` | Associer 8 paires | Terme ↔ définition (tous) |
| `hotspot` | Cliquer la bonne zone d'un schéma | Placer un capteur IDS (4.1) |
| `table` | Compléter un tableau d'analyse | Triage de 8 alertes (2.5) |
| `calc` | Saisir un résultat calculé | ALE = SLE × ARO (5.2) |

Chaque PBQ produit un score, un corrigé détaillé et une justification par item.

### 4.5 Scénario — arbre de décision

```json
{
  "id": "sc-2.5-ransomware",
  "objective": "2.5",
  "title": "Rançongiciel sur le serveur de fichiers",
  "context": "…",
  "start": "n1",
  "nodes": {
    "n1": {
      "text": "À 09:14, 40 postes affichent une note de rançon. Que faites-vous en premier ?",
      "choices": [
        { "text": "Éteindre tous les serveurs", "next": "n2", "score": -2,
          "why": "L'extinction détruit les preuves volatiles (mémoire)." },
        { "text": "Isoler le segment réseau concerné", "next": "n3", "score": +3,
          "why": "Le confinement limite la propagation sans détruire de preuves." }
      ]
    }
  },
  "debrief": { "…": "…" }
}
```

Le scénario se termine par un débrief qui reprend chaque choix, le score et la notion officielle
correspondante.

### 4.6 Progression

```json
{
  "schema": 1,
  "learner": { "name": "", "createdAt": "…" },
  "objectives": {
    "1.3": { "status": "in_progress", "lessonsDone": ["1.3-01","1.3-02"],
             "quizBest": 78, "pbqDone": ["pbq-1.3-pki"], "scenarioDone": false }
  },
  "srs": { "fc-1.3#12": { "box": 2, "due": "2026-12-02", "lapses": 1 } },
  "sessions": [ { "date": "2026-11-26", "minutes": 34 } ],
  "settings": { "lang": "fr+en", "theme": "dark", "dailyGoal": 30 }
}
```

**Score de préparation** = moyenne pondérée par les % officiels :

```
readiness = Σ(domainScore_d × weight_d) / 100
domainScore_d = 0.5·leçons + 0.2·flashcards + 0.2·quiz + 0.1·(PBQ+scénarios)
```

Le score est affiché par domaine et globalement, avec la mention « estimation pédagogique,
non prédictive du résultat officiel ».

---

## 5. Persistance et sécurité

| Aspect | Choix |
|---|---|
| Emplacement | `%APPDATA%\SecurityPlus-SY0-801\progress.json` |
| Écriture | Atomique (fichier temporaire + `rename`), avec `.bak` de secours |
| Corruption | Détection JSON invalide → restauration du `.bak` → sinon réinitialisation guidée |
| Export/Import | Bouton « Exporter ma progression » (JSON daté) |
| Réseau | **Aucun** appel réseau à l'exécution ; CSP `default-src 'self'` |
| Renderer | `nodeIntegration: false`, `contextIsolation: true`, `sandbox: true` |
| Protocole | `app://` enregistré comme privilégié et standard, sans accès disque arbitraire |
| Liens externes | Ouverts dans le navigateur système, jamais dans l'app |

---

## 6. Design et expérience

**Direction visuelle :** sombre, dense, lisible — registre « console d'analyse » sans imitation
de terminal.

| Élément | Choix |
|---|---|
| Fond | `#0B0F14` (base), `#111823` (surfaces), `#1A2331` (élévation) |
| Texte | `#E6EDF7` principal, `#93A4BC` secondaire |
| Accent par domaine | D1 `#4F8CFF` · D2 `#FF5C7A` · D3 `#22C55E` · D4 `#F5A524` · D5 `#A78BFA` |
| Typographie | Inter (UI) + JetBrains Mono (termes techniques, extraits de logs) |
| Grille | 12 colonnes, gouttière 24 px, largeur de lecture max. 72 caractères |
| Densité | Cartes compactes sur le dashboard, lecture confortable dans les leçons |
| Accessibilité | Contraste AA, navigation clavier complète, focus visible, `prefers-reduced-motion` |
| Animations | Transitions 150-200 ms uniquement, jamais bloquantes |

**Navigation principale (barre latérale persistante) :**

```
◆ Tableau de bord
  Domaine 1 — Concepts généraux            16 %
    1.1  Concepts et contrôles            ●●○○
    1.2  Gestion des changements          ○○○○
    1.3  Cryptographie                    ●●○○
  Domaine 2 — Menaces et attaques          24 %
  …
▸ Flashcards          (révisions dues : 24)
▸ Exercices pratiques
▸ Scénarios
▸ Recherche           (Ctrl+K)
▸ Ma progression
```

Chaque objectif affiche un indicateur à 4 états (non commencé / en cours / solide / maîtrisé)
calculé sur les leçons, les cartes et le quiz.

---

## 7. Recherche

- Index construit **au build** (script Node) à partir de tous les JSON : objectifs, leçons,
  flashcards, glossaire, sous-thèmes.
- Recherche côté client : correspondance exacte + préfixe + tolérance aux fautes (distance de
  Levenshtein ≤ 2), pondérée par titre > terme officiel > corps.
- Raccourci `Ctrl+K`, résultats groupés par type, navigation directe vers l'ancre de la leçon.
- Index attendu : < 500 Ko pour 86 leçons — chargé en mémoire, recherche instantanée.

---

## 8. Build, tests, livraison

### Scripts

| Commande | Effet |
|---|---|
| `npm run dev` | Vite + Electron en mode développement (HMR) |
| `npm run build` | Compilation TypeScript + bundle Vite |
| `npm run dist` | Installeur NSIS + exécutable portable |
| `npm run validate:content` | Valide tous les JSON contre les schémas (Zod) |
| `npm run check:coverage` | Vérifie que les 716 sous-thèmes sont couverts ou marqués `gap` |
| `npm run test` | Tests unitaires des moteurs (Vitest) |

### Validation du contenu (garde-fou essentiel)

Un script vérifie automatiquement :

1. que **chaque sous-thème officiel** possède une entrée dans le contenu (leçon, carte ou glossaire) ;
2. que **chaque référence** pointe vers un livre existant et une page dans les bornes du livre ;
3. qu'aucune notion marquée `gap: false` n'a une liste de sources vide ;
4. que chaque quiz a une explication pour chaque réponse ;
5. que chaque objectif a au moins 1 leçon, 1 deck, 1 quiz.

Ce script est la garantie mécanique de la promesse « aucun objectif omis, aucune source inventée ».

### Livraison

- `SecurityPlus-SY0-801-Setup-x.y.z.exe` (installeur NSIS, choix du dossier, raccourci menu Démarrer)
- `SecurityPlus-SY0-801-Portable-x.y.z.exe` (exécution sans installation, utile sur clé USB)
- Code source complet + `README.md` de build
- `docs/` (les présents livrables)

---

## 9. Feuille de route

| Phase | Contenu | Critère de sortie |
|---|---|---|
| **0 — Analyse** | Présents livrables | Votre approbation |
| **1 — Socle** | Shell Electron, design system, routeur, 27 objectifs navigables, progression | L'app démarre, on navigue, la progression persiste |
| **2 — Moteurs** | LessonRenderer, DiagramEngine, FlashcardEngine, QuizEngine, PbqEngine, ScenarioEngine | Chaque moteur fonctionne sur un contenu de test |
| **3 — Prototype** | 6 objectifs complets (voir `06`) | Vous pouvez réviser 6 objectifs de bout en bout |
| **4 — Validation** | Tests, corrections, packaging, exe | Exécutable testé sur cette machine |
| **5 — Production** | 80 leçons restantes, 600 cartes, 390 questions, 30 PBQ | Programme complet |
| **6 — Finition** | Recherche avancée, export de progression, statistiques | Version 1.0 |

Les phases 5 et 6 ne démarrent **qu'après votre test du prototype**.

---

## 10. Risques identifiés et parades

| Risque | Impact | Parade |
|---|---|---|
| Volume de contenu sous-estimé (86 leçons) | Retard de la phase 5 | Production par lots d'objectifs, validation mécanique par script |
| Qualité de l'OCR du livre réseau | Références imprécises | Ce livre ne sert que d'appoint ; jamais cité textuellement |
| Divergence terminologique livres / examen | Étudiant induit en erreur | Encadré « Terminologie d'examen » systématique + glossaire bilingue |
| Objectifs sans source (1.3, 2.2, 2.6, 4.5, 5.4, 5.5) | Contenu « non sourcé » | Marquage `gap: true` explicite + bibliographie externe citée |
| Poids d'Electron (~90 Mo) | Perception « pas léger » | Version portable + démarrage < 2 s ; alternative Tauri documentée si Rust est installé plus tard |
| Perte de progression | Frustration | Écriture atomique + `.bak` + export manuel |
