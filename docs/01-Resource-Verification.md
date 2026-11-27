# 01 — Vérification des ressources

**Date de vérification :** 26 novembre 2026
**Dossier source :** `D:\SOC ANALYST COURS ET PROGRAMMES\SOC BOOKS\`

---

## 1. Contrôle d'accès aux fichiers

Les cinq documents demandés ont été ouverts et leur contenu a été extrait avec succès.

| # | Fichier | Taille | Pages | Texte extrait | État |
|---|---|---|---|---|---|
| 1 | `Security.801.Objectives.pdf` | 274 642 o | 27 | 34 565 car. | ✅ **OK** — texte natif, signets complets |
| 2 | `Defensive Security Handbook - Best Practices For Securing Infrastructures.pdf` | 30 674 984 o | 284 | 537 030 car. | ✅ **OK** — texte natif, table des matières (307 entrées) |
| 3 | `11-strategies-of-a-world-class-cybersecurity-operations-center.pdf` | 16 476 290 o | 452 | 1 146 996 car. | ✅ **OK** — texte natif |
| 4 | `SOC Analyst Notes.pdf` | 11 849 779 o | 296 | 503 040 car. | ✅ **OK** — texte natif (aucun signet) |
| 5 | `Networking Fundamentals For Soc Analyst (2).pdf` | 23 509 364 o | 35 | **92 car.** | ⚠️ **OK après OCR** — PDF 100 % image |

### Point d'attention n° 1 — le livre de réseaux est un PDF scanné

`Networking Fundamentals For Soc Analyst (2).pdf` ne contient **aucune couche texte** : 35 pages,
chacune une image unique (1024×1536 ou 1639×2458 px), soit 92 caractères extractibles au total
(une URL de filigrane par page).

**Traitement appliqué :** rendu des 35 pages à 200 dpi puis OCR via le moteur Windows OCR (en-US).
Le texte a été récupéré et exploité pour la cartographie. **Qualité : moyenne** — il s'agit de notes
manuscrites, l'OCR produit des erreurs de reconnaissance (`Subnettbt9` pour *Subnetting*,
`Traceri` pour *tracert*, `I-IDP` pour *UDP*).

**Conséquence pour le projet :** ce livre est utilisable comme **source de concepts** (les intitulés
et les analogies sont identifiables), mais **jamais comme source de citation textuelle**. Aucune
phrase de ce livre ne sera citée littéralement dans l'application. Les notions qu'il apporte
(adressage IP, sous-réseaux, CIDR, DMZ, zones, ports, TCP/UDP, commandes réseau) seront rédigées
à nouveau et vérifiées.

### Point d'attention n° 2 — le référentiel est la seule source d'autorité

Le document `Security.801.Objectives.pdf` est bien le **document officiel CompTIA Security+ SY0-801 V8,
Exam Objectives, Document Version 2.0, Copyright © 2025**, avec :

- les 5 domaines et leurs pondérations ;
- les 27 objectifs et leurs sous-thèmes ;
- la liste des acronymes officiels (p. 24-26) ;
- la liste matériel/logiciel de laboratoire (p. 27).

C'est **le seul document qui définit le périmètre**. Les quatre livres sont subordonnés.

---

## 2. Conventions de pagination utilisées dans tous les livrables

Les numéros de page cités sont **les numéros de page du fichier PDF** (ce que votre lecteur PDF
affiche), et non les numéros imprimés. Les décalages ont été mesurés :

| Livre | Décalage mesuré | Exemple |
|---|---|---|
| `Security.801.Objectives.pdf` | aucun | p. 4 = début du domaine 1.0 |
| `Defensive Security Handbook` | **PDF = imprimé + 22** | PDF p. 191 = page imprimée 169 (chapitre 16) |
| `11 Strategies of a World-Class SOC` | **PDF = imprimé + 20** | PDF p. 47 = page imprimée 27 (Stratégie 1) |
| `SOC Analyst Notes` | aucun | PDF p. 11 = « 11 / Page » |
| `Networking Fundamentals` | aucun | 35 pages |

> Dans l'application, chaque référence affichera les **deux** numéros : « *Defensive Security Handbook*,
> PDF p. 191 (imprimé 169) », afin que vous retrouviez la page quel que soit l'outil utilisé.

---

## 3. Structure des ouvrages (vérifiée par extraction)

### 3.1 Defensive Security Handbook — 21 chapitres + annexe

| Ch. | Titre | Pages PDF |
|---|---|---|
| 1 | Creating a Security Program | 23-33 |
| 2 | Asset Management and Documentation | 35-45 |
| 3 | Policies | 47-51 |
| 4 | Standards and Procedures | 53-57 |
| 5 | User Education | 59-64 |
| 6 | Incident Response | 67-74 |
| 7 | Disaster Recovery | 75-82 |
| 8 | Industry Compliance Standards and Frameworks | 83-91 |
| 9 | Physical Security | 93-101 |
| 10 | Microsoft Windows Infrastructure | 103-120 |
| 11 | Unix Application Servers | 123-133 |
| 12 | Endpoints | 135-146 |
| 13 | Password Management and MFA | 147-164 |
| 14 | Network Infrastructure | 165-175 |
| 15 | Segmentation | 177-189 |
| 16 | Vulnerability Management | 191-200 |
| 17 | Development | 201-208 |
| 18 | Purple Teaming | 209-235 |
| 19 | IDS and IPS | 237-245 |
| 20 | Logging and Monitoring | 247-254 |
| 21 | The Extra Mile | 255-261 |
| A | User Education Templates | 263-266 |

### 3.2 11 Strategies of a World-Class SOC — 12 chapitres

| Ch. | Titre | Pages PDF | Pages imprimées |
|---|---|---|---|
| 0 | Fundamentals (0.1–0.4) | 21-46 | 1-26 |
| 1 | Know What You Are Protecting and Why | 47-60 | 27-40 |
| 2 | Give the SOC the Authority to Do Its Job | 61-70 | 41-50 |
| 3 | Build a SOC Structure to Match Your Organizational Needs | 71-118 | 51-98 |
| 4 | Hire AND Grow Quality Staff | 121-142 | 101-122 |
| 5 | Prioritize Incident Response | 145-169 | 125-149 |
| 6 | Illuminate Adversaries with Cyber Threat Intelligence | 171-197 | 151-177 |
| 7 | Select and Collect the Right Data | 199-257 | 179-237 |
| 8 | Leverage Tools to Support Analyst Workflow | 261-302 | 241-282 |
| 9 | Communicate Clearly, Collaborate Often, Share Generously | 305-319 | 285-299 |
| 10 | Measure Performance to Improve Performance | 321-337 | 301-317 |
| 11 | Turn up the Volume by Expanding SOC Functionality | 339-376 | 319-356 |

### 3.3 SOC Analyst Notes — 296 pages, sans table des matières

Document de notes non structuré, organisé en **fiches de définitions** (~172 entrées détectées),
puis en **questions d'entretien**. Thèmes successifs :

| Zone | Pages | Contenu dominant |
|---|---|---|
| A | 1-17 | Réseaux, protocoles, CIA, pare-feu, IDS/IPS, OWASP, TCP/UDP |
| B | 18-50 | MTTI, SLA, ports, DORA/DHCP, DNS, classification des données |
| C | 51-100 | Event IDs, architecture 3-tiers, passerelle e-mail, défense en profondeur, Cyber Kill Chain, reconnaissance |
| D | 101-160 | MITM, mouvement latéral, sévérité AV/EDR, hachage, priorisation d'incident, BIA, NAT, validation de règles pare-feu, proxy, WAF vs NGFW |
| E | 161-190 | Scan de ports, cryptographie (RC4, DES/AES, asymétrique), OWASP/XSS/SQLi, RMF, RGPD/HIPAA/NIST/ISO |
| F | 191-260 | Logs, SIEM, normalisation/parsing, IOC/IOA, threat intel, Splunk, QRadar, menace interne, analyse de malware |
| G | 261-296 | Codes HTTP, journaux Windows, DoS/DDoS, WAF, couches TCP/IP |

### 3.4 Networking Fundamentals for SOC Analyst — 35 pages

| Zone | Pages | Contenu |
|---|---|---|
| A | 1-6 | Pourquoi les réseaux comptent, qu'est-ce qu'un réseau, équipements (switch, routeur, AP, passerelle) |
| B | 7-11 | MAC, IP, privé/public, NAT, sous-réseaux, masque, CIDR |
| C | 12-14 | LAN/WAN, DMZ, zones réseau |
| D | 15-20 | Ports et protocoles, plages de ports, TCP vs UDP, ports à forte valeur (22/53/80/443/25/445/3389/161/389/636) |
| E | 21-27 | Commandes : `ipconfig`, `ping`, `tracert`, `nslookup`, `netstat`, `Test-NetConnection` |
| F | 28-31 | Flux d'investigation réseau SOC, triage d'alerte, méthodologie de dépannage |
| G | 32-35 | Questions d'entretien, carte mentale, aide-mémoire |

---

## 4. Vérifications de cohérence

| Contrôle | Résultat |
|---|---|
| Les 5 documents sont-ils les bons ? | ✅ Oui — titres, auteurs et éditeurs concordent |
| Le référentiel est-il bien SY0-801 V8 ? | ✅ Oui — mention explicite en p. 1, 3, 24 |
| Le nombre d'objectifs annoncé (27) est-il exact ? | ✅ Oui — 3 + 6 + 4 + 8 + 6 = 27 |
| Les pondérations totalisent-elles 100 % ? | ✅ Oui — 16 + 24 + 19 + 27 + 14 = 100 |
| Les 4 livres sont-ils tous exploitables ? | ✅ Oui, dont 1 après OCR (voir §1) |
| Existe-t-il des doublons entre livres ? | ⚠️ Oui, partiels (réseaux, SIEM, IR) — traité par la matrice de sources |

---

## 5. Fichiers de travail produits

Les textes extraits sont conservés pour permettre la traçabilité de chaque référence :

```
extract/
  Security_801_Objectives.txt          (34 565 car.)
  Defensive_Security_Handbook_*.txt    (537 030 car.)
  11_strategies_*.txt                  (1 146 996 car.)
  SOC_Analyst_Notes.txt                (503 040 car.)
  Networking_Fundamentals_OCR.txt      (OCR, qualité moyenne)
  _toc.txt, _socnotes_headings.txt     (structures)
data/
  objectives.json                      (27 objectifs, 716 sous-thèmes)
  coverage.json                        (présence par objectif × livre × page)
  _termaudit2.txt                      (381 termes contrôlés, avec pages)
```

Ces fichiers serviront à générer automatiquement les références de l'application et à vérifier
qu'aucune affirmation de source n'est inventée.
