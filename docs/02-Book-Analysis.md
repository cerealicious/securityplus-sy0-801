# 02 — Analyse des quatre livres

Chaque livre est analysé selon : ce qu'il est réellement, ce qu'il apporte objectif par objectif,
ses forces, ses limites, et son contenu hors programme.

Rappel : les pages citées sont les **pages PDF**.

---

## A. *Defensive Security Handbook — Best Practices for Securing Infrastructures*
**O'Reilly · 284 p. · 21 chapitres**

### A.1 Nature réelle

Ce n'est pas un manuel de certification : c'est un **manuel d'ingénierie défensive** destiné à
quelqu'un qui doit *monter* un programme de sécurité dans une PME/ETI. Il est très concret,
procédural, et couvre le « comment » là où Security+ demande le « pourquoi » et le vocabulaire.

C'est de loin le livre le plus utile des quatre pour le projet, car il recouvre **le domaine 4
(opérations) et une grande partie du domaine 5 (gouvernance)**.

### A.2 Ce qu'il apporte, chapitre par chapitre

| Ch. | Pages | Apport pour SY0-801 | Objectifs servis |
|---|---|---|---|
| 1 | 23-33 | Construction d'un programme, baseline de posture, évaluation des risques, cas d'usage et tabletop | 1.1, 4.7, 5.1, 5.2 |
| 2 | 35-45 | Cycle de vie des actifs, classification de l'information, documentation, suivi des changements | **4.2**, 3.3, 1.2 |
| 3 | 47-51 | Rédaction de politiques : structure, sujets, stockage | **5.1** |
| 4 | 53-57 | Standards et procédures, différence politique/standard/procédure | **5.1**, 1.2 |
| 5 | 59-64 | Programme de sensibilisation, métriques, gamification, processus IR | **5.6**, 5.4 |
| 6 | 67-74 | Processus IR pré/ pendant/ post-incident, analyse log/disque/mémoire/PCAP | **4.7**, 4.8 |
| 7 | 75-82 | RPO/RTO, sauvegardes, warm standby, haute disponibilité, site alternatif, tests | **3.4** |
| 8 | 83-91 | PCI DSS, HIPAA, GLBA, FERPA, SOX ; cadres Cloud Control Matrix, CIS, COBIT, COSO, ISO 27000, NIST CSF | **5.4**, 5.5 |
| 9 | 93-101 | Sécurité physique : contrôle d'accès, vidéo, badges, visiteurs, datacenters | **2.3**, **4.1**, 1.1 |
| 10 | 103-120 | Durcissement Windows, AD (forêt/domaine/OU/groupes/comptes), GPO, EMET, MSSQL | **4.1**, **4.5**, 3.2 |
| 11 | 123-133 | Durcissement serveurs Unix, mises à jour, SELinux | **4.1**, 3.2 |
| 12 | 135-146 | Durcissement poste de travail, chiffrement disque complet, outils endpoint, MDM | **4.1**, **4.5** |
| 13 | 147-164 | Mots de passe, gestionnaires, hachage/sel, politiques fines, MFA et 2FA | **4.5**, **1.3** |
| 14 | 165-175 | Durcissement réseau, SNMP, protocoles chiffrés, réseau d'administration, TACACS+ | **4.1**, 3.2, 1.3 |
| 15 | 177-189 | Segmentation physique et logique, SDN, microsegmentation, rôles | **3.1**, **4.1**, 3.2 |
| 16 | 191-200 | Scan de vulnérabilités authentifié/non authentifié, programme, priorisation, acceptation du risque | **4.3**, 2.1, 5.2 |
| 17 | 201-208 | Codage sécurisé, tests statiques/dynamiques, revue par les pairs, SDLC | **4.1**, 2.4, 4.6 |
| 18 | 209-235 | OSINT, red teaming, purple teaming | 5.5, 4.7, 2.1 |
| 19 | 237-245 | NIDS/HIDS/IPS, réduction du bruit, signatures, emplacement des capteurs | **4.1**, 4.4 |
| 20 | 247-254 | Que journaliser, où, SIEM, conception, analyse de logs, agrégation, cas d'usage | **4.4**, **4.8** |
| 21 | 255-261 | Sécurité des serveurs e-mail et DNS, « security through obscurity » | 4.1, 3.1 |
| A | 263-266 | Modèles de sensibilisation au phishing | 5.6 |

### A.3 Forces

- **Profondeur opérationnelle réelle** : durcissement, GPO, segmentation, scan, SIEM — exactement
  ce que le domaine 4 demande d'« appliquer ».
- **Traçabilité du raisonnement** : chaque recommandation est justifiée par un risque.
- **Chapitre 7 (DR)** : la meilleure source des quatre livres pour RTO/RPO, sites chauds/tièdes/froids
  (via *warm standby* et *alternate system*), tests de restauration.
- **Chapitre 13** : excellente base pour 4.5 (mots de passe, hachage, sel, MFA).

### A.4 Limites pour SY0-801

| Sujet officiel | Problème |
|---|---|
| 1.3 PKI, certificats, CRL/OCSP, CSR, key escrow | **Absent.** Le livre parle de chiffrement mais pas de PKI. |
| 1.2 Change management (CAB, backout, fail forward) | Seulement « change tracking » (p. 39). Vocabulaire officiel absent. |
| 2.2 Acteurs de menace et motivations | Quasi absent (mentionne *hacktivist*, *state-sponsored* en passant p. 15 et 89). |
| 2.6 Menaces IA | Absent. |
| 3.3 Rôles de protection des données (propriétaire, dépositaire, intendant, contrôleur, sous-traitant) | Absent — seule la classification est traitée. |
| 4.5 Fédération, SSO, SAML, OAuth, modèles MAC/DAC/RBAC, passkeys | Très partiel : AD et MFA oui, fédération non. |
| 4.6 Automatisation/orchestration | Très faible. |
| 5.3 Risque fournisseur (RFP/RFI/RFQ/EOI, MOU/MOA/NDA/MSA/SOW, droit d'audit) | Absent. |
| 5.4 Vie privée, AML/CTF, anti-corruption, legal hold | Absent. |
| 5.5 Audit (échantillonnage, charte d'audit, types de mission, reconnaissance passive/active) | Partiel via ch. 18 (OSINT) uniquement. |

### A.5 Contenu hors programme (à exclure du parcours principal)

- EMET (p. 111-117) — technologie Microsoft abandonnée, hors référentiel.
- TACACS+ (p. 174) — hors liste officielle.
- Détail AD interne (forêt/OU, p. 106-109) — utile en contexte, non exigible.
- MSSQL / SA user (p. 118-119) — hors objectifs.
- « Security through obscurity » (p. 259) — notion utile, mais non listée.
- Chapitre 18 « Purple Teaming » détaillé (p. 209-235) — l'objectif 5.5 ne demande que les *types*
  de tests d'intrusion et la reconnaissance ; le détail opérationnel OSINT/red team est hors périmètre.
- Guides de style de rédaction de politiques (p. 48-51) — hors objectifs.

---

## B. *11 Strategies of a World-Class Cybersecurity Operations Center*
**MITRE · 452 p. · 12 chapitres**

### B.1 Nature réelle

Ouvrage de **doctrine d'organisation des SOC**, publié par MITRE. Il ne parle presque jamais de
techniques d'attaque ni de cryptographie : il traite de **gouvernance, structure, processus, données,
outils, métriques et extension des capacités**.

C'est la meilleure source des quatre pour **4.4, 4.7, 4.8 et une partie de 5.1/5.2/5.5**, et la seule
qui apporte une vraie matière sur **MITRE ATT&CK, Cyber Kill Chain et Diamond Model** (5.5).

### B.2 Ce qu'il apporte

| Ch. | Pages | Apport | Objectifs |
|---|---|---|---|
| 0 | 21-46 | Rôle et fonctions du SOC, notions de base, personnes/processus/technologie | 4.4, 4.7 |
| 1 | 47-60 | Connaissance de ce qu'on protège : contexte, mission, environnement légal, systèmes critiques, données, utilisateurs, menace | 5.2, 3.3, 4.2, 2.1 |
| 2 | 61-70 | Autorités écrites, alignement organisationnel | 5.1, 4.7 |
| 3 | 71-118 | Modèles organisationnels de SOC, internalisation vs externalisation, 24×7, implantation | 5.1, 5.3 |
| 4 | 121-142 | Recrutement, montée en compétence, rétention, dimensionnement | 5.6, 5.3 |
| 5 | 145-169 | **Cycle de réponse à incident** : planification, détection/analyse, confinement/éradication/relevage, post-incident, cloud, mobile, OT | **4.7** |
| 6 | 171-197 | **Cyber threat intelligence** : objectifs, planification, compréhension de l'adversaire, outils, produits, défis ; MITRE ATT&CK | **2.1**, 2.2, 4.7 |
| 7 | 199-257 | **Sélection et collecte des données** : planification, détection d'intrusion, supervision hôte et réseau, cloud, Zero Trust, OT, instrumentation | **4.4**, **4.8**, 3.2 |
| 8 | 261-302 | **Outils** : intégration, SIEM, UEBA, gestion de cas, SOAR, protection des outils, cloud | **4.4**, **4.6**, 4.8 |
| 9 | 305-319 | Communication avec les parties prenantes et la communauté | 4.7, 5.3 |
| 10 | 321-337 | **Métriques** de performance, tendances | 4.4, 3.4 |
| 11 | 339-376 | **Extension des capacités** : threat hunting, red team, purple team, breach & attack simulation, deception, analyse de malware, forensics numérique, exercices tabletop | **4.7**, **5.5**, 4.1 |

### B.3 Forces

- **Chapitre 5** : la meilleure source pour 4.7, alignée sur le cycle NIST (Préparation → Détection
  et analyse → Confinement/éradication/relevage → Activités post-incident).
- **Chapitre 7** : source de référence pour 4.4 et 4.8 (sources de données, capteurs, rétention,
  NetFlow, journaux, instrumentation cloud et OT).
- **Chapitre 6** : apporte 2.1 (threat feeds, sources de renseignement, cycle de vie) et 2.2
  (compréhension de l'adversaire) mieux que tout autre livre.
- **Chapitre 11** : seule source sérieuse pour 5.5 (threat hunting, red/purple team, BAS, forensics,
  tabletop) et pour la technologie de tromperie de 4.1.

### B.4 Limites pour SY0-801

| Sujet officiel | Problème |
|---|---|
| 1.3 Cryptographie | Absent. |
| 2.3 Vecteurs (messagerie, QR, pièces jointes, navigateur, USB, NFC…) | Absent — le livre raisonne en capacités, pas en vecteurs. |
| 2.4 Types de vulnérabilités | Absent. |
| 2.5 Indicateurs d'activité malveillante | Absent (aucune taxonomie malware/attaque). |
| 2.6 Menaces IA | Absent. |
| 3.4 Résilience (sites, sauvegardes, redondance) | Absent — le livre ne traite pas de DR d'infrastructure. |
| 4.1 Contrôles défensifs concrets (pare-feu, WAF, DLP, NAC, 802.1X, DMARC…) | Partiel et dispersé. |
| 4.5 IAM | Très partiel. |
| 5.4 Conformité et vie privée | Absent. |

### B.5 Contenu hors programme (à exclure du parcours principal)

- Chapitre 3 en entier : modèles organisationnels de SOC, centralisation, 24×7, implantation physique.
- Chapitre 4 en entier : recrutement, carrières, rétention, dimensionnement des équipes.
- Chapitre 9 : communication interne au SOC, relations avec la communauté cyber.
- Chapitre 10 : programme de métriques SOC (seuls MTTR/MTBF intéressent 3.4).
- Chapitre 11, sections red team / purple team / BAS détaillées : la *notion* sert 5.5, l'opérationnel non.
- Annexes B, C, D : construction d'un SOC, documentation interne, outils de l'analyste.

---

## C. *SOC Analyst Notes*
**296 p. · notes informelles d'un analyste (Azam Shaik)**

### C.1 Nature réelle

Ce ne sont pas des notes structurées : c'est un **recueil de fiches de définitions et de questions
d'entretien**, rédigé dans un anglais approximatif, avec des répétitions et des erreurs. Il n'a
**ni table des matières, ni index, ni chapitres**.

Sa valeur est **terminologique** : il donne des définitions « de terrain » d'un très grand nombre
de sigles du référentiel, avec les pages où les retrouver.

### C.2 Ce qu'il apporte réellement

| Zone (pages) | Apport | Objectifs |
|---|---|---|
| 1-17 | LAN/WAN/MAN, datacenter, AD, EDR/AV/AM, HIDS/HIPS, NGFW/WAF, NIDS/NIPS, SIEM, SOC, DLP, FIM, DNS, DHCP, IP, MAC, ARP, FTP/SFTP/HTTP/HTTPS/SMTP/SSH, SSL/TLS, RDP, SNMP, syslog, CIA, pare-feu, IDS/IPS, OWASP Top 10, TCP/UDP, NIC | 1.1, 3.1, 4.1, 4.8 |
| 18-50 | MTTI, SLA, différences TCP/UDP et routeur/switch, taille MAC, outils de ticketing, ports et protocoles, DORA/DHCP, DNS, classification des données | 3.3, 3.4, 5.3, 4.8 |
| 51-100 | Event IDs, RHEL, architecture 3-tiers, passerelle e-mail, défense en profondeur, **Cyber Kill Chain** et phases, masquage d'IP/TOR, MITM, mouvement latéral | 1.1, 2.5, 4.8, 5.5 |
| 101-160 | Sévérité des alertes AV/EDR, différence AV/EDR, classification, blocage de hash, priorisation d'incident, **BIA**, NAT, validation et mise à jour de règles pare-feu, couches TCP/IP, proxy, filtrage de contenu, WAF vs NGFW, portail captif, scan de ports | 2.5, 4.1, 4.3, 4.5, 5.2 |
| 161-190 | Cryptographie (RC4, DES/AES, asymétrique, échange de clés), OWASP/XSS/SQLi, **RMF**, RGPD, HIPAA, NIST, ISO 14001 | 1.3, 2.5, 5.2, 5.4 |
| 191-260 | Logs, SIEM, normalisation/parsing/filtrage/requêtage, IOC vs IOA, **threat intelligence feeds**, journaux Windows/Linux/pare-feu, Splunk, IBM QRadar, menace interne/externe, règles de corrélation, référence sets, analyse de malware, drive-by download, SAN/NAS | **4.4**, **4.8**, 2.1, 4.7 |
| 261-296 | Codes d'authentification HTTP, journaux Windows, DoS/DDoS, WAF, couches TCP | 4.8, 2.5, 4.1 |

### C.3 Forces

- **Couverture terminologique très large** : c'est le livre qui mentionne le plus de sigles du
  référentiel (SIEM 80 pages, EDR 55, DLP 26, WAF 28, syslog 23, IOC 23, IOA 23).
- **Pont entre théorie et pratique SOC** : explications « ce que ça veut dire pour un analyste ».
- **Seule source des quatre livres** pour : IOC vs IOA, normalisation/parsing SIEM, référence sets,
  codes de réponse HTTP, Event IDs Windows, DORA, architecture 3-tiers, RMF, ISO 14001.
- **Bonne source pour 4.8** (types de journaux par plateforme).

### C.4 Limites — importantes

⚠️ **Qualité rédactionnelle faible** : anglais fautif, définitions parfois erronées ou incomplètes,
sigles mal développés (« CMI » pour CLI, « MTTI » pour MTTD, « Instance » pour Incident).
**Aucune phrase ne sera reprise telle quelle.** Le livre sert uniquement de **pointeur** : il indique
qu'une notion existe et à quelle page la vérifier.

⚠️ **Erreurs factuelles identifiées** (à ne surtout pas propager) :
- confond « Data Centre » et « Domain Controller » sous le même sigle DC (p. 2-3) ;
- développe CMI au lieu de CLI (p. 14) ;
- développe MTTI au lieu de MTTD/MTTI (p. 20) ;
- écrit « Cyber security Instance Team » pour Incident (p. 7).

### C.5 Contenu hors programme

- IBM QRadar en détail (p. 195-248), Splunk en détail (p. 212-217) : outils spécifiques, non exigibles.
- Outils de ticketing (ServiceNow, Jira, p. 40) : hors objectifs.
- Questions d'entretien et conseils de carrière : hors parcours, éventuellement en annexe.
- ISO 14001 (management environnemental) : hors cybersécurité.
- SAN/NAS (p. 253) : hors liste officielle.

---

## D. *Networking Fundamentals for SOC Analyst*
**35 p. · notes manuscrites scannées (CyberSecXperts)**

### D.1 Nature réelle

Support de formation commerciale de 35 pages manuscrites, très visuel (analogies maison/quartier/
immeuble), destiné à des débutants qui préparent un poste d'analyste SOC. **Contenu volontairement
élémentaire** : rien ne dépasse le niveau « fondamentaux réseaux ».

Extraction par OCR uniquement (voir `01-Resource-Verification.md`).

### D.2 Ce qu'il apporte

| Pages | Contenu | Objectifs |
|---|---|---|
| 2-6 | Pourquoi les réseaux comptent pour le SOC, qu'est-ce qu'un réseau, paquets, équipements (switch, routeur, AP, passerelle) | 3.1, 4.1 |
| 7-11 | MAC vs IP, IP privées/publiques, NAT, sous-réseaux, masque, CIDR | 3.1, 4.8 |
| 12-14 | LAN/WAN, DMZ, zones réseau et niveaux de confiance | **3.1**, **3.2** |
| 15-20 | Ports et protocoles, catégories de ports, TCP vs UDP, ports à forte valeur | 4.1, 4.8, 2.5 |
| 21-27 | `ipconfig`, `ping`, `tracert`, `nslookup`, `netstat`, `Test-NetConnection` | **4.8**, 4.4 |
| 28-31 | Flux d'investigation réseau, triage d'alerte, méthode de dépannage | 4.7, 4.8 |
| 32-35 | Questions d'entretien, carte mentale, aide-mémoire | (révision) |

### D.3 Forces

- **Pédagogie visuelle excellente** : les analogies (maison/quartier, immeuble/flat, château/douves)
  sont directement réutilisables pour les schémas interactifs de l'application.
- **Seule source des quatre livres** pour : CIDR, masque de sous-réseau, DMZ, zones de confiance,
  catégories de ports, `Test-NetConnection`.
- **Format « fiche » idéal** pour les flashcards.

### D.4 Limites

- **Niveau très élémentaire** : aucune notion de VLAN, de routage dynamique, de SDN, de pare-feu
  applicatif, de proxy inverse.
- **Aucune couverture** de la cryptographie, de l'IAM, du risque, de la conformité, de l'IA.
- **OCR de qualité moyenne** : le texte n'est pas citable, seulement exploitable comme repère.
- Quelques erreurs OCR/typographiques dans les notes d'origine (ex. : « SASE » cité sans développement).

### D.5 Contenu hors programme

- Conseils d'entretien, aide-mémoire de révision, présentation commerciale du formateur (p. 1, 32-35).
- Détails de câblage et de commandes Windows qui ne sont pas exigés par le référentiel — mais les
  commandes restent utiles pour 4.8 (sources de données), donc conservées en « pratique ».

---

## E. Synthèse comparative

| Critère | Defensive Security Handbook | 11 Strategies (MITRE) | SOC Analyst Notes | Networking Fundamentals |
|---|---|---|---|---|
| Fiabilité factuelle | ★★★★★ | ★★★★★ | ★★☆☆☆ | ★★★☆☆ |
| Profondeur | ★★★★☆ | ★★★★★ | ★★☆☆☆ | ★★☆☆☆ |
| Alignement SY0-801 | ★★★★☆ | ★★★☆☆ | ★★★☆☆ | ★★☆☆☆ |
| Couverture D1 | ★★☆☆☆ | ★☆☆☆☆ | ★★★☆☆ | ☆☆☆☆☆ |
| Couverture D2 | ★★☆☆☆ | ★★☆☆☆ | ★★★☆☆ | ★★☆☆☆ |
| Couverture D3 | ★★★★☆ | ★★★☆☆ | ★★★☆☆ | ★★★☆☆ |
| Couverture D4 | ★★★★★ | ★★★★★ | ★★★★☆ | ★★★☆☆ |
| Couverture D5 | ★★★★☆ | ★★★☆☆ | ★★★☆☆ | ☆☆☆☆☆ |
| Réutilisable en schémas | ★★★☆☆ | ★★★★☆ | ★★☆☆☆ | ★★★★★ |
| Réutilisable en flashcards | ★★★★☆ | ★★★☆☆ | ★★★★☆ | ★★★★☆ |

**Conclusion opérationnelle :**

1. **Defensive Security Handbook** = colonne vertébrale des domaines 3, 4 et 5.
2. **11 Strategies (MITRE)** = colonne vertébrale de 4.4, 4.7, 4.8 et 5.5, plus 2.1/2.2.
3. **SOC Analyst Notes** = lexique de vérification, jamais source de vérité.
4. **Networking Fundamentals** = illustrations et fondamentaux de 3.1/3.2/4.8.

**Aucun livre ne peut servir de cours pour 1.3, 2.2, 2.3, 2.4, 2.6, 4.5, 5.4.**
Ces objectifs devront être **rédigés intégralement** par le formateur, les livres ne fournissant
au mieux que des points d'accroche.
