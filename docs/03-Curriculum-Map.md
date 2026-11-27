# 03 — Programme pédagogique complet (cartographie SY0-801)

**Référentiel :** CompTIA Security+ SY0-801 V8 — Exam Objectives, Document Version 2.0, © 2025
**Structure :** 5 domaines · **27 objectifs** · **716 sous-thèmes**
**Convention de pages :** pages **PDF** (voir `01-Resource-Verification.md` §2)

Légende des sources : **P** = source principale · **S** = source d'appoint · **—** = non couvert
Légende de couverture : 🟢 Solide · 🟡 Partielle · 🟠 Faible · 🔴 Absente

---

## Vue d'ensemble

| Obj. | Intitulé officiel | Dom. | Sous-thèmes | Couverture | Leçons | Schémas | Cartes | Quiz | PBQ | Scénario |
|---|---|---|---|---|---|---|---|---|---|---|
| 1.1 | Explain security concepts and controls | 1 | 16 | 🟡 | 4 | 1 | 22 | 14 | 1 | 1 |
| 1.2 | Change management impact on security | 1 | 20 | 🟠 | 2 | 1 | 16 | 10 | 1 | 1 |
| 1.3 | Appropriate cryptographic solutions | 1 | 29 | 🟠 | 5 | 2 | 30 | 18 | 1 | 1 |
| 2.1 | Characteristics of threats and vulnerabilities | 2 | 9 | 🟢 | 2 | 1 | 16 | 10 | 1 | 1 |
| 2.2 | Threat actors and motivations | 2 | 23 | 🟠 | 2 | 1 | 20 | 12 | 1 | 1 |
| 2.3 | Threat vectors and sources | 2 | 50 | 🟡 | 5 | 2 | 30 | 18 | 1 | 1 |
| 2.4 | Vulnerability types and attack surfaces | 2 | 25 | 🟠 | 3 | 1 | 22 | 14 | 1 | 1 |
| 2.5 | Indicators of malicious activity | 2 | 53 | 🟢 | 6 | 2 | 34 | 22 | 2 | 2 |
| 2.6 | Threats and vulnerabilities of AI usage | 2 | 13 | 🔴 | 2 | 1 | 16 | 12 | 1 | 1 |
| 3.1 | Architecture models | 3 | 29 | 🟢 | 4 | 1 | 24 | 16 | 1 | 1 |
| 3.2 | Manage security architecture | 3 | 21 | 🟢 | 4 | 2 | 22 | 14 | 1 | 1 |
| 3.3 | Concepts and strategies to protect data | 3 | 43 | 🟢 | 4 | 2 | 26 | 16 | 1 | 1 |
| 3.4 | Resilience and recovery | 3 | 31 | 🟡 | 4 | 1 | 24 | 16 | 1 | 1 |
| 4.1 | Mitigating controls and solutions | 4 | 44 | 🟢 | 7 | 2 | 34 | 22 | 2 | 1 |
| 4.2 | Asset management implications | 4 | 6 | 🟡 | 1 | 1 | 10 | 8 | 1 | — |
| 4.3 | Vulnerability management tasks | 4 | 12 | 🟢 | 2 | 1 | 16 | 12 | 1 | 1 |
| 4.4 | Alerting and monitoring | 4 | 25 | 🟢 | 3 | 1 | 22 | 14 | 1 | 1 |
| 4.5 | Identity and access management | 4 | 40 | 🟡 | 5 | 2 | 30 | 20 | 1 | 1 |
| 4.6 | Automation and orchestration | 4 | 25 | 🟠 | 2 | 1 | 18 | 12 | 1 | 1 |
| 4.7 | Incident response activities | 4 | 24 | 🟢 | 3 | 1 | 20 | 14 | 1 | 1 |
| 4.8 | Data and artifacts for investigations | 4 | 28 | 🟢 | 3 | 1 | 22 | 14 | 1 | 1 |
| 5.1 | Governance, risk, compliance artifacts | 5 | 23 | 🟢 | 2 | 1 | 20 | 12 | 1 | 1 |
| 5.2 | Risk management processes | 5 | 26 | 🟡 | 3 | 1 | 22 | 14 | 1 | 1 |
| 5.3 | Third-party risk | 5 | 28 | 🟠 | 2 | 1 | 18 | 12 | 1 | 1 |
| 5.4 | Security compliance | 5 | 21 | 🟠 | 2 | 1 | 16 | 12 | 1 | 1 |
| 5.5 | Audit and assessment | 5 | 32 | 🟠 | 2 | 1 | 18 | 12 | 1 | 1 |
| 5.6 | Security awareness | 5 | 20 | 🟡 | 2 | 1 | 16 | 10 | 1 | 1 |
| **Total** | | | **716** | | **86** | **~36** | **~600** | **~390** | **~30** | **~27** |

> Les volumes sont des cibles de production pour la version complète. Le prototype n'en réalise
> qu'une fraction (voir `06-Prototype-Scope.md`).

---

# DOMAINE 1 — General Security Concepts (16 %)

## 1.1 — Explain security concepts and controls.

**Sous-thèmes officiels**

- *Défense en profondeur*
- *Principes fondamentaux* : confidentialité, intégrité, disponibilité (CIA) · authentification,
  autorisation, traçabilité (AAA) · non-répudiation · principes Zero Trust · moindre privilège
- *Catégories de contrôles* : techniques/logiques · managériaux/administratifs ·
  physiques/environnementaux · opérationnels
- *Types de contrôles* : préventif · dissuasif · correctif · détectif · compensatoire · directif

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *11 Strategies* ch.1 | 47-60 | Comprendre ce qu'on protège, contexte opérationnel, données critiques |
| P | *Defensive Security Handbook* ch.1 | 23-33 | Baseline de posture, équipes, priorisation |
| S | *SOC Analyst Notes* | 11-13 | Triade CIA développée en détail |
| S | *SOC Analyst Notes* | 59-61 | Défense en profondeur (contrôles empilés) |
| S | *Defensive Security Handbook* | 133 | Moindre privilège appliqué aux comptes |
| S | *11 Strategies* ch.7 | 230-232 | Zero Trust et supervision |
| S | *Defensive Security Handbook* ch.9 | 93-101 | Contrôles physiques concrets |
| S | *11 Strategies* ch.2 | 61-70 | Autorités écrites (directif) |

**Couverture : 🟡 Partielle**
CIA, AAA, défense en profondeur, moindre privilège et Zero Trust sont bien présents.
**La taxonomie officielle « catégories × types de contrôles » n'existe dans aucun livre** —
c'est pourtant le cœur de l'objectif et une source classique de questions.

**À rédiger intégralement**
- Matrice 4 catégories × 6 types de contrôles (24 cases) avec un exemple concret par case.
- Non-répudiation : lien avec signature numérique et journalisation.
- Zero Trust : les principes, et pourquoi ce n'est pas un produit.

**Assets prévus** — 4 leçons · **1 schéma interactif** (matrice des contrôles cliquable) ·
22 flashcards · 14 questions · 1 PBQ « classer 12 contrôles » · 1 scénario « justifier le choix d'un contrôle ».

---

## 1.2 — Given a scenario, demonstrate the impact of change management processes on security.

**Sous-thèmes officiels**

- *Processus métier* : comité consultatif des changements (CAB) · processus d'approbation ·
  propriété · parties prenantes · analyse d'impact · résultats de tests · plan de retour arrière
  (backout) · *fail forward* · fenêtre de maintenance · procédures opératoires standard (SOP)
- *Implications techniques* : listes d'autorisation/refus · activités restreintes · indisponibilité ·
  redémarrage de service · redémarrage d'application · applications héritées · dépendances
- *Documentation* : mise à jour des schémas · mise à jour des politiques/procédures · gestion de versions

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *Defensive Security Handbook* ch.2 | 35-45 | Suivi des changements, documentation, source unique de vérité |
| P | *Defensive Security Handbook* ch.4 | 53-57 | Standards et procédures |
| S | *Defensive Security Handbook* | 197 | Fenêtre de maintenance |
| S | *Defensive Security Handbook* | 103-104 | Applications héritées et mises à niveau |
| S | *11 Strategies* ch.1 | 47-60 | Connaissance de l'environnement technique, dépendances |
| S | *SOC Analyst Notes* | 91, 136-168 | SOP, CAB (mentions isolées) |

**Couverture : 🟠 Faible**
Le livre couvre le *principe* du suivi de changement, mais **aucun des termes officiels structurants**
n'est traité : CAB, plan de retour arrière, *fail forward*, gestion de versions, listes d'autorisation.

**À rédiger intégralement**
- Le cycle complet d'un changement, avec un cas concret (déploiement d'un correctif sur un parc).
- Différence backout / fail forward, et critères de décision.
- Pourquoi un changement mal géré crée une vulnérabilité (fenêtre, dépendances, rollback incomplet).

**Assets prévus** — 2 leçons · **1 schéma** (flux de changement CAB) · 16 flashcards · 10 questions ·
1 PBQ « approuver ou rejeter 5 demandes de changement » · 1 scénario « le changement a cassé l'authentification ».

---

## 1.3 — Explain the importance of using appropriate cryptographic solutions.

**Sous-thèmes officiels**

- *PKI* : clé publique · clé privée · dépôt de clés (key escrow)
- *Certificats* : autorités de certification · listes de révocation (CRL) · OCSP · auto-signé ·
  tiers · racine de confiance · génération de CSR · wildcard
- *Chiffrement* : protocoles · symétrique · asymétrique · niveaux (disque complet, partition,
  fichier, volume, base de données, enregistrement) · transport/communication · échange de clés ·
  algorithmes · longueur de clé
- *Intégrité et obscurcissement* : signatures numériques · salage · outils · obfuscation · hachage

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *Defensive Security Handbook* ch.13 | 147-164 | Hachage, salage, stockage des mots de passe, chiffrement |
| S | *SOC Analyst Notes* | 172-177 | Symétrique/asymétrique, RC4, DES vs AES, échange de clés |
| S | *Defensive Security Handbook* ch.12 | 141-143 | Chiffrement disque complet |
| S | *Defensive Security Handbook* ch.14 | 170 | Protocoles chiffrés (TLS, IPsec) |
| S | *SOC Analyst Notes* | 10, 41-42 | SSL/TLS, IPsec |
| S | *SOC Analyst Notes* | 173-177 | Signature numérique (mention) |

**Couverture : 🟠 Faible**
Le hachage/salage et le chiffrement disque sont bien traités. **Tout le bloc PKI est absent** :
aucune occurrence de CRL, OCSP, CSR, key escrow, certificat auto-signé ou wildcard dans les quatre livres.
Les niveaux de chiffrement (base de données, enregistrement, volume, partition) sont absents.

**À rédiger intégralement**
- Chaîne de confiance PKI de bout en bout : CSR → CA → certificat → validation → révocation.
- Symétrique vs asymétrique : quand utiliser quoi, et pourquoi TLS fait les deux.
- Hachage vs chiffrement vs encodage vs obfuscation — la confusion la plus fréquente en examen.
- Salage, et pourquoi un hash non salé est cassable par table arc-en-ciel.
- Signature numérique : intégrité + authenticité + non-répudiation.
- Longueur de clé et algorithmes (AES-128/256, RSA-2048/3072, ECC-256, SHA-256/384).

**Assets prévus** — 5 leçons · **2 schémas interactifs** (chaîne PKI ; chiffrement symétrique vs asymétrique) ·
30 flashcards · 18 questions · 1 PBQ « construire une chaîne de confiance » · 1 scénario « le certificat a expiré ».

---

# DOMAINE 2 — Threats, Vulnerabilities, and Attacks (24 %)

## 2.1 — Explain characteristics of threats and vulnerabilities.

**Sous-thèmes officiels**

- *Menaces* : flux de renseignement (threat feeds) · probabilité · impact · sources de renseignement ·
  cycle de vie
- *Vulnérabilités* : notation CVSS · priorisation · types de vulnérabilités · CVE

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *11 Strategies* ch.6 | 171-197 | CTI : objectifs, planification, produits, défis |
| P | *Defensive Security Handbook* ch.16 | 191-200 | Priorisation, CVSS, acceptation du risque |
| S | *SOC Analyst Notes* | 191-200 | Flux de threat intelligence, IOC/IOA |
| S | *SOC Analyst Notes* | 162-163 | CVSS, CVE, CWE, NVD |
| S | *11 Strategies* ch.1 | 59-60 | Compréhension de la menace |

**Couverture : 🟢 Solide**
Bon recouvrement. Le **cycle de vie de la menace** est le seul sous-thème réellement absent.

**À rédiger**
- Cycle de vie de la menace (reconnaissance → armement → livraison → exploitation → installation →
  C2 → actions), et son lien avec le Cyber Kill Chain.
- Lecture d'un score CVSS (base, temporel, environnemental) et priorisation pratique.

**Assets prévus** — 2 leçons · 1 schéma (cycle de vie) · 16 flashcards · 10 questions · 1 PBQ CVSS.

---

## 2.2 — Describe common threat actors and motivations.

**Sous-thèmes officiels**

- *Acteurs* : crime organisé · terroriste · attaquant non qualifié · hacktiviste · interne ·
  accidentel/involontaire · concurrent · étatique
- *Motivations* : financière · influence · propriété intellectuelle · notoriété · espionnage ·
  peur/chaos · extorsion · curiosité · vengeance · idéologique · politique · éthique
- *Attributs* : interne/externe · ressources/financement · niveau de sophistication/capacité

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *11 Strategies* ch.6 | 171-197 | Compréhension de l'adversaire, attribution |
| S | *SOC Analyst Notes* | 227-231 | Menace interne vs externe |
| S | *Defensive Security Handbook* | 15, 89 | Mentions hacktiviste, crime organisé, étatique |
| S | *SOC Analyst Notes* | 15, 97 | Mention « threat actor » |

**Couverture : 🟠 Faible**
**16 des 23 sous-thèmes ne sont jamais nommés** dans les quatre livres. Aucune typologie structurée
des acteurs, aucune matrice motivations × acteurs.

**À rédiger intégralement**
- Les 8 profils d'acteurs : capacités, ressources, motivations typiques, exemples d'attaque.
- Les 12 motivations, avec le type d'acteur auquel elles s'associent.
- Les 3 attributs et leur effet sur la stratégie de défense.
- Notion d'attribution et ses limites.

**Assets prévus** — 2 leçons · **1 schéma** (matrice acteurs × motivations) · 20 flashcards ·
12 questions · 1 PBQ « profiler 5 incidents » · 1 scénario « qui est derrière ? ».

---

## 2.3 — Describe threat vectors and sources.

**Sous-thèmes officiels**

- APT
- *Messagerie* : e-mail · SMS · RCS · messagerie instantanée · outils collaboratifs
- *Image* : QR codes · contenu embarqué · CAPTCHA
- *Pièces jointes* : macros · RTF · PDF
- *Navigateur* : extensions · JavaScript · gestionnaires de mots de passe · cookies · jetons de session
- *Réseau* : équipements d'infrastructure · équipements virtualisés · clés de session
- *Accès distant* : bureau à distance · VNC · VPN
- *Point de terminaison* : mobiles · postes · serveurs · tablettes · appareils de confiance ·
  outils intégrés · outils « living off the land »
- *Chaîne d'approvisionnement* : fournisseurs tiers · MSP · prestataires logistiques · fournisseurs SaaS
- *Support externe* : USB malveillant
- *Humain* : usurpation · contractuel · visiteur · biométrie · watering hole
- *IoT* : caméras · capteurs · imprimantes
- *OT* · *Physique* : serrure et clé · sas d'accès · badges
- *Signal* : Bluetooth · RF · NFC

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *SOC Analyst Notes* | 65-100 | Cyber Kill Chain, reconnaissance, vecteurs de phishing |
| P | *11 Strategies* ch.6 | 171-197 | APT, adversaires, modes d'intrusion |
| S | *Defensive Security Handbook* ch.9 | 93-101 | Vecteurs physiques : badges, visiteurs, contractuels |
| S | *Defensive Security Handbook* | 26-30 | Phishing, cas d'usage |
| S | *SOC Analyst Notes* | 59-61 | E-mail comme vecteur |
| S | *Defensive Security Handbook* ch.12 | 135-146 | Vecteurs endpoint et mobiles |
| S | *Networking Fundamentals* | 12-14 | DMZ et zones exposées |

**Couverture : 🟡 Partielle**
Bonne couverture des vecteurs « classiques » (e-mail, phishing, USB, humain, physique).
**Absents des quatre livres** : QR/quishing, deepfake, watering hole, NFC, VNC, jetons de session,
macros, outils LOLBin, MSP, prestataires logistiques, sas d'accès.

**À rédiger intégralement**
- Cartographie complète des 14 familles de vecteurs, avec un exemple d'attaque par famille.
- Vecteurs modernes : quishing, deepfake vocal, attaque par la chaîne d'approvisionnement logicielle.
- Living off the land : pourquoi les outils natifs sont privilégiés par les attaquants.
- Vecteurs signal (Bluetooth/RF/NFC) et leur surface réelle.

**Assets prévus** — 5 leçons · **2 schémas** (carte des surfaces d'attaque ; chaîne d'approvisionnement) ·
30 flashcards · 18 questions · 1 PBQ « identifier le vecteur » · 1 scénario « intrusion par un prestataire ».

---

## 2.4 — Explain types of vulnerabilities and attack surfaces.

**Sous-thèmes officiels**

- *Systèmes* : produits non supportés · systèmes non corrigés · systèmes obsolètes · systèmes non gérés ·
  ports et services · vulnérabilités OS · virtualisation · zero-day · vulnérabilités cryptographiques
- *Applications et code* : conditions de concurrence (TOC/TOU) · mise à jour malveillante ·
  secrets codés en dur · gestion d'exception non sûre
- *Identité, appareils, configuration* : identifiants non gérés/obsolètes · appareils pirates ·
  shadow IT · fournisseurs d'identité · appareils mobiles · mauvaise configuration
- *Surfaces modernes* : communications sans fil et à faible énergie · LLM · dépôts publics ·
  stockage objet public

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *Defensive Security Handbook* ch.16 | 191-200 | Absence de correctifs, mauvaises configurations, comptes par défaut |
| P | *Defensive Security Handbook* ch.17 | 201-208 | Code : tests statiques/dynamiques, revue, SDLC |
| S | *Defensive Security Handbook* ch.11 | 123-133 | Systèmes obsolètes, mises à jour |
| S | *Defensive Security Handbook* ch.15 | 177-189 | Segmentation comme réduction de surface |
| S | *SOC Analyst Notes* | 162-170 | Scan de ports, services exposés |
| S | *Networking Fundamentals* | 15-20 | Ports et services |

**Couverture : 🟠 Faible**
Les vulnérabilités « d'exploitation » (patch, configuration) sont bien traitées.
**Absents** : conditions de concurrence, secrets codés en dur, gestion d'exception, shadow IT,
fournisseurs d'identité, LLM, dépôts publics, stockage objet public, mise à jour malveillante.

**À rédiger intégralement**
- Les 4 familles de vulnérabilités, avec un exemple par sous-thème.
- TOC/TOU expliqué simplement (avec un schéma de chronologie).
- Pourquoi le stockage objet public et les dépôts publics sont les fuites n°1 du cloud.
- Vulnérabilités propres aux LLM (renvoi vers 2.6).

**Assets prévus** — 3 leçons · 1 schéma (surface d'attaque en couches) · 22 flashcards · 14 questions ·
1 PBQ « classer 10 vulnérabilités » · 1 scénario « le bucket S3 est public ».

---

## 2.5 — Given a scenario, analyze indicators of malicious activity.

**Sous-thèmes officiels**

- *Malwares* : rançongiciel · cheval de Troie · ver · logiciel espion · adware · virus · rootkit ·
  keylogger · bombe logique · malware sans fichier
- *Attaques physiques* : tailgating · shoulder surfing · skimming · entrée forcée
- *Attaques réseau* : DDoS · rétrogradation de protocole · appareil pirate · sniffing · usurpation ·
  attaque on-path · attaques DNS · empoisonnement de cache
- *Ingénierie sociale* : smishing · vishing · phishing · whaling · spear phishing · quishing ·
  usurpation · deepfake
- *Indicateurs de compromission* : hash · adresse IP · domaine · processus malveillants ·
  artefacts du système de fichiers · horodatage · manipulation de journaux · consommation excessive
  de ressources · chaînes en clair · verrouillage de compte · déplacement impossible · sessions simultanées
- *Attaques applicatives* : injection · débordement de tampon · rejeu · élévation de privilèges ·
  falsification · traversée de répertoire
- *Attaques d'identifiants* : pulvérisation de mots de passe · force brute · énumération d'utilisateurs ·
  rejeu · contournement MFA

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *SOC Analyst Notes* | 65-125 | Kill Chain, MITM, mouvement latéral, sévérité des alertes |
| P | *Defensive Security Handbook* ch.6 | 67-74 | Détection, analyse, outils |
| S | *Defensive Security Handbook* ch.19 | 237-245 | Détection par signatures, bruit |
| S | *11 Strategies* ch.7 | 191-224 | Détection d'intrusion, supervision réseau |
| S | *SOC Analyst Notes* | 177-183 | OWASP, XSS, SQLi |
| S | *SOC Analyst Notes* | 249-263 | Investigation de malware, drive-by download |
| S | *SOC Analyst Notes* | 273-277 | DoS/DDoS, vrai positif |
| S | *Networking Fundamentals* | 28-31 | Triage d'alerte réseau |

**Couverture : 🟢 Solide** (la meilleure des quatre livres pour cet objectif)
**Absents** : malware sans fichier, quishing, deepfake, attaque on-path (le livre dit MITM),
rétrogradation de protocole, traversée de répertoire, pulvérisation de mots de passe,
déplacement impossible, manipulation de journaux, chaînes en clair, consommation excessive.

**À rédiger**
- Les 12 indicateurs de compromission, avec un exemple de valeur observée pour chacun.
- Distinction IOC (artefact) vs IOA (comportement).
- Les 6 attaques applicatives, avec une requête ou un symptôme concret.
- Attaques d'identifiants : différence pulvérisation / force brute / énumération / rejeu / bypass MFA.

**Assets prévus** — 6 leçons · **2 schémas** (chaîne d'attaque de bout en bout ; arbre de décision IOC) ·
34 flashcards · 22 questions · **2 PBQ** (triage de 8 alertes ; corrélation de journaux) ·
2 scénarios (rançongiciel ; compromission de compte).

---

## 2.6 — Summarize threats and vulnerabilities associated with artificial intelligence (AI) usage.

**Sous-thèmes officiels**

- *Modèle* : manipulation de modèle · empoisonnement (poisoning) · injection de prompt ·
  jailbreaking · évasion
- *Données et sorties* : perte de données · biais · explicabilité · hallucinations · vie privée ·
  considérations éthiques
- *Plateforme* : détournement de session · exécution de code

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| S | *Defensive Security Handbook* | 231, 241 | Mentions LLM et IA générative (contexte outils) |
| S | *11 Strategies* ch.6 | 167 | Mention « jailbreak » (contexte LLM) |
| S | *SOC Analyst Notes* | 112, 189 | Mentions « artificial intelligence », apprentissage automatique |

**Couverture : 🔴 Absente**
Aucun des quatre livres ne traite cet objectif. C'est **la plus grande lacune du corpus** et
pourtant **13 sous-thèmes explicitement exigibles**, plus 4 sous-thèmes IA dans 4.6 et LLM dans 2.4.

**À rédiger intégralement** (contenu original, sourcé sur des références publiques : OWASP Top 10 for LLM
Applications, NIST AI RMF)
- Comment fonctionne un LLM, en 1 page, pour comprendre les attaques.
- Empoisonnement des données d'entraînement vs empoisonnement du modèle déployé.
- Injection de prompt : directe, indirecte, et via documents/pièces jointes.
- Jailbreaking vs injection : différence d'objectif.
- Évasion de détection (adversarial examples).
- Hallucination, biais, explicabilité : risques métier et comment les mitiger.
- Fuite de données via prompts, journaux de conversations, et fournisseurs tiers.
- Détournement de session et exécution de code dans les agents/plugins.

**Assets prévus** — 2 leçons · **1 schéma** (chaîne d'attaque d'un système IA) · 16 flashcards ·
12 questions · 1 PBQ « auditer un assistant IA interne » · 1 scénario « injection de prompt via un CV ».

---

# DOMAINE 3 — Security Architecture (19 %)

## 3.1 — Compare and contrast security implications of different architecture models.

**Sous-thèmes officiels**

- *Concepts* : cloud · serverless · multicloud · modèles de déploiement (hybride, privé, public,
  communautaire) · Infrastructure as Code · OT · sur site · réseau isolé (air-gapped) ·
  microservices · segmentation logique · segmentation physique
- *Considérations techniques* : disponibilité · résilience · propriétaire vs open source · ergonomie ·
  responsabilité · calcul · besoins électriques · facilité de récupération
- *Considérations métier* : souveraineté des données · classification · coût · propriété ·
  exigences environnementales · scalabilité · risque

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *11 Strategies* ch.7 | 225-234 | Cloud, Zero Trust, OT, instrumentation |
| P | *Defensive Security Handbook* ch.15 | 177-189 | Segmentation physique et logique, SDN, microsegmentation |
| S | *Networking Fundamentals* | 2-14 | Équipements, LAN/WAN, DMZ, zones |
| S | *SOC Analyst Notes* | 1-3, 58-59 | LAN/WAN/MAN, datacenter, architecture 3-tiers |
| S | *Defensive Security Handbook* | 36, 104 | Réseau isolé |
| S | *11 Strategies* | 56, 326 | Serverless |

**Couverture : 🟢 Solide**
Bon recouvrement conceptuel. **Absents** : multicloud, cloud communautaire, IaC, microservices,
propriétaire vs open source, besoins électriques, facilité de récupération.

**À rédiger**
- Tableau comparatif des 4 modèles de déploiement cloud (contrôle, coût, conformité, risque).
- Modèle de responsabilité partagée.
- Segmentation logique vs physique : quand l'une ne suffit pas.
- OT vs IT : pourquoi les priorités divergent.

**Assets prévus** — 4 leçons · **1 schéma** (comparateur d'architectures interactif) · 24 flashcards ·
16 questions · 1 PBQ « choisir l'architecture » · 1 scénario « migration vers le cloud ».

---

## 3.2 — Given a scenario, manage the security architecture to best protect the infrastructure.

**Sous-thèmes officiels**

- *Infrastructure* : placement des équipements · zones de sécurité · surface d'attaque · diversité
- *Zero Trust* : authentification utilisateur · gestion des appareils (santé, inventaire) ·
  contrôle d'accès applicatif
- *Communication et accès sécurisés* : VPN · accès distant · tunneling · gestion des utilisateurs ·
  accès utilisateur (moindre privilège) · messagerie chiffrée de bout en bout · gestion hors bande ·
  transfert de fichiers · Security Service Edge
- *Gestion des identités* : gMSA · comptes à privilèges minimaux · dérive des privilèges
- *Modes de défaillance*

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *Defensive Security Handbook* ch.15 | 177-189 | Zones, segmentation, rôles |
| P | *Networking Fundamentals* | 12-14 | DMZ, zones de confiance |
| P | *11 Strategies* ch.7 | 230-234 | Supervision en Zero Trust |
| S | *Defensive Security Handbook* ch.14 | 165-175 | Réseau d'administration, gestion hors bande |
| S | *Defensive Security Handbook* | 133, 275 | Moindre privilège |
| S | *11 Strategies* | 249-300 | Moindre privilège, JIT |

**Couverture : 🟢 Solide**
**Absents** : Security Service Edge (SSE), gMSA, dérive des privilèges, modes de défaillance,
santé/inventaire des appareils, messagerie chiffrée de bout en bout.

**À rédiger**
- Conception en zones : Internet → DMZ → utilisateurs → serveurs → critique.
- Zero Trust en pratique : identité, appareil, application, réseau, données.
- Modes de défaillance : fail-open vs fail-closed, et conséquences.
- SSE : passerelle web sécurisée, CASB, ZTNA — et différence avec SASE.

**Assets prévus** — 4 leçons · **2 schémas** (zones de sécurité ; flux Zero Trust) · 22 flashcards ·
14 questions · 1 PBQ « placer 8 équipements » · 1 scénario « le pare-feu a échoué en mode ouvert ».

---

## 3.3 — Summarize concepts and strategies used to protect data.

**Sous-thèmes officiels**

- *Types* : structuré · non structuré
- *États* : au repos · en cours d'utilisation · en transit
- *Classifications* : sensible · secret · critique · confidentiel · public · très secret · restreint
- *Méthodes* : masquage · hachage · filtrage · tokenisation · chiffrement · transposition ·
  désidentification · obfuscation
- *Rôles* : propriétaire · dépositaire · intendant (steward) · opérateur · responsable de traitement
  (controller) · sous-traitant (subprocessor)
- *Traitement* : points de terminaison · marquage et étiquetage · géorepérage · localisation ·
  placement
- *Cycle de vie* : création · gestion · distribution · conservation · destruction
- *Conformité* : normes · données de santé · informations personnelles · financières · mineurs ·
  propriété intellectuelle · données juridiques

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *Defensive Security Handbook* ch.2 | 35-45 | Classification de l'information, cycle de vie |
| P | *11 Strategies* ch.1 | 47-60 | Connaissance des données critiques, classification |
| S | *SOC Analyst Notes* | 50-53, 113-121 | Classification des données |
| S | *Defensive Security Handbook* | 81-82, 271 | Données au repos, en transit |
| S | *Defensive Security Handbook* ch.13 | 151-152 | Hachage et salage comme protection |
| S | *Defensive Security Handbook* ch.8 | 83-91 | Exigences de conformité par secteur |

**Couverture : 🟢 Solide**
Très bon sur classification, états et cycle de vie.
**Absents** : tokenisation, masquage de données, désidentification, transposition, géorepérage,
marquage/étiquetage, les 6 rôles officiels, classification « très secret », données des mineurs.

**À rédiger**
- Les 6 rôles de protection des données, avec qui fait quoi dans une entreprise réelle.
- Les 8 méthodes de sécurisation, avec la différence masquage / tokenisation / pseudonymisation /
  anonymisation / hachage.
- Le cycle de vie en 5 étapes, avec les contrôles par étape.
- Géorepérage et localisation des données (enjeu cloud/souveraineté).

**Assets prévus** — 4 leçons · **2 schémas** (états × méthodes ; cycle de vie des données) ·
26 flashcards · 16 questions · 1 PBQ « choisir la méthode de protection » · 1 scénario « fuite de données RH ».

---

## 3.4 — Explain the importance of resilience and recovery in security architecture.

**Sous-thèmes officiels**

- *Sites* : chaud · froid · tiède · considérations environnementales
- *Diversité de plateforme* : fournisseur · matériel · virtualisation
- *Redondance* : équilibrage de charge · clustering · autoscaling · haute disponibilité ·
  systèmes multicloud · alimentation (UPS, RPS, groupe électrogène, parasurtenseur) · stockage
- *Sauvegardes* : conservation · immuabilité · périmètre · test de restauration
- *Tests* : bascule (failover) · simulation · traitement parallèle
- *Continuité* : reprise après sinistre · continuité d'activité · planification de capacité
- *Métriques* : RTO · RPO · MTTR · MTBF

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *Defensive Security Handbook* ch.7 | 75-82 | RPO/RTO, sauvegardes, warm standby, HA, site alternatif, tests |
| S | *Defensive Security Handbook* | 78 | Clustering, haute disponibilité |
| S | *11 Strategies* ch.10 | 321-337 | Métriques (MTTR) |
| S | *11 Strategies* | 373 | Site chaud |
| S | *SOC Analyst Notes* | 20, 167 | MTTR |
| S | *SOC Analyst Notes* | 168-186 | Continuité d'activité, reprise |

**Couverture : 🟡 Partielle**
RTO/RPO, sauvegardes, HA, équilibrage de charge bien traités.
**Absents** : sites froid et tiède (le livre parle de *warm standby* et de *site alternatif* sans la
taxonomie officielle), autoscaling, MTBF, immuabilité des sauvegardes, périmètre de sauvegarde,
test de restauration, diversité matérielle/virtualisation, parasurtenseur, redondance de stockage.

**À rédiger**
- Les 3 types de sites, avec coût / délai de bascule / équipement.
- RTO vs RPO vs MTTR vs MTBF : définitions et calcul, avec une frise chronologique.
- Immuabilité des sauvegardes comme défense anti-rançongiciel.
- Diversité de plateforme : pourquoi ne pas mettre tous ses œufs dans le même fournisseur.

**Assets prévus** — 4 leçons · **1 schéma** (frise RTO/RPO interactive) · 24 flashcards · 16 questions ·
1 PBQ « dimensionner la reprise » · 1 scénario « l'UPS a tenu 12 minutes ».

---

# DOMAINE 4 — Security Operations (27 %)

## 4.1 — Given a scenario, apply mitigating controls, techniques, and solutions to secure the environment.

**Sous-thèmes officiels**

- Segmentation · contrôles d'accès · durcissement · sandboxing
- *Tromperie et perturbation* : honeypot · honeynet · honeyfile · honeytoken · compte canari
- Supervision/alertes · MDM · contrôle applicatif (listes d'autorisation, listes de refus)
- *IDS/IPS* : NIDS/NIPS · HIDS/HIPS · WIPS
- *Pare-feu* : limitation de débit · WAF · à base de règles · UTM · couche 4/couche 7
- *Filtrage de contenu* : DLP · basé agent · proxy centralisé
- *Sécurité endpoint* : EDR · XDR · antivirus
- *Contrôle d'accès réseau* : portails captifs · 802.1X · posture de conformité du poste
- *Dépôts* : analyse de secrets
- *Sécurité applicative* : validation des entrées · cookies sécurisés · analyse statique · signature de code
- *Sécurité e-mail* : DMARC · SPF · DKIM · BIMI
- *Sécurité OS* : Group Policy · SELinux

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *Defensive Security Handbook* ch.10-15 | 103-189 | Durcissement Windows/Unix/endpoint/réseau, segmentation |
| P | *Defensive Security Handbook* ch.19 | 237-245 | NIDS/HIDS/IPS, signatures, emplacement |
| P | *SOC Analyst Notes* | 4-16, 151-158 | EDR/AV/HIDS/HIPS/NGFW/WAF/NIDS/NIPS, WAF vs NGFW, portail captif |
| S | *11 Strategies* ch.11 | 339-356 | Tromperie, honeypot, honeytoken |
| S | *Defensive Security Handbook* ch.17 | 201-208 | Validation, tests statiques, signature |
| S | *SOC Analyst Notes* | 47-52 | SPF, DKIM, DMARC |
| S | *Defensive Security Handbook* | 132 | SELinux |
| S | *Defensive Security Handbook* | 110-111 | Group Policy |

**Couverture : 🟢 Solide** (objectif le mieux couvert des quatre livres)
**Absents** : honeynet, honeyfile, compte canari, limitation de débit, pare-feu L4/L7 explicite,
DLP basé agent, proxy centralisé, analyse de secrets, cookies sécurisés, BIMI, posture de conformité.

**À rédiger**
- Le principe du « bon contrôle au bon endroit » : préventif/détectif/correctif par couche.
- Familles de pare-feu : paquet, état, applicatif (WAF), UTM, NGFW.
- Défense e-mail complète : SPF → DKIM → DMARC → BIMI (chaîne de confiance e-mail).
- Tromperie : honeypot vs honeynet vs honeytoken vs compte canari.
- NAC : 802.1X, portail captif, posture.

**Assets prévus** — 7 leçons · **2 schémas** (pile de défense en profondeur ; chaîne e-mail) ·
34 flashcards · 22 questions · **2 PBQ** (composer une architecture de défense ; configurer SPF/DKIM/DMARC) ·
1 scénario « l'attaquant a contourné le WAF ».

---

## 4.2 — Explain the security implications of proper hardware, software, and data asset management.

**Sous-thèmes officiels**

- Cycle de vie de la gestion des actifs · planification/périmètre · acquisition/approvisionnement ·
  affectation/comptabilisation · supervision/suivi · destruction/décommissionnement

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *Defensive Security Handbook* ch.2 | 35-45 | Cycle de vie, collecte d'informations, suivi, reporting |
| S | *11 Strategies* ch.1 | 47-60 | Connaissance de l'environnement, inventaire |
| S | *Defensive Security Handbook* | 271 | Décommissionnement et destruction |
| S | *Defensive Security Handbook* | 37 | Destruction des supports |

**Couverture : 🟡 Partielle**
Le livre couvre le cycle en substance mais **n'utilise jamais la terminologie officielle**
(planification/périmètre, acquisition, affectation, comptabilisation). C'est un problème direct
pour l'examen.

**À rédiger**
- Les 6 étapes officielles, avec les contrôles de sécurité de chaque étape.
- Pourquoi l'inventaire est la base de tout : sans inventaire, pas de gestion des vulnérabilités.
- Décommissionnement : effacement certifié, révocation des licences et des accès.

**Assets prévus** — 1 leçon · 1 schéma (cycle de vie) · 10 flashcards · 8 questions · 1 PBQ « cycle de vie ».

---

## 4.3 — Given a scenario, perform tasks associated with vulnerability management.

**Sous-thèmes officiels**

- *Identification* : scan · IPAM · CSPM · revue de code source
- *Priorisation* : évaluation de sévérité · revue de rapport de test d'intrusion
- *Remédiation* · *Vérification*
- *Rapports* : interne · externe (programme de primes, politique de divulgation responsable)

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *Defensive Security Handbook* ch.16 | 191-200 | Scan authentifié/non authentifié, programme, priorisation, acceptation |
| P | *11 Strategies* ch.7 | 179-191 | Sélection des données, scans |
| S | *SOC Analyst Notes* | 161-171 | Scan de ports, sévérité, pentest |
| S | *11 Strategies* ch.11 | 328-337 | Red team, revue de rapport |
| S | *SOC Analyst Notes* | 181 | Bug bounty |

**Couverture : 🟢 Solide**
**Absents** : CSPM, revue de code source, politique de divulgation responsable, évaluation formelle
de sévérité.

**À rédiger**
- Le cycle complet : identifier → prioriser → remédier → vérifier → rapporter.
- Priorisation au-delà du CVSS : exploitabilité, exposition, criticité métier.
- CSPM : ce que le scan classique ne voit pas dans le cloud.
- Divulgation responsable vs bug bounty.

**Assets prévus** — 2 leçons · 1 schéma (cycle de gestion) · 16 flashcards · 12 questions ·
1 PBQ « prioriser 10 CVE » · 1 scénario « le scan est terminé, et après ? ».

---

## 4.4 — Explain security alerting and monitoring concepts and tools.

**Sous-thèmes officiels**

- *Ressources supervisées* : systèmes · applications · infrastructure
- *Activités* : agrégation de journaux · alerte · scan · archivage · reporting · réglage des alertes
- *Outils* : référentiels (benchmarks) · agent/agentless · SIEM · antivirus · DLP · scanners de
  vulnérabilités · orchestration · analyseur de paquets
- *Protocoles et télémétrie* : NetFlow · SNMP · syslog · SCAP · alertes automatisées ·
  miroir de port · tableaux de bord · systèmes de gestion réseau

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *Defensive Security Handbook* ch.20 | 247-254 | Que journaliser, SIEM, analyse, agrégation, cas d'usage |
| P | *11 Strategies* ch.7 | 199-257 | Planification de collecte, supervision hôte/réseau/cloud/OT |
| P | *11 Strategies* ch.8 | 261-302 | SIEM, UEBA, gestion de cas, SOAR |
| S | *SOC Analyst Notes* | 191-248 | SIEM, normalisation, parsing, Splunk, QRadar, corrélation |
| S | *Defensive Security Handbook* | 178 | NetFlow |
| S | *SOC Analyst Notes* | 11, 205 | Syslog, journaux Windows/Linux/pare-feu |
| S | *Networking Fundamentals* | 21-27 | Commandes de vérification |

**Couverture : 🟢 Solide** (objectif le mieux couvert tous livres confondus)
**Absents** : réglage des alertes (alert tuning), IPFIX, SCAP (mentionné sans développement),
miroir de port (le livre parle de SPAN), agent vs agentless, supervision d'infrastructure.

**À rédiger**
- La chaîne : source → collecte → normalisation → corrélation → alerte → triage → escalade.
- Que journaliser et pendant combien de temps.
- Réglage des alertes : réduire les faux positifs sans créer de faux négatifs.
- SCAP, benchmarks CIS, et automatisation de la conformité.

**Assets prévus** — 3 leçons · 1 schéma (pipeline SIEM interactif) · 22 flashcards · 14 questions ·
1 PBQ « construire une règle de corrélation » · 1 scénario « 400 alertes par jour ».

---

## 4.5 — Given a scenario, apply concepts related to identity and access management.

**Sous-thèmes officiels**

- Provisioning/déprovisioning · attribution des permissions · preuve d'identité
- Fédération · SSO (SAML, LDAP, OAuth)
- *Types de comptes* : utilisateur · privilégié (global, local) · service · tiers · accès d'urgence
- *MFA* : jeton matériel · jeton logiciel · biométrie · OTP · code de secours
- *Modèles de contrôle d'accès* : basé règles · basé rôles · basé temps · obligatoire · discrétionnaire ·
  juste-à-temps
- Gestion des accès (authentification, politiques logiques/administratives) · revue des accès
- *Mots de passe* : passkey · gestionnaires · sans mot de passe · longueur · complexité · réutilisation ·
  expiration · âge · surveillance des identifiants compromis · audit des comptes · rapport de politique

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *Defensive Security Handbook* ch.13 | 147-164 | Politiques de mots de passe, hachage, MFA/2FA, menaces |
| P | *Defensive Security Handbook* ch.10 | 103-120 | Active Directory : forêt, domaine, OU, groupes, comptes, GPO |
| S | *11 Strategies* ch.8 | 263-265 | UEBA, comportement utilisateur |
| S | *11 Strategies* | 249-300 | Moindre privilège, JIT |
| S | *Defensive Security Handbook* | 162, 276 | OAuth (mention) |
| S | *SOC Analyst Notes* | 51, 121 | RBAC (mention) |
| S | *Networking Fundamentals* | 19-20 | LDAP, LDAPS |

**Couverture : 🟡 Partielle**
Mots de passe, MFA, AD et RBAC sont bien traités.
**Absents (20 des 40 sous-thèmes)** : fédération, SSO, SAML, provisioning/déprovisioning formel,
preuve d'identité, MAC, DAC, contrôle basé temps, JIT, passkey, sans mot de passe, revue des accès,
surveillance des identifiants compromis, audit des comptes, comptes d'urgence, jetons matériels/logiciels.

**À rédiger**
- Le cycle de vie d'une identité, de la preuve d'identité au déprovisioning.
- Fédération et SSO : SAML vs OAuth vs OIDC vs LDAP — le tableau qui manque partout.
- Les 6 modèles de contrôle d'accès, avec un exemple par modèle.
- MFA : facteurs, résistance au phishing, et pourquoi le SMS est faible.
- Passkeys/WebAuthn : ce qui change vraiment.

**Assets prévus** — 5 leçons · **2 schémas** (flux de fédération SSO ; matrice des modèles d'accès) ·
30 flashcards · 20 questions · 1 PBQ « auditer les accès d'un départ » · 1 scénario « le compte de service ».

---

## 4.6 — Given a scenario, apply automation and orchestration solutions to secure operations.

**Sous-thèmes officiels**

- *Cas d'usage* : provisioning utilisateur · provisioning de ressources · gestion d'état désiré ·
  détection d'anomalies · gestion des tickets
- *Considérations* : garde-fous · logique d'automatisation · ingénierie des processus · complexité ·
  financier · risques de processus · déploiement
- *IA* : agentique · chatbot · analyse prédictive · lignes de base augmentées par IA
- *Résultats attendus* : efficacité/gain de temps · application des lignes de base · amélioration
  continue · productivité · réduction des interruptions · proactivité
- *SecOps* : CI/CD · workflows (automatisation, intégrations)

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *11 Strategies* ch.8 | 270-274 | SOAR : automatisation, orchestration, réponse |
| S | *11 Strategies* ch.8 | 265-270 | Gestion de cas |
| S | *SOC Analyst Notes* | 197-296 | SOAR, workflows, orchestration (mentions) |
| S | *Defensive Security Handbook* ch.17 | 201-208 | SDLC, CI/CD indirect |

**Couverture : 🟠 Faible**
SOAR est décrit, mais **aucun cas d'usage officiel**, **aucune considération de risque**, et
**rien sur l'IA agentique, les chatbots, l'analyse prédictive ou les lignes de base augmentées**.

**À rédiger intégralement**
- Les 5 cas d'usage, avec un exemple de playbook par cas.
- Garde-fous : pourquoi l'automatisation sans garde-fou est un risque majeur.
- Risques de processus : automatiser un mauvais processus le rend plus rapide, pas meilleur.
- IA en SecOps : agentique vs chatbot vs prédictif — et les limites.
- CI/CD sécurisé : ce que l'objectif attend réellement.

**Assets prévus** — 2 leçons · 1 schéma (chaîne d'automatisation) · 18 flashcards · 12 questions ·
1 PBQ « concevoir un playbook » · 1 scénario « le playbook a isolé le mauvais serveur ».

---

## 4.7 — Summarize concepts associated with incident response activities.

**Sous-thèmes officiels**

- *Préparation* : formation · tests · exercices tabletop · playbooks · simulation · rôles
- *Identification* : détection · avis interne · avis externe · threat hunting
- *Investigation* : forensics numérique · chaîne de possession · e-discovery · préservation
- *Confinement* : quarantaine/isolement · négociation · éradication/relevage
- *Notification* : parties prenantes · clients · forces de l'ordre · obligations légales
- *Post-incident* : leçons apprises · analyse de cause racine · rapport post-incident (PIR)

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *11 Strategies* ch.5 | 145-169 | Cycle complet NIST, cloud, mobile, OT |
| P | *Defensive Security Handbook* ch.6 | 67-74 | Processus pré/pendant/post, outils |
| S | *11 Strategies* ch.11 | 352-356 | Exercices tabletop |
| S | *11 Strategies* ch.11 | 319-328 | Threat hunting |
| S | *SOC Analyst Notes* | 249-263 | Investigation, cause racine |
| S | *Defensive Security Handbook* ch.1 | 28-31 | Cas d'usage, tabletop, drills |
| S | *11 Strategies* ch.11 | 348-352 | Forensics numérique |

**Couverture : 🟢 Solide** (le meilleur objectif couvert par MITRE)
**Absents** : négociation, obligations légales de notification, e-discovery (une seule mention),
préservation formelle, chaîne de possession détaillée.

**À rédiger**
- Le cycle en 7 phases avec les livrables de chaque phase.
- Rôles de l'équipe IR et matrice RACI.
- Confinement : pourquoi la décision la plus difficile est « contenir maintenant ou observer encore ».
- Négociation (rançongiciel) : cadre juridique et éthique.
- Notification : qui, quand, comment (RGPD 72 h, secteurs régulés).

**Assets prévus** — 3 leçons · **1 schéma interactif** (cycle IR cliquable) · 20 flashcards ·
14 questions · 1 PBQ « ordonner les actions IR » · 1 scénario tabletop « rançongiciel J+0 à J+30 ».

---

## 4.8 — Given a scenario, use data, artifacts and sources to support a security investigation.

**Sous-thèmes officiels**

- *Types de journaux et traces* : accès et comptabilité (logique, physique) · appareil · serveur ·
  application · authentification · communication · audit · endpoint · réseau · métadonnées
- *Sources* : scans de vulnérabilités · rapports automatisés · NetFlow/IPFIX · vidéosurveillance ·
  outils de sécurité · tableaux de bord · captures de paquets
- Intégrité des fichiers/journaux · image système (dump mémoire, copie bit à bit, snapshot)
- *Parties prenantes* : RH · comptabilité · juridique · techniques d'analyse de journaux

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *Defensive Security Handbook* ch.6 | 67-74 | Analyse log/disque/mémoire/PCAP |
| P | *Defensive Security Handbook* ch.20 | 247-254 | Analyse de journaux, agrégation |
| P | *11 Strategies* ch.7 | 179-237 | Sources de données, capteurs, rétention |
| S | *SOC Analyst Notes* | 190-215 | Journaux Windows/Linux/pare-feu, normalisation, parsing |
| S | *SOC Analyst Notes* | 270-273 | Types de journaux Windows |
| S | *Networking Fundamentals* | 21-31 | Commandes et investigation réseau |
| S | *11 Strategies* ch.11 | 343-352 | Analyse de malware, forensics |

**Couverture : 🟢 Solide**
**Absents** : IPFIX, vidéosurveillance, copies bit à bit, intégrité des journaux, métadonnées,
implication des RH/comptabilité/juridique, techniques de parsing formelles.

**À rédiger**
- Tableau « quelle question → quelle source de données » (le réflexe d'investigation).
- Les 10 types de journaux, avec 2 exemples de champs pour chacun.
- Intégrité des preuves : hachage, horodatage, chaîne de possession.
- Dump mémoire vs image disque vs snapshot : ce que chacun prouve.

**Assets prévus** — 3 leçons · 1 schéma (sources de preuves) · 22 flashcards · 14 questions ·
1 PBQ « choisir la source » · 1 scénario « reconstituer une chronologie ».

---

# DOMAINE 5 — Security Program Management and Oversight (14 %)

## 5.1 — Explain the importance of governance, risk, and compliance artifacts.

**Sous-thèmes officiels**

- *Lignes directrices* : référentiels · avis · guides de mise en œuvre · architecture de référence
- *Normes* : lignes de base · mots de passe · sécurité physique · RFC · chiffrement
- *Procédures et plans* : SOP · runbooks · continuité d'activité · reprise après sinistre
- *Politiques* : BYOD · usage acceptable · bureau propre · sécurité de l'information ·
  réponse à incident · classification et conservation · contrôle d'accès · destruction ·
  divulgation de vulnérabilités · vie privée

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *Defensive Security Handbook* ch.3 | 47-51 | Politiques : langue, contenu, sujets, stockage |
| P | *Defensive Security Handbook* ch.4 | 53-57 | Standards et procédures |
| S | *Defensive Security Handbook* | 50 | Bureau propre, usage acceptable |
| S | *Defensive Security Handbook* | 18, 270 | BYOD |
| S | *11 Strategies* ch.2 | 61-70 | Autorités écrites |
| S | *11 Strategies* | 35 | Divulgation de vulnérabilités |
| S | *Defensive Security Handbook* ch.7 | 75-82 | Plans de continuité et de reprise |
| S | *SOC Analyst Notes* | 91, 261 | SOP |

**Couverture : 🟢 Solide** (le meilleur objectif du domaine 5)
**Absents** : architecture de référence, runbooks, politique de classification et conservation,
politique de vie privée, guides de mise en œuvre, RFC.

**À rédiger**
- La hiérarchie politique → standard → procédure → ligne directrice, avec un exemple concret.
- Les 10 politiques officielles, avec 3 clauses clés par politique.
- Qui approuve quoi (autorité, révision, diffusion).

**Assets prévus** — 2 leçons · 1 schéma (pyramide documentaire) · 20 flashcards · 12 questions ·
1 PBQ « classer 12 documents » · 1 scénario « la politique n'est pas appliquée ».

---

## 5.2 — Explain the impact of risk management processes on the security of the organization.

**Sous-thèmes officiels**

- *Identification* : identification des actifs · propriété par les parties prenantes
- *Évaluation* : notation · catégorisation
- *Analyse* : impact · probabilité · propriétaire · mitigations actuelles · qualitatif vs quantitatif
- *Registre des risques* : communication · revues
- *Traitement* : transfert · acceptation · évitement · atténuation
- *Considérations métier* : analyse d'impact métier · appétit au risque · risque résiduel ·
  implication des parties prenantes · supervision managériale · réglementaire · juridique ·
  SLE · ALE · ARO

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *Defensive Security Handbook* ch.1 | 23-33 | Évaluer menaces et risques, prioriser, jalons |
| S | *Defensive Security Handbook* ch.16 | 191-200 | Acceptation du risque |
| S | *11 Strategies* ch.1 | 47-60 | Contexte, actifs, mission |
| S | *11 Strategies* ch.10 | 321-337 | Métriques et indicateurs |
| S | *SOC Analyst Notes* | 183-187 | RMF, acceptation/transfert |
| S | *SOC Analyst Notes* | 125-131, 261 | BIA |

**Couverture : 🟡 Partielle**
Les concepts de risque sont présents mais **dispersés et non structurés**. Les **calculs quantitatifs
(SLE, ALE, ARO) ne figurent dans aucun livre**, ainsi que le registre des risques formel, l'appétit
au risque et le risque résiduel.

**À rédiger intégralement**
- Le processus en 6 étapes : identification → évaluation → analyse → registre → traitement → suivi.
- Qualitatif vs quantitatif : matrices de risque vs calculs.
- SLE = valeur de l'actif × facteur d'exposition ; ALE = SLE × ARO. Avec 3 exercices chiffrés.
- Les 4 traitements du risque, avec un exemple par traitement.
- Risque résiduel, appétit au risque, tolérance.

**Assets prévus** — 3 leçons · 1 schéma (processus de risque) · 22 flashcards · 14 questions ·
**1 PBQ calculateur SLE/ALE/ARO** · 1 scénario « le comité refuse le budget ».

---

## 5.3 — Explain the assessment and management processes associated with third-party risk.

**Sous-thèmes officiels**

- *Sélection* : RFP · RFI · RFQ · EOI · due diligence · conflit d'intérêts
- *Types d'accords* : SLA · SLO · MOU · MOA · NDA · MSA · SOW
- *Suivi* : droit d'audit · suivi des niveaux de service · registre des fournisseurs ·
  évaluation · attestation de conformité · tests d'intrusion
- *Limites* : effectifs · disponibilité des ressources · environnement · facteurs légaux et
  réglementaires · géographie/juridiction · financier/ROI · dépendance fournisseur ·
  mécanismes d'assurance · règles d'engagement

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *11 Strategies* ch.3 | 71-118 | Externalisation, modèles, limites |
| S | *11 Strategies* | 54, 86, 106-107, 442 | MOU, MOA, SLA, SLO, NDA (mentions) |
| S | *Defensive Security Handbook* | 17-27 | Due diligence |
| S | *SOC Analyst Notes* | 20, 105 | SLA, RFP |
| S | *Defensive Security Handbook* ch.8 | 83-91 | Attestations (SOC 2, PCI) |

**Couverture : 🟠 Faible**
SLA/SLO/MOU/MOA/NDA apparaissent, mais **RFP/RFI/RFQ/EOI, le droit d'audit, le registre des
fournisseurs, MSA, SOW et les règles d'engagement sont absents**.

**À rédiger intégralement**
- Le cycle fournisseur : sélection → contrat → intégration → suivi → sortie.
- RFP vs RFI vs RFQ vs EOI : qui demande quoi, à quel moment.
- Les 7 types d'accords, avec la clause de sécurité typique de chacun.
- Règles d'engagement d'un test d'intrusion (périmètre, fenêtre, contacts, limites).

**Assets prévus** — 2 leçons · 1 schéma (cycle fournisseur) · 18 flashcards · 12 questions ·
1 PBQ « choisir le bon accord » · 1 scénario « le fournisseur a été compromis ».

---

## 5.4 — Summarize elements of effective security compliance.

**Sous-thèmes officiels**

- *Formation conformité* : traitement des données · AML/CTF · anti-corruption
- *Supervision* : attestations · accusés de réception
- *Conséquences de la non-conformité* : réputation · financière · juridique · contractuelle ·
  sanctions · perte de licence
- *Vie privée* : droit à l'oubli · opt-in/opt-out · correction des données · restrictions de
  traitement · prévention du traitement · responsable vs sous-traitant · propriété
- *Conformité légale* : conservation légale (legal hold) · ordres légaux · exigences de conservation

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *Defensive Security Handbook* ch.8 | 83-91 | PCI DSS, HIPAA, GLBA, FERPA, SOX, cadres |
| S | *SOC Analyst Notes* | 187-189 | RGPD, HIPAA, NIST, ISO |
| S | *Defensive Security Handbook* ch.5 | 59-64 | Formation et sensibilisation |
| S | *11 Strategies* ch.1 | 47-60 | Environnement légal et réglementaire |

**Couverture : 🟠 Faible**
Les grandes lois sectorielles sont traitées, mais **15 des 21 sous-thèmes sont absents** :
AML/CTF, anti-corruption, attestations, les 6 conséquences, opt-in/opt-out, droit à l'oubli,
legal hold, ordres légaux, responsable vs sous-traitant.

**À rédiger intégralement**
- Les 6 conséquences de la non-conformité, avec un exemple réel par catégorie.
- Droits des personnes (RGPD) : accès, rectification, effacement, portabilité, opposition.
- Responsable de traitement vs sous-traitant : qui porte la responsabilité.
- Legal hold : ce que c'est, et pourquoi il suspend la destruction.

**Assets prévus** — 2 leçons · 1 schéma (paysage réglementaire) · 16 flashcards · 12 questions ·
1 PBQ « traiter 8 demandes de droits » · 1 scénario « demande d'effacement vs legal hold ».

---

## 5.5 — Explain concepts associated with audit and assessment activities.

**Sous-thèmes officiels**

- *Collecte de données* : échantillonnage · questionnaires · entretiens · assertion ·
  sources de référence (MITRE ATT&CK, Cyber Kill Chain, Diamond Model)
- *Cadrage* : charte d'audit · fréquence
- *Types de mission* : analyse d'écart · interne (conformité, comité d'audit, auto-évaluation) ·
  externe (examens, évaluations, réglementaire, audit indépendant) · benchmarking
- *Tests d'intrusion* : environnement connu/inconnu/partiellement connu · physique · offensif ·
  défensif · intégré · reconnaissance passive/active
- *Cadres et normes* : sectoriels · internationaux · régionaux
- *Tests fonctionnels* · *tests comportementaux*

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *11 Strategies* ch.6 | 171-197 | **MITRE ATT&CK**, Diamond Model, kill chain |
| P | *Defensive Security Handbook* ch.18 | 209-235 | Reconnaissance OSINT, red team, purple team |
| S | *Defensive Security Handbook* ch.8 | 83-91 | Cadres et normes |
| S | *11 Strategies* ch.11 | 328-337 | Red team, purple team |
| S | *SOC Analyst Notes* | 65-100, 257 | Cyber Kill Chain |
| S | *SOC Analyst Notes* | 168 | Analyse d'écart |

**Couverture : 🟠 Faible**
Les **cadres de référence (ATT&CK, Kill Chain, Diamond) sont bien couverts** — c'est le point fort.
Mais **20 des 32 sous-thèmes sont absents** : échantillonnage, questionnaires, charte d'audit,
comité d'audit, auto-évaluation, benchmarking, les 9 types de tests d'intrusion, tests
fonctionnels/comportementaux.

**À rédiger intégralement**
- Les 3 cadres de référence, avec un schéma comparatif (ce que chacun apporte).
- Les 9 types de tests d'intrusion, avec la matrice connue/inconnue/partiellement connue.
- Audit interne vs externe vs réglementaire : qui mandate, qui paie, qui lit le rapport.
- Échantillonnage : pourquoi on ne teste jamais 100 %.

**Assets prévus** — 2 leçons · 1 schéma (cadres comparés) · 18 flashcards · 12 questions ·
1 PBQ « planifier un audit » · 1 scénario « l'auditeur demande les preuves ».

---

## 5.6 — Given a scenario, apply security awareness concepts to improve organizational security.

**Sous-thèmes officiels**

- *Types de formation* : initiale/onboarding · continue · ciblée · corrective
- *Modes de diffusion* : LMS · portails en libre-service · individuel · collectif
- *Mesure de l'efficacité* : métriques · rapports managériaux · notation du risque comportemental
- *Sujets courants* : ingénierie sociale · sujets émergents · gestion des mots de passe et
  identifiants · télétravail/hybride · BYOD · fraude au président (BEC) · supports amovibles et
  câbles · vigilance situationnelle · sécurité opérationnelle

**Sources**

| Type | Référence | Pages | Apport |
|---|---|---|---|
| P | *Defensive Security Handbook* ch.5 | 59-64 | Programme de sensibilisation, objectifs, métriques, gamification |
| S | *Defensive Security Handbook* annexe A | 263-266 | Modèles de sensibilisation au phishing |
| S | *Defensive Security Handbook* | 18, 270 | BYOD |
| S | *11 Strategies* ch.4 | 121-142 | Montée en compétence, formation continue |
| S | *SOC Analyst Notes* | 81, 269 | Sensibilisation (mentions) |

**Couverture : 🟡 Partielle**
Le livre 1 est une bonne source sur la *construction* d'un programme.
**Absents** : les 4 types de formation officiels, LMS, portails en libre-service, notation du risque
comportemental, BEC, supports amovibles, vigilance situationnelle, sécurité opérationnelle.

**À rédiger**
- Les 4 types de formation, avec le déclencheur de chacun (arrivée, annuel, incident, ciblé).
- Mesurer l'efficacité : les 5 métriques qui comptent réellement.
- BEC : pourquoi c'est la fraude la plus coûteuse, et comment la reconnaître.
- Sécurité opérationnelle (OPSEC) appliquée au quotidien.

**Assets prévus** — 2 leçons · 1 schéma (programme de sensibilisation) · 16 flashcards · 10 questions ·
1 PBQ « concevoir un plan de formation » · 1 scénario « l'utilisateur a cliqué ».

---

## Récapitulatif des volumes de production (version complète)

| Élément | Volume cible |
|---|---|
| Leçons | 86 |
| Schémas interactifs | ~36 |
| Flashcards | ~600 |
| Questions de quiz | ~390 |
| Exercices pratiques (PBQ) | ~30 |
| Scénarios d'évaluation | ~27 |
| Références documentaires sourcées | ~450 |

Le prototype livre une **tranche verticale complète** de ce programme (voir `06-Prototype-Scope.md`),
afin de valider l'architecture, l'expérience d'apprentissage et le modèle de contenu avant
la production des 86 leçons.
