# 04 — Registre des lacunes et du hors-programme

Deux listes distinctes, toutes deux issues de la vérification terminologique sur les quatre livres
(381 termes contrôlés, avec localisation page par page) et de la lecture des chapitres.

---

## Partie A — Lacunes à rédiger (le corpus ne suffit pas)

### A.1 Vue d'ensemble par objectif

| Obj. | Sous-thèmes | Non couverts | Taux de lacune | Priorité de rédaction |
|---|---|---|---|---|
| 1.1 | 16 | 4 | 25 % | Moyenne |
| 1.2 | 20 | 8 | 40 % | Haute |
| 1.3 | 29 | 17 | 59 % | **Critique** |
| 2.1 | 9 | 1 | 11 % | Faible |
| 2.2 | 23 | 16 | 70 % | **Critique** |
| 2.3 | 50 | 18 | 36 % | Haute |
| 2.4 | 25 | 16 | 64 % | **Critique** |
| 2.5 | 53 | 15 | 28 % | Moyenne |
| 2.6 | 13 | 13 | **100 %** | **Critique** |
| 3.1 | 29 | 8 | 28 % | Moyenne |
| 3.2 | 21 | 5 | 24 % | Moyenne |
| 3.3 | 43 | 9 | 21 % | Moyenne |
| 3.4 | 31 | 17 | 55 % | Haute |
| 4.1 | 44 | 15 | 34 % | Haute |
| 4.2 | 6 | 5 | 83 % | Haute (terminologie) |
| 4.3 | 12 | 2 | 17 % | Faible |
| 4.4 | 25 | 5 | 20 % | Moyenne |
| 4.5 | 40 | 20 | 50 % | **Critique** |
| 4.6 | 25 | 15 | 60 % | Haute |
| 4.7 | 24 | 4 | 17 % | Faible |
| 4.8 | 28 | 9 | 32 % | Moyenne |
| 5.1 | 23 | 3 | 13 % | Faible |
| 5.2 | 26 | 6 | 23 % | Moyenne |
| 5.3 | 28 | 8 | 29 % | Haute |
| 5.4 | 21 | 15 | 71 % | **Critique** |
| 5.5 | 32 | 20 | 63 % | **Critique** |
| 5.6 | 20 | 11 | 55 % | Haute |

> Le taux de lacune mesure les sous-thèmes officiels **jamais nommés** dans les quatre livres.
> Il est corrigé à la baisse lorsque le livre traite la notion sous un autre nom (voir A.3).

### A.2 Les sept chantiers critiques

Ces objectifs ne peuvent pas être « sourcés » depuis le corpus : ils doivent être **écrits**.

#### ① Objectif 1.3 — Cryptographie et PKI (59 % de lacune)

**Absent des quatre livres :** autorités de certification, CRL, OCSP, CSR, key escrow, certificats
auto-signés, certificats wildcard, racine de confiance, niveaux de chiffrement (partition, volume,
fichier, base de données, enregistrement), longueur de clé, échange de clés, outils cryptographiques,
obfuscation.

**Ce que les livres apportent :** hachage et salage (Defensive Security Handbook p. 151-152),
chiffrement disque complet (p. 141-143), symétrique/asymétrique et AES/DES (SOC Analyst Notes p. 173-174),
TLS/IPsec (p. 10, 42).

**Rédaction requise :** ~5 leçons, 2 schémas interactifs, 30 flashcards, 18 questions, 1 PBQ.

#### ② Objectif 2.2 — Acteurs et motivations (70 % de lacune)

**Absent :** 16 des 23 sous-thèmes, dont les 8 profils d'acteurs et 9 des 12 motivations.

**Ce que les livres apportent :** menace interne vs externe (SOC Analyst Notes p. 227-231),
compréhension de l'adversaire et attribution (11 Strategies p. 165-175).

**Rédaction requise :** ~2 leçons, matrice acteurs × motivations, 20 flashcards, 12 questions.

#### ③ Objectif 2.4 — Types de vulnérabilités (64 % de lacune)

**Absent :** conditions de concurrence TOC/TOU, mise à jour malveillante, secrets codés en dur,
gestion d'exception non sûre, identifiants obsolètes, appareils pirates, shadow IT, fournisseurs
d'identité, communications à faible énergie, LLM, dépôts publics, stockage objet public.

**Ce que les livres apportent :** correctifs et configuration (Defensive Security Handbook p. 191-200),
codage sécurisé (p. 201-208), scan de ports (SOC Analyst Notes p. 162-170).

**Rédaction requise :** ~3 leçons, 1 schéma, 22 flashcards, 14 questions, 1 PBQ.

#### ④ Objectif 2.6 — Menaces liées à l'IA (100 % de lacune)

**Absent : tout.** Aucun livre ne traite cet objectif.

**Ce que les livres apportent :** rien d'exploitable (deux mentions de LLM, une de « jailbreak »).

**Rédaction requise :** ~2 leçons entièrement originales, 1 schéma, 16 flashcards, 12 questions,
1 PBQ, 1 scénario. Sources externes à citer : OWASP Top 10 for LLM Applications, NIST AI RMF.

#### ⑤ Objectif 4.5 — Identité et gestion des accès (50 % de lacune)

**Absent :** fédération, SSO, SAML, provisioning/déprovisioning, preuve d'identité, MAC, DAC,
contrôle basé temps, JIT, passkey, sans mot de passe, revue des accès, surveillance des identifiants
compromis, audit des comptes, comptes d'urgence, jetons matériels/logiciels, code de secours.

**Ce que les livres apportent :** mots de passe et MFA solides (Defensive Security Handbook p. 147-164),
Active Directory (p. 103-120), mentions de RBAC, OAuth, LDAP.

**Rédaction requise :** ~5 leçons, 2 schémas (SSO, modèles d'accès), 30 flashcards, 20 questions, 1 PBQ.

#### ⑥ Objectif 5.4 — Conformité (71 % de lacune)

**Absent :** AML/CTF, anti-corruption, attestations, accusés de réception, les 6 conséquences de la
non-conformité, opt-in/opt-out, droit à l'oubli, correction des données, restrictions et prévention
du traitement, responsable vs sous-traitant, legal hold, ordres légaux.

**Ce que les livres apportent :** PCI DSS, HIPAA, GLBA, FERPA, SOX et cadres (Defensive Security
Handbook p. 83-91), RGPD (SOC Analyst Notes p. 187-188).

**Rédaction requise :** ~2 leçons, 1 schéma, 16 flashcards, 12 questions, 1 PBQ, 1 scénario.

#### ⑦ Objectif 5.5 — Audit et évaluation (63 % de lacune)

**Absent :** échantillonnage, questionnaires, charte d'audit, comité d'audit, auto-évaluation,
benchmarking, examens externes, audit indépendant, les 9 types de tests d'intrusion, reconnaissance
passive/active, tests fonctionnels et comportementaux, normes sectorielles/internationales/régionales.

**Ce que les livres apportent :** MITRE ATT&CK, Diamond Model, kill chain (11 Strategies p. 168-172),
OSINT et red teaming (Defensive Security Handbook p. 209-235).

**Rédaction requise :** ~2 leçons, 1 schéma comparatif des cadres, 18 flashcards, 12 questions, 1 PBQ.

### A.3 Terminologie : les pièges à corriger

Les livres emploient souvent un **vocabulaire différent** de celui de l'examen. L'application devra
systématiquement afficher la correspondance, car l'examen utilise les termes officiels.

| Terme officiel SY0-801 | Terme employé dans les livres | Risque |
|---|---|---|
| Backout planning | *rollback* (non employé) | L'étudiant ne reconnaît pas le terme |
| Fail forward | absent | Concept inconnu |
| Warm site / Cold site | *warm standby*, *alternate system* (DSH p. 77-78) | Taxonomie officielle non vue |
| On-path attack | *man-in-the-middle / MITM* | Le terme officiel n'apparaît jamais |
| Security zones | *segmentation*, *DMZ* | Terme officiel absent |
| Privilege creep | absent | Concept inconnu |
| Just-in-time access | *JIT* (une mention) | Sous-thème non traité |
| Data steward / custodian / controller / subprocessor | *data owner* uniquement | 4 rôles sur 6 inconnus |
| Known / unknown / partially known environment | *white box / black box / grey box* | Correspondance à expliciter |
| Technical / managerial / physical / operational controls | absent | Taxonomie absente |
| Preventive / deterrent / corrective / detective / compensating / directive | absent | Taxonomie absente |
| Security Service Edge (SSE) | absent | Sous-thème inconnu |
| Group Managed Service Account (gMSA) | absent | Sous-thème inconnu |
| Alert tuning | *cutting out the noise* (DSH p. 239) | Terme officiel absent |
| IPFIX | *NetFlow* uniquement | Sigle officiel absent |
| BIMI | absent | Sous-thème inconnu |
| Brand Indicators for Message Identification | absent | Sous-thème inconnu |
| Passkey / passwordless | absent | Sous-thème inconnu |
| Legal hold | absent | Sous-thème inconnu |
| MTTD (détection) | *MTTI* (SOC Notes p. 20) | Sigle erroné |

**Décision de conception :** chaque leçon comportera un encadré **« Terminologie d'examen »**
qui donne le terme officiel, le synonyme du terrain, et la nuance. C'est un des apports majeurs
de la plateforme par rapport à une simple lecture des livres.

### A.4 Erreurs factuelles du corpus à ne pas propager

Identifiées dans *SOC Analyst Notes* — l'application ne doit jamais les reprendre :

| Page | Erreur | Correction |
|---|---|---|
| 2-3 | « DC » employé pour *Data Centre* **et** *Domain Controller* | Deux notions distinctes |
| 7 | « Cyber security **Instance** Team » | *Incident* Response Team |
| 14 | « **CMI** (Command Line Interface) » | **CLI** |
| 20 | « **MTTI** (Mean time to identification) » | MTTD (*detect*) / MTTI (*identify*) selon le contexte |
| 47 | « SPF, DKIM, DMARC » présentés sans distinguer leur rôle | SPF = expéditeur autorisé ; DKIM = signature ; DMARC = politique + alignement |
| 172-174 | RC4 présenté sans mention de son obsolescence | RC4 est déprécié, interdit en TLS moderne |
| 253 | SAN/NAS présentés comme objectifs de sécurité | Ce sont des architectures de stockage |

---

## Partie B — Contenu hors programme SY0-801 (à exclure du parcours principal)

Ces contenus existent dans les livres, sont souvent excellents, mais **ne correspondent à aucun
sous-thème officiel**. Ils seront placés dans une section **« Approfondissement »** séparée,
non comptabilisée dans la progression d'examen.

### B.1 *11 Strategies of a World-Class SOC*

| Contenu | Pages | Pourquoi hors programme |
|---|---|---|
| Ch. 3 complet — modèles organisationnels de SOC, centralisation/décentralisation, 24×7, implantation | 71-118 | Aucun objectif ne traite de la structure d'un SOC |
| Ch. 4 complet — recrutement, carrières, rétention, dimensionnement | 121-142 | Aucun objectif RH |
| Ch. 9 — communication interne et communautaire | 305-319 | Aucun objectif de communication |
| Ch. 10 — programme de métriques SOC | 321-337 | Seuls MTTR/MTBF intéressent 3.4 |
| Ch. 11 §11.2-11.4 — red team, purple team, BAS en détail | 328-339 | 5.5 ne demande que les *types* de tests |
| Annexes B, C, D — construction d'un SOC, documentation, outils de l'analyste | 393-425 | Hors référentiel |

### B.2 *Defensive Security Handbook*

| Contenu | Pages | Pourquoi hors programme |
|---|---|---|
| EMET (Enhanced Mitigation Experience Toolkit) | 111-117 | Technologie abandonnée par Microsoft |
| TACACS+ | 174 | Absent de la liste officielle des protocoles |
| Détail Active Directory (forêt, OU, contrôleurs de domaine) | 106-109 | Non exigible au niveau objectifs |
| MSSQL et compte SA | 118-119 | Hors objectifs |
| Security through obscurity | 259 | Notion utile, non listée |
| Guides de style de rédaction de politiques | 48-51 | Qualité rédactionnelle, pas sécurité |
| Liste de ressources (livres, blogs, podcasts) | 260-261 | Bibliographie |

### B.3 *SOC Analyst Notes*

| Contenu | Pages | Pourquoi hors programme |
|---|---|---|
| IBM QRadar en détail (DSM, magnitude, risk score, déploiement) | 195-248 | Outil spécifique non exigible |
| Splunk en détail (SPL, forwarder, ports) | 212-217 | Outil spécifique non exigible |
| Outils de ticketing (ServiceNow, Jira) | 40 | Hors objectifs |
| ISO 14001 (management environnemental) | 188 | Hors cybersécurité |
| SAN / NAS | 253 | Architectures de stockage, hors liste |
| Questions d'entretien et conseils de carrière | 20, 27-44, 122-131, 200-205 | Préparation d'entretien, pas certification |
| Architecture 3-tiers détaillée | 58-59 | Non exigible |

### B.4 *Networking Fundamentals for SOC Analyst*

| Contenu | Pages | Pourquoi hors programme |
|---|---|---|
| Présentation commerciale de la formation | 1 | Marketing |
| Questions d'entretien et aide-mémoire | 32-35 | Révision d'entretien |
| Détails de câblage et de commandes non exigés | 5, 21-27 | Les commandes sont conservées en pratique (4.8), pas en théorie |

### B.5 Sujets du corpus qui relèvent d'anciennes versions de l'examen

| Sujet | Statut SY0-801 |
|---|---|
| Concepts génériques de virtualisation (hyperviseur, VM) | Non listé comme objectif propre ; seule la vulnérabilité de virtualisation apparaît (2.4) |
| « Cloud security » générique | Remplacé par les modèles de déploiement, IaC, CSPM, stockage objet (3.1, 4.3, 2.4) |
| Notions de « defense in depth » uniquement matérielles | Remplacé par la taxonomie catégories × types (1.1) |
| Menaces « classiques » sans lien avec un vecteur officiel | À rattacher à 2.3 ou 2.5, sinon exclure |

---

## Partie C — Ce que les livres couvrent mieux que le référentiel

À l'inverse, trois zones du corpus **dépassent** le niveau exigé et constituent un vrai bonus
pour la compréhension. Elles seront signalées comme « Pour aller plus loin » à l'intérieur
des leçons concernées (pas en dehors) :

1. **Construction d'un programme de sécurité** (Defensive Security Handbook ch. 1) → éclaire 5.1 et 5.2.
2. **Doctrine de supervision** (11 Strategies ch. 7) → éclaire 4.4 et 4.8 bien au-delà du référentiel.
3. **Cycle de réponse à incident NIST complet** (11 Strategies ch. 5) → éclaire 4.7 avec une profondeur
   rarement atteinte dans les manuels de certification.

---

## Partie D — Décision de conception qui découle de ce registre

**Le contenu de l'application ne sera pas dérivé des livres. Il sera écrit pour le référentiel,
puis relié aux livres.**

Concrètement, chaque notion de l'application porte trois champs obligatoires :

```json
{
  "officialTerm": "Fail forward",
  "explanation": "...",                  // rédigée pour l'examen
  "fieldTerm": "blue/green deployment",  // synonyme du terrain, si pertinent
  "sources": [
    { "book": "DSH", "chapter": "4", "page": 56, "strength": "supporting" }
  ],
  "gap": false                            // true si aucun livre ne couvre la notion
}
```

- Si `gap: true`, l'interface l'indique : **« Notion non couverte par vos livres — rédigée pour
  l'examen »**. Aucune source n'est inventée.
- Si une source existe, l'interface affiche le livre, le chapitre et la page, avec le niveau
  de correspondance (principale / appoint).
- Si la notion est traitée sous un autre nom dans le livre, l'encadré « Terminologie d'examen »
  le signale.

C'est cette discipline qui garantit la promesse : **« Je ne prétends jamais qu'un concept provient
d'un livre si ce livre ne le contient pas. »**
