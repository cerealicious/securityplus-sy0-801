# Analyse des ressources et programme pédagogique — CompTIA Security+ SY0-801 V8

> Document de synthèse produit conformément à la méthode demandée (étapes 1 à 7).
> Aucun code d'application n'a été écrit. Ce document est soumis à approbation.

---

## Partie A — Vérification des ressources (étape 1)

### A.1 Fichiers demandés — tous accessibles

| # | Fichier | Taille | Pages | Rôle |
|---|---|---|---|---|
| 1 | `Security.801.Objectives.pdf` | 274 Ko | 27 | **Référentiel officiel** (périmètre strict) |
| 2 | `SOC Analyst Notes.pdf` | 11,8 Mo | 296 | Livre 1 — notes SOC / vocabulaire |
| 3 | `11-strategies-of-a-world-class-cybersecurity-operations-center.pdf` | 16,5 Mo | 452 | Livre 2 — management et architecture SOC |
| 4 | `Defensive Security Handbook - Best Practices For Securing Infrastructures.pdf` | 30,7 Mo | 284 | Livre 3 — bonnes pratiques d'infrastructure |
| 5 | `Networking Fundamentals For Soc Analyst (2).pdf` | 23,5 Mo | 35 | Livre 4 — PDF scanné (OCR effectué) |

**Total analysé : 1 094 pages.**

### A.2 Traitement particulier du livre 4

Le PDF `Networking Fundamentals For Soc Analyst (2).pdf` ne contenait que 892 caractères extractibles pour 35 pages (1 image par page). J'ai effectué une **OCR complète avec le moteur Windows WinRT** : 35/35 pages reconnues. C'est un support de révision réseau (IP, DNS, ports, TCP/UDP, sous-réseaux, commandes, workflow d'investigation SOC), **pas un manuel Security+**.

### A.3 PDF supplémentaires présents dans le dossier (non demandés)

| Fichier | Pages | Nature |
|---|---|---|
| `EventID ,SOC.pdf` | 11 | Liste des Event ID Windows utiles en SOC |
| `SOC Lab Configuration.pdf` | 31 | Guide de montage de lab (Splunk, pfSense, Suricata, DVWA…) |
| `Turn_an_Old_Router_into_a_$20_SOC_Configuration_Study_Guide.pdf` | 11 | Guide pratique « router SOC » |
| `What_I_Wish_I_Knew_Before_My_First_SOC_Analyst_Shift_-_Study_Guide.pdf` | 10 | Guide de terrain SOC |

Ces 4 fichiers **ne font pas partie de la liste fournie**. Je propose de les exclure du prototype (ils pourront servir plus tard de ressources d'exercices pratiques si vous le souhaitez).

---

## Partie B — Analyse du référentiel officiel (étapes 2 et 3)

**Document :** CompTIA Security+ SY0-801 V8 — *Certification Exam Objectives*, Document Version 2.0, © 2025 CompTIA, Inc.

### B.1 Informations d'examen

| Élément | Valeur |
|---|---|
| Code examen | SY0-801 V8 |
| Nombre de questions | 90 maximum |
| Types de questions | Choix multiples + questions de performance (PBQ) |
| Durée | 90 minutes |
| Score de réussite | 750 (échelle 100–900) |
| Public cible | Administrateur sécurité, 2 ans d'expérience pratique |
| Accréditation | ANAB / ISO 17024 |

### B.2 Les 5 domaines (périmètre strict)

| Domaine | Titre officiel | Poids | Objectifs |
|---|---|---|---|
| 1.0 | General Security Concepts | **16 %** | 1.1 – 1.3 (3) |
| 2.0 | Threats, Vulnerabilities, and Attacks | **24 %** | 2.1 – 2.6 (6) |
| 3.0 | Security Architecture | **19 %** | 3.1 – 3.4 (4) |
| 4.0 | Security Operations | **27 %** | 4.1 – 4.8 (8) |
| 5.0 | Security Program Management and Oversight | **14 %** | 5.1 – 5.6 (6) |

**Total : 27 objectifs officiels** (et non 34 — les sous-objectifs ne sont pas comptés comme des objectifs).

Le document contient également :
- une **liste d'acronymes** (~90 entrées, p. 24–26) ;
- une **liste matériel/logiciel** (p. 27) : tablettes, serveurs web, pare-feu, routeurs, switchs, IDS/IPS, VM, systèmes d'email, DNS, IoT, tokens matériels, smartphones, Kali Linux, analyseur de paquets, scanner de vulnérabilités, SIEM, MDM, VPN, DHCP, DNS, etc.

### B.3 Conséquence pour le projet

Le référentiel définit **strictement** le périmètre : tout contenu des livres qui n'y figure pas sera exclu des cours ; tout objectif non couvert par les livres sera **rédigé à part et explicitement signalé comme tel** (aucune attribution mensongère à un livre).

---

## Partie C — Analyse des quatre livres (étape 3)

> **Conventions de pagination utilisées dans ce document :**
> - *SOC Analyst Notes* : pagination propre du PDF = p. N.
> - *11 Strategies* : **page imprimée = page PDF − 20** (les pages citées sont les pages imprimées).
> - *Defensive Security Handbook* : **page imprimée + 22 = page PDF** (les pages citées sont les pages imprimées).
> - *Networking Fundamentals* : p. N = page PDF.

### C.1 SOC Analyst Notes — Azam Shaik (296 pages)

**Nature réelle :** recueil de notes de SOC analyst et de réponses d'entretien, organisé en dictionnaire alphabétique, sans table des matières, avec de très nombreuses coquilles. Ce n'est **pas** un livre de préparation Security+.

**Structure :**
- p. 1–20 : glossaire (LAN/WAN/AD/EDR/AV/HIDS/NIDS/WAF/SIEM/CIA…) ;
- p. 21–49 : modèle OSI, IP, DHCP/DNS/IPAM, ports, commandes ;
- p. 50–64 : serveurs, données, architecture réseau, zones Trust/DMZ/Untrust ;
- p. 65–69 : Cyber Kill Chain, MITRE ATT&CK ;
- p. 69–103 : malwares et attaques (flooding, spoofing, MITM, crypto) ;
- p. 104–158 : endpoints, EDR, DLP, IDS/IPS, firewalls, change request/CAB, FortiGate ;
- p. 159–181 : vulnerability management, hardening, SSDLC, pentest, cryptographie ;
- p. 182–188 : GRC, risques, conformité ;
- p. 189–224 : SOC, SIEM, logs, threat hunting, SOAR, QRadar/Splunk ;
- p. 225–280 : investigation et « récits d'entretien » (très redondants) ;
- p. 281–296 : Wireshark, AWS, KPI SOC.

**Points forts :** vocabulaire SOC très riche, malwares (p. 69–80), CVSS/CVE (p. 162–163), gestion des vulnérabilités pas-à-pas (p. 161), SIEM (p. 190–204), réponse à incident (p. 167), CI/CD et SOAR (p. 171, 197–198).

**Limites majeures :** interface propriétaire (QRadar, FortiGate, Sophos), erreurs nombreuses (voir E.3), 2.6 totalement absent.

### C.2 11 Strategies of a World-Class Cybersecurity Operations Center — Knerler, Parker & Zimmerman, MITRE, 2ᵉ éd. 2022 (452 pages)

> **Correction bibliographique importante :** le texte extrait est l'ouvrage de **Kathryn Knerler, Ingrid Parker et Carson Zimmerman** (MITRE Corporation, 2ᵉ édition, ©2022, ISBN 979-8-9856450-4-0). Les noms « Kerns, Jackson, Chiacchia, Ng » correspondent à la 1ʳᵉ édition et n'apparaissent pas dans le fichier.

**Nature réelle :** référentiel de management et d'architecture de SOC. Les auteurs déclarent eux-mêmes (p. 4–5) ne pas traiter en profondeur les détails réseau/système, les outils pas-à-pas, les attaques, la forensique, l'analyse de malware, la sécurité physique ni la conformité légale.

**Structure :** Fundamentals (p. 9–26) + 11 stratégies (p. 27–356) + annexes A–F (p. 393–426). Stratégies notables : 1 *Know What You Are Protecting and Why* (p. 27–40), 5 *Prioritize Incident Response* (p. 125–150), 6 *Cyber Threat Intelligence* (p. 151–177), 7 *Select and Collect the Right Data* (p. 179–239), 8 *Leverage Tools* (p. 241–284), 11 *Expand SOC Functionality* (p. 319–356).

**Points forts :** 4.4 surveillance (SIEM, tuning, NetFlow, SPAN/taps, p. 179–259), 4.7 réponse à incident (cycle, playbooks, PIR, p. 125–149), 4.8 investigation (observables, forensique, chaîne de custody, p. 133–136, 348–351), 5.5 frameworks (ATT&CK, Kill Chain, Diamond, red/purple/BAS/tabletop, p. 167, 328–356), 4.6 SOAR (p. 270–273).

**Limites :** 2.6 absent, 5.2 quasi absent, 1.3 et 3.3 très faibles.

### C.3 Defensive Security Handbook — Brotherston & Berlin, O'Reilly, 2017 (284 pages)

**Nature réelle :** « handbook » de terrain, 21 chapitres indépendants, orienté administration système et bonnes pratiques. Livre de 2017 : certains contenus sont obsolètes.

**Structure :** 1 Creating a Security Program ; 2 Asset Management ; 3 Policies ; 4 Standards and Procedures ; 5 User Education ; 6 Incident Response ; 7 Disaster Recovery ; 8 Compliance ; 9 Physical Security ; 10 Windows Infrastructure ; 11 Unix Servers ; 12 Endpoints ; 13 Passwords & MFA ; 14 Network Infrastructure ; 15 Segmentation ; 16 Vulnerability Management ; 17 Development ; 18 Purple Teaming ; 19 IDS and IPS ; 20 Logging and Monitoring ; 21 The Extra Mile.

**Points forts :** chapitres dédiés et approfondis pour **4.2** (actifs), **4.3** (scans authentifiés vs non), **4.5** (MFA, bcrypt, FGPP), **4.7** (IR), **5.1** (politiques/standards/procédures), **5.2** (risques), **5.4** (conformité), **5.6** (sensibilisation), **3.4** (RPO/RTO, warm standby, failover).

**Limites :** aucune cryptographie formelle (PKI), pas d'IA, pas de zero trust, pas de cloud/IaC, technologies modernes (WAF, DLP, EDR/XDR, DMARC) absentes.

### C.4 Networking Fundamentals for SOC Analyst — CyberSecXperts (35 pages, OCR)

**Nature réelle :** support de révision manuscrit « SOC Analyst Edition » : IP/MAC, plages privées, sous-réseaux/CIDR, LAN/WAN/DMZ/zones, ports et protocoles (22/53/80/443/25/445/3389/389/636/161), TCP/UDP, commandes (ipconfig, ping, tracert, nslookup, netstat, Test-NetConnection), troubleshooting et workflow d'investigation d'alertes.

**Points forts :** p. 13–14 (DMZ/zones de confiance), p. 15–20 (ports/protocoles), p. 21–27 (commandes), p. 28–31 (investigation d'alerte et troubleshooting) — utile comme **prérequis** et pour l'exercice pratique 4.8.

**Limites :** aucun contenu cryptographique, GRC, risque, IA, architecture cloud. Langue anglaise, erreurs d'OCR à corriger.

---

## Partie D — Cartographie objectifs ↔ sources (étapes 4 et 5)

Légende : ★★★ = bien couvert ; ★★ = moyennement ; ★ = faiblement ; — = absent.
Les pages indiquées sont celles où se trouvent réellement les notions.

### Domaine 1 — General Security Concepts (16 %)

| Obj. | SOC Notes | 11 Strategies | Defensive HB | Networking | Meilleures références |
|---|---|---|---|---|---|
| **1.1** | ★★ p.11–12, 25, 59, 184–185 | ★★ p.32, 38–39, 230–231, 238, 280 | ★★ p.53, 71, 141, 152, 156, 165 | — | CIA (SN p.11–12 ; DSH p.53), AAA (DSH p.152), ZT (11S p.230),least privilege (DSH p.156) |
| **1.2** | ★★ p.38–40, 135–136, 168, 238 | ★★ p.35–36, 130–132, 203, 400–404 | ★★ p.17, 27, 34, 104, 144, 172, 175 | — | CAB/change request (SN p.135–136), rollback (DSH p.104), SOP (11S p.130–131) |
| **1.3** | ★★ p.117, 172–177 | ★ p.104, 134, 183, 196–197, 227, 278 | ★ p.119–122, 129–131 | — | Symétrique/asymétrique (SN p.172), hash/salt (SN p.176 ; DSH p.129–131), FDE (DSH p.119–121) |

### Domaine 2 — Threats, Vulnerabilities, and Attacks (24 %)

| Obj. | SOC Notes | 11 Strategies | Defensive HB | Networking | Meilleures références |
|---|---|---|---|---|---|
| **2.1** | ★★★ p.18–19, 160–163, 196 | ★★ p.23–24, 129–130, 151–168 | ★★ p.3–5, 175–177 | — | CVSS/CVE (SN p.162–163), risque V×T (SN p.19), CTI (11S p.159–177) |
| **2.2** | ★ p.19, 37, 67, 83, 227 | ★★ p.29, 39, 152, 161–167 | ★ p.xiii, 6, 67–68 | — | Acteurs (11S p.161–167), attributs/association (11S p.166) |
| **2.3** | ★★ p.70–85, 113, 290 | ★★ p.6–7, 125, 147, 204, 213–215, 231–233 | ★★ p.6–7, 37–42, 71–79, 123 | ★ p.13–15 | Kill chain/APT (DSH p.6–7), phishing (SN p.83–85), OT/SCADA (DSH p.123) |
| **2.4** | ★★ p.18, 54, 159–164, 171 | ★★ p.15, 35, 44, 205, 227, 232 | ★★ p.81–83, 96–97, 102–105, 143–145, 169 | — | Patch/EOL (SN p.159), secrets codés en dur (DSH p.96–97), shadow IT (11S p.145) |
| **2.5** | ★★★ p.69–103, 127, 178–181 | ★★ p.19, 129–137, 155, 193–198, 204, 216 | ★★ p.217–222, 228–231 | ★ p.19–20, 28–29 | Malwares (SN p.69–80), IOC (SN p.127 ; 11S p.19), attaques réseau (SN p.91–103) |
| **2.6** | — (IA défensive seulement p.109, 196–197) | — (ML défensif p.193, 264) | — | — | **Aucun livre ne couvre les menaces liées à l'IA** |

### Domaine 3 — Security Architecture (19 %)

| Obj. | SOC Notes | 11 Strategies | Defensive HB | Networking | Meilleures références |
|---|---|---|---|---|---|
| **3.1** | ★★ p.3, 55–58, 285–292 | ★★ p.36, 143, 225–233, 280–282 | ★★ p.65, 81, 155–167 | ★ p.12–14 | Zones (SN p.55–58), cloud (SN p.285–292), air-gap/SDN (DSH p.81, 164) |
| **3.2** | ★★★ p.9, 31–32, 55–59, 132–138, 153, 163 | ★★ p.35, 38, 205, 223–225, 230–231, 274–280 | ★★★ p.56, 84–85, 132, 148–149, 155–167, 160–162 | ★★ p.13–14 | Placement (SN p.56–57), bastion/OOB (DSH p.148–149), fail-open (11S p.208, 222) |
| **3.3** | ★★ p.50–51, 108, 113–114, 117, 187, 245 | ★ p.34, 44, 130, 183, 191, 227, 259, 280 | ★★ p.13–14, 59–60, 61–68, 119–122 | — | Classification + owner/custodian (DSH p.13), états (DSH p.59–60), conformité (DSH p.62–64) |
| **3.4** | ★ p.12, 73, 133–134, 192, 253, 287 | ★★ p.95–97, 200, 282, 316 | ★★★ p.53–60 | — | RPO/RTO/BCP/DR (DSH p.53–54), warm standby (DSH p.55), dépendances (DSH p.57), COOP (11S p.95–97) |

### Domaine 4 — Security Operations (27 %)

| Obj. | SOC Notes | 11 Strategies | Defensive HB | Networking | Meilleures références |
|---|---|---|---|---|---|
| **4.1** | ★★★ p.13–16, 55–59, 104–158, 181–182 | ★★★ p.44, 183, 197–205, 213–216, 223–225, 339–343 | ★★ p.103–133, 145–150, 155–167, 215–223 | ★ p.15–20 | IDS/IPS (DSH p.215–223), EDR/DLP (11S p.198–204), honeypot/canary (DSH p.96, 189 ; 11S p.204, 340) |
| **4.2** | ★★ p.104–105, 159–161, 241–242 | ★★ p.36–37, 411–418 | ★★★ p.13–23 | — | Cycle de vie (DSH p.15), composite inventory (11S p.36–37), destruction (DSH p.15) |
| **4.3** | ★★★ p.159–166, 241–242 | ★★ p.15, 35, 109, 129–130, 315 | ★★★ p.169–178 | — | Scans authentifiés (DSH p.170–172), remédiation/acceptation (DSH p.173–177) |
| **4.4** | ★★★ p.190–224, 281–284 | ★★★ p.19–22, 183, 186–191, 208–212, 243–259 | ★★★ p.147, 156, 215–223, 225–232 | ★★ p.21–29 | SIEM (11S p.243), tuning (11S p.187–189), NetFlow (11S p.209), lecture de logs (DSH p.228–231) |
| **4.5** | ★★ p.25, 86–90, 121, 153–154, 289 | ★★ p.37–39, 46, 200, 230, 266, 275, 279–280 | ★★★ p.83–88, 122, 125–142, 152, 166 | — | MFA (DSH p.137–141), FGPP (DSH p.133–136), ICAM/SAML/OAuth (11S p.38–39) |
| **4.6** | ★★ p.40, 111, 171, 196–198, 230, 296 | ★★★ p.21–22, 130–131, 201, 228, 270–273, 404 | ★★ p.18, 102–103, 113–115, 172 | — | SOAR (SN p.197 ; 11S p.270–273), CI/CD (11S p.228), guardrails/reversibilité (11S p.272) |
| **4.7** | ★★★ p.126, 167–168, 228–231, 246–277 | ★★★ p.125–149, 319–356 | ★★★ p.45–52 | — | Cycle IR (SN p.167 ; DSH p.45–48 ; 11S p.127), PIR (11S p.142–143), tabletop (11S p.352) |
| **4.8** | ★★ p.90, 103, 116–117, 193–196, 269–271 | ★★★ p.133–136, 143–144, 348–351, 407–410 | ★★ p.47, 49–52 | ★★★ p.21–31 | Forensique (11S p.348–351), volatilité (11S p.351), investigation d'alerte (NF p.28–29) |

### Domaine 5 — Security Program Management and Oversight (14 %)

| Obj. | SOC Notes | 11 Strategies | Defensive HB | Networking | Meilleures références |
|---|---|---|---|---|---|
| **5.1** | ★★ p.56, 91, 182–188 | ★★ p.41–45, 128, 400–406 | ★★★ p.1–5, 25–35, 45–60 | — | Politique/standard/procédure (DSH p.25–34), charte SOC (11S p.42) |
| **5.2** | ★★ p.19, 160, 183–185 | ★ p.103, 229, 280, 308 | ★★★ p.3–5, 57, 175–177 | — | 4 étapes (DSH p.3–5), traitements (DSH p.4), risk acceptance (DSH p.177) |
| **5.3** | ★ p.20, 105, 121, 154, 170, 294 | ★★ p.34, 45, 184, 200, 272, 308, 321, 329, 337–339 | ★ p.76, 84, 96, 148, 156, 160 | — | SLA/SLO (11S p.45, 303), NDA (11S p.308), ROE (11S p.321, 339), lock-in (11S p.200) |
| **5.4** | ★★ p.50–51, 113–114, 185–188 | ★ p.33–34, 44, 137–138, 259, 280 | ★★★ p.61–69 | — | PCI/HIPAA/GLBA/FERPA/SOX (DSH p.62–64), frameworks (DSH p.65–66) |
| **5.5** | ★★ p.65–69, 168, 171, 186, 233–238 | ★★★ p.126–127, 167–168, 308, 328–332, 352 | ★★ p.169–172, 187–213 | — | ATT&CK/Kill Chain/Diamond (11S p.167), pen test (SN p.171), red/purple/BAS (11S p.328–339) |
| **5.6** | ★ p.81–82, 96–97, 104, 261, 293–294 | ★★ p.16, 153, 315, 352–356, 403 | ★★★ p.37–43, 241 | — | Gamification/métriques (DSH p.39–42), formation/phishing (11S p.315) |

### Bilan quantitatif de couverture (27 objectifs)

| Niveau | Nombre | Objectifs |
|---|---|---|
| ★★★ Bien couverts | **9** | 2.1, 2.5, 3.2, 4.1, 4.3, 4.4, 4.7, 4.8, 5.1 (selon livre dominant) |
| ★★ Moyennement | **13** | 1.1, 1.2, 2.3, 2.4, 3.1, 3.3, 4.2, 4.5, 4.6, 5.2, 5.3, 5.4, 5.5 |
| ★ Faiblement | **4** | 1.3, 2.2, 3.4, 5.6 |
| — Absent | **1** | **2.6 (menaces liées à l'IA)** |

> Nuance : 3.4 est « faible » dans les livres mais très bien traité par le *Defensive Security Handbook* pour RTO/RPO — le niveau tient compte des sous-notions manquantes (sites chaud/froid, UPS, MTTR/MTBF).

---

## Partie E — Lacunes et contenus hors programme (étapes 5 et 6)

### E.1 Lacunes critiques à rédiger (aucune source dans les 4 livres)

| Priorité | Objectif | Sous-notions absentes de tous les livres |
|---|---|---|
| **P0** | **2.6** | Manipulation de modèle, poisoning, prompt injection, perte de données, biais, explicabilité, hallucinations, jailbreaking, évasion, confidentialité, éthique, détournement de session, exécution de code. *(Les livres parlent de l'IA comme outil défensif, jamais comme menace.)* |
| **P0** | **1.3** | Key escrow, CRL, OCSP, CSR, wildcard, root of trust, niveaux de chiffrement (partition, volume, base, enregistrement), obfuscation. |
| **P0** | **1.1** | Catégories de contrôles (technical/logical, managerial, physical, operational) et types (preventive, deterring, corrective, detective, compensating, directive). |
| **P0** | **3.3** | Masquage, tokenisation, transposition, déidentification, géofencing, rôles data owner/custodian/steward/operator/controller/subprocessor, cycle de vie complet. |
| **P0** | **5.2** | SLE, ALE, ARO, registre des risques, BIA, appétence au risque, risque résiduel (les livres ont le qualitatif, pas le quantitatif). |
| **P1** | **3.4** | Sites hot/cold/warm nommés, UPS/RPS/générateur/parasurge, MTTR/MTBF, autoscaling, immutabilité des sauvegardes. |
| **P1** | **4.1** | WAF/UTM, DLP, EDR/XDR, DMARC/SPF/DKIM/BIMI, secrets scanning, code signing, SELinux, honeyfile/honeytoken/honeynet. |
| **P1** | **2.3 / 2.5** | Quishing, deepfake, QR codes, RCS, Bluetooth/RF/NFC, fileless malware, TOC/TOU, LLM comme surface d'attaque, dépôts/stockage objet publics. |
| **P1** | **4.5** | SAML, OAuth, passkeys, passwordless, modèles rule/time/mandatory/discretionary/JIT, revue d'accès. |
| **P2** | **5.3** | RFP/RFI/RFQ/EOI, MSA/SOW, droit d'audit, vendor lock-in, registre des tiers. |
| **P2** | **5.4** | Attestations, droit à l'oubli, opt-in/opt-out, legal hold, conséquences (sanctions, perte de licence). |
| **P2** | **5.6** | Typologie initial/continu/ciblé/correctif, LMS, BEC, télétravail, OPSEC. |

**Approche approuvée :** rédiger ces contenus à partir du **référentiel officiel lui-même** et de références publiques faisant autorité (NIST SP 800-207, NIST SP 800-63B, MITRE ATT&CK, OWASP, CISA). Chaque fiche portera la mention explicite : `Source : référentiel SY0-801 §X.Y — aucun des 4 livres fournis`.

### E.2 Contenus hors programme à exclure

| Livre | Contenus à exclure des cours SY0-801 |
|---|---|
| SOC Analyst Notes | Interfaces QRadar/FortiGate/Sophos/Splunk/LogRhythm/Exabeam/ArcSight, questions d'entretien et objectifs de carrière, modèle OSI détaillé, DORA/ARP/RARP, table exhaustive des ports, commandes CMD, KPI/SLA opérationnels, EPS et stockage SIEM, noms de groupes de hackers et dates d'attaques. |
| 11 Strategies | Structures organisationnelles de SOC (centralisé/fédéré/distribué), RH (recrutement, rétention, dimensionnement), outsourcing/insourcing et budgets, 24×7 et follow-the-sun, production de CTI (STIX/TAXII, TIP, OSINT), administration SIEM/EDR/SOAR, reverse engineering malware, forensique avancée, MITRE Engage/CALDERA/Cobalt Strike, histoire du SOC. |
| Defensive Security Handbook | OSINT opérationnel (Maltego, recon-ng, Shodan, Google Dorks), syntaxes de commandes (nmap, authconfig, pmemsave…), règles Snort écrites à la main, EMET (retiré du support en 2018), administration AD avancée (FSMO, SID filtering, LDIFDE), langages de programmation et SDLC détaillé, DNSSEC/RPZ, sécurité par obscurité, listes de ressources. |
| Networking Fundamentals | Exercices d'entretien « rapid fire », tableaux de révision manuscrits, détails de syntaxe des commandes Windows. Conserver uniquement les notions réseau utiles comme prérequis à 4.8. |

### E.3 Erreurs des livres à ne pas reproduire (exemples vérifiés)

| Livre / page | Erreur | Correction à appliquer dans le cours |
|---|---|---|
| SOC Notes p.35–36 | `198.168` | `192.168` |
| SOC Notes p.102 | POODLE attribué à Oracle Database | POODLE = attaque générique sur SSLv3 |
| SOC Notes p.111–112 | EDR = « next generation firewall » | Faux : l'EDR est un agent endpoint |
| SOC Notes p.116, 181, 252 | Faux positif / vrai positif et true/false negative inversés | Incident réel bloqué = **vrai positif** ; incident réel non détecté = **faux négatif** |
| SOC Notes p.178 | OWASP Top 10 A11/A12 | Le Top 10 2021 s'arrête à A10 |
| SOC Notes p.169 | NIST CSF : « Detect, Identify, Respond, Protect, Recover » | Identify, Protect, Detect, Respond, Recover (+ Govern en v2.0) |
| SOC Notes p.170 | STRIDE : I = Integrity | I = **Information disclosure** |
| SOC Notes p.162, 178 | CVE = « exposure », CWE = « exploitation » | **Enumeration / Weakness Enumeration** |
| SOC Notes p.46–47 | DMARC décrit comme certificat | DMARC = Domain-based Message Authentication, Reporting, and Conformance |
| Defensive HB p.131 | 3DES et SHA-224 recommandés « jusqu'en 2030 » | 3DES déprécié ; SHA-256/384/512 recommandés |
| Defensive HB p.133–136 | Rotation des mots de passe à 30 jours | NIST SP 800-63B : privilégier longueur + vérification de fuite |
| Defensive HB p.89 | EMET recommandé | Produit retiré du support (2018) → Windows Defender Exploit Guard |
| 11 Strategies p.168 | Tableau ATT&CK v10 avec 11 tactiques | La matrice Enterprise en compte 14 (Collection, C2, Exfiltration, Impact manquants) |
| 11 Strategies p.33 | « HIPPA » | HIPAA |
| 11 Strategies p.104 | « SSAML » | SAML |

### E.4 Bibliographie corrigée à utiliser dans l'application

1. Azam Shaik, *Cyber Security — SOC Analyst Notes*, 296 p.
2. Kathryn Knerler, Ingrid Parker, Carson Zimmerman, *11 Strategies of a World-Class Cybersecurity Operations Center*, 2ᵉ éd., MITRE, 2022, 452 p.
3. Lee Brotherston, Amanda Berlin, *Defensive Security Handbook — Best Practices for Securing Infrastructure*, O'Reilly, 2017, 284 p.
4. CyberSecXperts, *Networking Fundamentals — SOC Analyst Edition*, 35 p. (PDF scanné, OCR).
5. CompTIA, *Security+ SY0-801 V8 Exam Objectives*, Document Version 2.0, 2025.

---

## Partie F — Programme pédagogique complet (étape 6)

### F.1 Les 10 méthodes pédagogiques retenues

| Méthode | Principe | Objectifs types |
|---|---|---|
| 1. Cours interactif | Blocs texte + définitions + exemples, navigation interne, badges de source | Tous |
| 2. Explication simple puis détaillée | Niveau « débutant » repliable puis niveau « technique » | 1.1, 1.3, 2.1, 3.4, 5.2 |
| 3. Schéma interactif | SVG cliquable avec états et animations | 1.1, 2.3, 3.2, 4.1, 4.7 |
| 4. Exemple concret | Scénarios fictifs avec données réalistes | Tous |
| 5. Démonstration technique | Procédure pas-à-pas simulée (logs, commandes, ticket) | 4.3, 4.4, 4.5, 4.8 |
| 6. Flashcards | Cartes avec répétition espacée (SM-2) | Taxonomies, acronymes, définitions |
| 7. Quiz de compréhension | QCM avec correction + explication + source | Tous |
| 8. Exercice pratique | Environnement simulé, données fictives, décisions à prendre | 2.5, 3.2, 4.1, 4.3, 4.8 |
| 9. Simulation de situation | Incident filé avec événements et choix | 4.7, 4.8 |
| 10. Évaluation par scénario | Mise en situation complète notée avec grille | Domaines 2, 3, 4, 5 |

### F.2 Programme par domaine et objectif

> Chaque ligne précise : le cours, les méthodes associées, l'exercice/l'évaluation, et les sources (Livre, page).

#### Domaine 1 — General Security Concepts (16 %)

**1.1 — Concepts et contrôles de sécurité**
- Cours : CIA, AAA, non-répudiation, zero trust, least privilege, défense en profondeur ; catégories de contrôles ; types de contrôles.
- Méthodes : cours interactif + **schéma interactif « Triade CIA + couches de contrôles »** (cliquer une couche affiche sa catégorie et son type) + flashcards (taxonomie) + quiz (6 q.).
- Exercice : « Quel contrôle pour quel risque ? » — 8 situations à classer (catégorie + type).
- Sources : SOC Notes p.11–12, 25, 59, 184–185 ; 11 Strategies p.32, 38–39, 230–231, 238 ; Defensive HB p.53, 71, 141, 152, 156, 165. **Taxonomie à rédiger (lacune P0).**

**1.2 — Gestion des changements**
- Cours : CAB, approbation, propriété, parties prenantes, analyse d'impact, tests, backout, fail forward, fenêtre de maintenance, SOP, allow/deny lists, documentation, version control.
- Méthodes : cours + démonstration « une demande de changement de A à Z » (simulation de ticket) + flashcards + quiz.
- Exercice : analyser une demande de changement incomplète et identifier les étapes manquantes.
- Sources : SOC Notes p.38–40, 135–136, 168, 238 ; 11 Strategies p.35–36, 130–132, 203, 400–404 ; Defensive HB p.17, 27, 34, 104, 144, 172, 175.

**1.3 — Solutions cryptographiques**
- Cours : PKI, certificats, CRL/OCSP, CSR, wildcard, root of trust ; symétrique/asymétrique ; niveaux de chiffrement ; signatures numériques ; salting ; hachage ; obfuscation.
- Méthodes : cours en 2 niveaux + **schéma interactif « échange de clés et chaîne de certificats »** + flashcards (algorithmes) + quiz.
- Exercice : choisir la solution cryptographique adaptée à 6 scénarios (email, disque, base, transport, intégrité, mot de passe).
- Sources : SOC Notes p.117, 172–177 ; Defensive HB p.119–122, 129–131 ; 11 Strategies p.104, 134, 183, 196–197, 227, 278. **CRL/OCSP/CSR/escrow à rédiger (lacune P0).**

#### Domaine 2 — Threats, Vulnerabilities, and Attacks (24 %)

**2.1 — Caractéristiques des menaces et vulnérabilités**
- Cours : threat feeds, likelihood, impact, sources de renseignement, cycle de vie, CVSS, CVE, priorisation.
- Méthodes : cours + schéma « qui fait quoi dans le renseignement » + flashcards CVSS/CVE + quiz.
- Exercice : calculer/interpréter un score CVSS et prioriser 5 vulnérabilités.
- Sources : SOC Notes p.18–19, 160–163, 196 ; 11 Strategies p.23–24, 129–130, 151–168 ; Defensive HB p.3–5, 175–177.

**2.2 — Acteurs malveillants et motivations**
- Cours : 8 catégories d'acteurs, motivations, attributs interne/externe, ressources, sophistication.
- Méthodes : cours + flashcards (acteur ↔ motivation) + **scénario d'attribution** + quiz.
- Exercice : à partir d'un profil d'attaque, identifier l'acteur probable et justifier.
- Sources : 11 Strategies p.29, 39, 152, 161–167 ; SOC Notes p.19, 37, 67, 227 ; Defensive HB p.xiii, 6, 67–68. **Taxonomie à compléter (lacune).**

**2.3 — Vecteurs et sources de menaces**
- Cours : APT, message-based, image/QR, pièces jointes, browser, réseau, accès distant, endpoint, supply chain, médias, humain, IoT, OT, physique, signaux.
- Méthodes : **schéma interactif « mappe des vecteurs »** (15 branches cliquables) + cours + flashcards + quiz.
- Exercice : classer 10 situations dans le bon vecteur.
- Sources : SOC Notes p.70–85, 113, 290 ; 11 Strategies p.6–7, 125, 147, 204, 213–215, 225, 231–233 ; Defensive HB p.6–7, 37–42, 71–79, 123. **QR/Bluetooth/NFC/RCS à rédiger.**

**2.4 — Types de vulnérabilités et surfaces d'attaque**
- Cours : produits non supportés/non patchés/obsolètes/non gérés, ports/services, applications (TOC/TOU), code (secrets, exceptions), OS, virtualisation, zero-day, crypto, identifiants, rogue devices, shadow IT, sans-fil, LLM, IdP, mobile, mauvaise config, dépôts/stockage publics.
- Méthodes : cours + exercice de repérage sur une « architecture à trous » + flashcards + quiz.
- Sources : SOC Notes p.18, 54, 159–164, 171 ; 11 Strategies p.15, 35, 44, 205, 227, 232 ; Defensive HB p.81–83, 96–97, 102–105, 143–145, 169.

**2.5 — Indicateurs d'activité malveillante**
- Cours : 11 familles de malwares, attaques physiques/réseau/sociales/applicatives/d'identifiants, IOC.
- Méthodes : cours + **schéma interactif « d'un indicateur à l'attaque »** + flashcards + quiz + **exercice pratique « analyse d'une alerte »**.
- Exercice : à partir de logs fictifs (IP externe, port 4444, requête DNS suspecte, `powershell.exe`), identifier l'attaque, les IOC et les contrôles à appliquer.
- Sources : SOC Notes p.69–103, 127, 178–181 ; 11 Strategies p.19, 129–137, 155, 177, 193–198, 204, 216 ; Defensive HB p.217–222, 228–231 ; Networking p.19–20, 28–29. **Fileless, quishing, deepfake à rédiger.**

**2.6 — Menaces liées à l'IA**
- Cours : 13 notions du référentiel.
- Méthodes : cours + **démonstration « prompt injection vs poisoning »** (exemples fictifs) + flashcards + quiz + **scénario d'évaluation**.
- Exercice : identifier le type de menace IA dans 6 cas (chatbot, modèle empoisonné, sortie erronée, contournement de garde-fou…).
- Sources : **référentiel SY0-801 §2.6 uniquement — aucun livre ne couvre ce sujet.**

#### Domaine 3 — Security Architecture (19 %)

**3.1 — Modèles d'architecture**
- Cours : cloud (serverless, multicloud, hybride/privé/public/communauté), IaC, OT, on-prem, air-gapped, microservices, segmentation logique/physique ; considérations techniques et métier.
- Méthodes : **schéma interactif comparatif des modèles de déploiement** + cours + flashcards + quiz.
- Sources : SOC Notes p.3, 55–58, 285–292 ; 11 Strategies p.36, 143, 225–233, 280–282 ; Defensive HB p.65, 81, 155–167 ; Networking p.12–14. **IaC/microservices à compléter.**

**3.2 — Protection de l'infrastructure**
- Cours : placement, zones, surface d'attaque, diversité, zero trust, gestion des appareils, contrôle applicatif, VPN, tunnelisation, gestion utilisateur, messagerie chiffrée, hors-bande, transfert de fichiers, SSE, gMSA, privilege creep, modes de défaillance.
- Méthodes : **schéma interactif « architecture Zero Trust »** + exercice de placement de contrôles + quiz.
- Sources : SOC Notes p.9, 31–32, 55–59, 108, 121, 132–138, 153, 163 ; 11 Strategies p.35, 38, 205, 223–225, 230–231, 274–280 ; Defensive HB p.56, 84–85, 132, 148–149, 155–167 ; Networking p.13–14. **SSE/gMSA à rédiger.**

**3.3 — Protection des données**
- Cours : types et états, classifications, méthodes de sécurisation, rôles, manipulation, cycle de vie, conformité.
- Méthodes : cours + **tableau interactif « état/classification/méthode »** + flashcards rôles + quiz.
- Exercice : attribuer la méthode de protection adaptée à 8 types de données.
- Sources : SOC Notes p.50–51, 108, 113–114, 117, 187, 245 ; 11 Strategies p.34, 44, 130, 183, 191, 227, 259, 280 ; Defensive HB p.13–14, 59–60, 61–68, 119–122. **Masquage/tokenisation/rôles à rédiger (lacune P0).**

**3.4 — Résilience et récupération**
- Cours : sites, diversité, redondance, stockage, sauvegardes, tests, PRA, continuité, capacité, métriques RTO/RPO/MTTR/MTBF.
- Méthodes : cours + **schéma interactif « RPO/RTO dans le temps »** + simulation « panne et failover » + quiz.
- Exercice : dimensionner une stratégie de reprise à partir de contraintes RTO/RPO.
- Sources : Defensive HB p.53–60 (excellent) ; 11 Strategies p.95–97, 200, 282, 316 ; SOC Notes p.12, 73, 133–134, 192, 253, 287. **Sites chaud/froid, UPS, MTBF à rédiger.**

#### Domaine 4 — Security Operations (27 %)

**4.1 — Contrôles et techniques de protection**
- Cours : segmentation, contrôles d'accès, hardening, sandboxing, déception, monitoring, MDM, application control, IDS/IPS, firewalls, DLP, endpoint security, NAC, repositories, app security, email security, OS security.
- Méthodes : **schéma interactif « pile de contrôles »** + cours + flashcards (NIDS/HIDS/IPS/WIPS/WAF/UTM/EDR/XDR) + quiz + exercice « choisir le contrôle ».
- Sources : SOC Notes p.13–16, 55–59, 104–158, 181–182 ; 11 Strategies p.44, 183, 197–205, 213–216, 223–225, 339–343 ; Defensive HB p.96, 103–133, 145–150, 155–167, 189, 215–223. **WAF/UTM/DLP/EDR/XDR/DMARC/SPF/DKIM/BIMI à rédiger.**

**4.2 — Gestion des actifs**
- Cours : cycle de vie, planification, acquisition, affectation, suivi, mise au rebut.
- Méthodes : cours + démo « inventaire composite » + flashcards + quiz.
- Sources : Defensive HB p.13–23 ; 11 Strategies p.36–37, 411–418 ; SOC Notes p.104–105, 159–161, 241–242.

**4.3 — Gestion des vulnérabilités**
- Cours : identification (scanning, IPAM, CSPM, revue de code), priorisation, remédiation, vérification, reporting, bounty, divulgation responsable.
- Méthodes : **démonstration technique « scanner → ticket → patch → re-scan »** + exercice pratique + flashcards + quiz.
- Sources : Defensive HB p.169–178 ; SOC Notes p.159–166, 241–242 ; 11 Strategies p.15, 35, 109, 129–130, 315. **IPAM/CSPM à rédiger.**

**4.4 — Surveillance et alertes**
- Cours : ressources surveillées, activités (agrégation, alertes, scan, archivage, tuning), outils, protocoles (NetFlow, SNMP, syslog, SCAP), alertes automatisées, miroir de port, dashboards.
- Méthodes : cours + **démo « lecture de logs et corrélation »** + schéma « flux de logs vers le SIEM » + flashcards + quiz.
- Sources : 11 Strategies p.19–22, 183, 186–191, 208–212, 243–259, 411–418 ; SOC Notes p.190–224, 281–284 ; Defensive HB p.147, 156, 215–232 ; Networking p.21–29. **SCAP à rédiger.**

**4.5 — Identités et accès**
- Cours : provisioning, permissions, proofing, fédération, SSO (SAML/LDAP/OAuth), types de comptes, MFA, modèles d'accès, gestion d'accès, revue, mots de passe.
- Méthodes : cours + **simulation « création et révocation d'un compte »** + flashcards + quiz.
- Sources : Defensive HB p.83–88, 122, 125–142, 152, 166 ; 11 Strategies p.37–39, 46, 200, 230, 266, 275, 279–280 ; SOC Notes p.25, 86–90, 121, 153–154, 289. **SAML/OAuth/passkeys/modèles à rédiger.**

**4.6 — Automatisation et orchestration**
- Cours : cas d'usage, considérations (guardrails, logique, complexité, risques), IA (agentic, chatbot, prédictif, baselines), résultats attendus, SecOps CI/CD, workflows.
- Méthodes : **schéma interactif « workflow SOAR »** + cours + démo « playbook de blocage d'IP » + quiz.
- Sources : 11 Strategies p.21–22, 130–131, 201, 228, 270–273, 404 ; SOC Notes p.40, 111, 171, 196–198, 230, 296 ; Defensive HB p.18, 102–103, 113–115, 172. **IA agentive à rédiger.**

**4.7 — Réponse aux incidents**
- Cours : préparation, identification, investigation, containment, négociation, éradication/recovery, notification, post-incident.
- Méthodes : **simulation filée « incident ransomware »** (choix séquencés avec feedback) + cours + schéma « cycle IR » + flashcards + quiz.
- Sources : Defensive HB p.45–52 ; 11 Strategies p.125–149, 319–356 ; SOC Notes p.126, 167–168, 228–231, 246–277.

**4.8 — Investigation et analyse des preuves**
- Cours : types de logs et sources, intégrité, image système, memory dump, copie bit-à-bit, snapshot, parties prenantes, parsing.
- Méthodes : **exercice pratique « investigation d'une alerte réseau »** + démo « ordre de volatilité » + cours + quiz.
- Sources : 11 Strategies p.133–136, 143–144, 348–351, 407–410 ; SOC Notes p.90, 103, 116–117, 193–196, 269–271 ; Defensive HB p.47, 49–52 ; Networking p.21–31.

#### Domaine 5 — Security Program Management and Oversight (14 %)

**5.1 — Gouvernance, risques et conformité (artefacts)**
- Cours : guidelines, standards, SOP/runbooks, plans, politiques (BYOD, AUP, clean desk, IR, classification, accès, disposal, disclosure, privacy).
- Méthodes : cours + **exercice « policy vs standard vs procedure »** + flashcards + quiz.
- Sources : Defensive HB p.1–5, 25–35, 45–60 ; 11 Strategies p.41–45, 128, 400–406 ; SOC Notes p.56, 91, 182–188.

**5.2 — Gestion des risques**
- Cours : identification, évaluation, analyse (impact, likelihood, qualitatif/quantitatif), registre, traitement, BIA, appétence, risque résiduel, SLE/ALE/ARO.
- Méthodes : cours + **simulation « calcul SLE/ALE/ARO et choix de traitement »** + schéma « matrice de risque » + quiz.
- Sources : Defensive HB p.3–5, 57, 175–177 ; SOC Notes p.19, 160, 183–185 ; 11 Strategies p.103, 229, 280, 308. **Quantitatif à rédiger (lacune P0).**

**5.3 — Risques liés aux prestataires**
- Cours : sélection (RFP/RFI/RFQ/EOI, due diligence), types d'accords (SLA, SLO, MOU, MOA, NDA, MSA, SOW), monitoring, limites, rules of engagement.
- Méthodes : cours + **simulation « choisir le contrat et les clauses »** + flashcards + quiz.
- Sources : 11 Strategies p.34, 45, 184, 200, 272, 303, 308, 321, 329, 337–339 ; SOC Notes p.20, 105, 121, 154, 170, 294 ; Defensive HB p.76, 84, 96, 148, 156, 160. **RFP/MSA/SOW à rédiger.**

**5.4 — Conformité**
- Cours : formation, monitoring, conséquences, privacy, conformité légale.
- Méthodes : cours + **tableau comparatif interactif des réglementations** + flashcards + quiz.
- Sources : Defensive HB p.61–69 ; SOC Notes p.50–51, 113–114, 185–188 ; 11 Strategies p.33–34, 44, 137–138, 259, 280. **Attestations/legal hold à rédiger.**

**5.5 — Audits et évaluations**
- Cours : collecte de données, cadrage, types d'engagement, penetration testing, frameworks, tests fonctionnels/comportementaux, MITRE ATT&CK, Cyber Kill Chain, Diamond Model.
- Méthodes : **schéma interactif « les 3 frameworks d'analyse d'intrusion »** + cours + démo « reconnaissance passive vs active » + quiz.
- Sources : 11 Strategies p.126–127, 167–168, 308, 328–332, 352 ; SOC Notes p.65–69, 168, 171, 186, 233–238 ; Defensive HB p.169–172, 187–213.

**5.6 — Sensibilisation à la sécurité**
- Cours : types de formation, canaux de diffusion, reporting/efficacité, sujets courants.
- Méthodes : cours + **simulation « campagne de phishing interne »** (métriques fictives) + flashcards + quiz.
- Sources : Defensive HB p.37–43, 241 ; 11 Strategies p.16, 153, 315, 352–356, 403 ; SOC Notes p.81–82, 96–97, 104, 261, 293–294. **LMS/BEC/télétravail/OPSEC à rédiger.**

---

## Partie G — Architecture et technologies proposées (étape 7)

### G.1 Choix technologique

| Critère | Décision |
|---|---|
| Technologie | **Electron + React + TypeScript + Vite** |
| UI | React, CSS personnalisé (thème sombre « cybersécurité »), SVG natif pour les schémas |
| Contenus | Fichiers TypeScript/JSON typés, un par objectif, sous `src/content/` |
| Progression | `electron-store` (fichier JSON local dans `userData`), avec couche d'abstraction pour migration ultérieure vers SQLite |
| Recherche | Index en mémoire construit au démarrage (recherche plein texte hors ligne) |
| Flashcards | Algorithme SM-2 (répétition espacée) |
| Packaging | `electron-builder` → `.exe` (installateur NSIS + version portable) |
| Connexion réseau | **Aucune** : tout est embarqué, fonctionnement hors ligne |

**Pourquoi ce choix ?** Node.js 26 et npm sont disponibles sur la machine. Electron permet une interface riche (schémas SVG interactifs, états, animations), un thème sombre soigné, un fonctionnement 100 % hors ligne, une maintenance simple (un seul langage pour l'UI et le contenu) et une distribution Windows directe en `.exe`.

**Alternatives écartées :**
- *Tauri* (plus léger, ~10 Mo) : nécessite Rust, non installé sur la machine.
- *WPF / WinUI 3* : nécessite le SDK .NET, non installé.
- *Python + PySide/PyWebEngine* : packaging plus lourd et interface moins souple pour les schémas interactifs.

> Remarque : un exécutable Electron pèse typiquement 150–250 Mo. Si la légèreté est prioritaire absolue, je peux basculer sur Tauri après installation de Rust — à valider avec vous.

### G.2 Structure du projet

```
secplus-platform/
├── src/
│   ├── main/              # Process Electron (fenêtre, stockage, export/import)
│   ├── ui/                # Composants React
│   │   ├── Dashboard.tsx        # 5 domaines + progression
│   │   ├── DomainNav.tsx        # Navigation par objectif (27)
│   │   ├── LessonRenderer.tsx   # Blocs de cours + badges de source
│   │   ├── diagrams/            # Schémas SVG interactifs
│   │   ├── Flashcards.tsx
│   │   ├── Quiz.tsx
│   │   ├── Exercise.tsx
│   │   ├── Scenario.tsx
│   │   ├── Search.tsx
│   │   └── Progress.tsx
│   ├── content/           # SOURCE DE VÉRITÉ pédagogique
│   │   ├── objectives/1.1.ts ... 5.6.ts
│   │   ├── sources.ts           # Livres, pages, citations
│   │   └── types.ts
│   ├── engine/            # Progression, SM-2, scores, états d'exercice
│   └── persistence/       # electron-store + import/export JSON
├── electron-builder.yml
└── package.json
```

### G.3 Schéma de données du contenu (source de vérité)

```ts
type SourceRef = {
  book: 'soc-notes' | '11-strategies' | 'defensive-hb' | 'networking' | 'objectives';
  page: number | string;
  quote?: string;
  printedPage?: number; // pour 11 Strategies et Defensive HB
};

type ContentBlock =
  | { type: 'heading'; text: string }
  | { type: 'text'; text: string; source: SourceRef[] }
  | { type: 'definition'; term: string; definition: string; source: SourceRef[] }
  | { type: 'example'; title: string; body: string; source: SourceRef[] }
  | { type: 'diagram'; id: string }
  | { type: 'demo'; steps: string[]; source: SourceRef[] }
  | { type: 'callout'; kind: 'exam' | 'warning' | 'gap'; text: string };

type ObjectiveContent = {
  id: '1.1' | ... | '5.6';
  domain: 1 | 2 | 3 | 4 | 5;
  title: string;
  weight: number;
  coverage: 'source-backed' | 'gap' | 'mixed';
  lessons: ContentBlock[];
  flashcards: { front: string; back: string; source: SourceRef[] }[];
  quiz: { question: string; choices: string[]; answer: number; explanation: string; source: SourceRef[] }[];
  exercises: ExerciseDef[];
  scenarios: ScenarioDef[];
  sources: SourceRef[];
};
```

**Règle absolue :** tout bloc `text`, `definition`, `example` ou `demo` doit porter au moins une `SourceRef`. Les contenus rédigés pour combler une lacune portent `source: [{ book: 'objectives', page: '§X.Y' }]` et l'indicateur `coverage: 'gap'`.

### G.4 Suivi de progression

- Statut par objectif : `non commencé` / `en cours` / `terminé` ;
- Score par quiz, historique des tentatives ;
- Flashcards : intervalle SM-2, prochaine échéance, facilité ;
- Résultats d'exercices et de scénarios ;
- Export/import d'un fichier JSON (sauvegarde locale) ;
- Tableau de bord : anneaux de progression par domaine, temps de révision dû, objectifs faibles.

---

## Partie H — Périmètre du premier prototype (étape 9)

Le prototype sera **réellement utilisable**, pas une maquette. Il contiendra exactement les 10 éléments demandés :

| # | Élément demandé | Implementation concrète dans le prototype |
|---|---|---|
| 1 | Tableau de bord 5 domaines | 5 cartes avec poids officiels (16/24/19/27/14 %) et anneaux de progression |
| 2 | Navigation par objectifs officiels | Barre latérale : 5 domaines → 27 objectifs numérotés, avec filtres et statut |
| 3 | Plusieurs cours complets, domaines différents | **4 cours complets** : **1.1** (domaine 1), **2.5** (domaine 2), **3.4** (domaine 3), **4.7** (domaine 4) + une leçon courte **2.6** démontrant le traitement des lacunes |
| 4 | Au moins un schéma interactif | **« Chaîne d'une attaque et points de contrôle »** : SVG cliquable (vecteur → indicateur → détection → contrôle), chaque nœud affichant définition + source ; second schéma « RPO/RTO » dans le cours 3.4 |
| 5 | Flashcards | **24 cartes** couvrant les 4 cours + 2.6, avec SM-2 et bouton « Je sais / Je ne sais pas » |
| 6 | Quiz avec correction et explication | **2 quiz de 6 questions** (1.1 et 2.5), correction immédiate, explication et citation source avec page |
| 7 | Exercice pratique | **« Analyse d'une alerte réseau »** : logs fictifs (IP `185.x.x.x`, port 4444, DNS suspect, `powershell.exe`, échecs SSH) → identifier attaque, IOC, contrôles ; données fictives, environnement simulé |
| 8 | Scénario de mise en situation | **« Incident ransomware : ordonner les actions »** : 8 étapes à remettre dans l'ordre avec feedback contextualisé (préparation → identification → containment → négociation → éradication → notification → PIR) |
| 9 | Progression sauvegardée localement | `electron-store`, statuts objectifs, scores, cartes SM-2, export/import JSON |
| 10 | Références livres et pages | Badge source sur chaque bloc de cours, panneau « Sources » listant livre + page + citation courte |

**Fonctionnalités transversales du prototype :** recherche plein texte hors ligne, thème sombre, mode hors ligne total, navigation clavier de base.

**Choix des cours :** 1.1, 2.5, 3.4 et 4.7 ont été retenus car ils (a) appartiennent à 4 domaines différents, (b) sont parmi les mieux couverts par les livres, et (c) permettent de démontrer tous les types de méthodes (schéma, flashcards, quiz, exercice, scénario).

---

## Partie I — Décisions attendues avant développement (étape 8)

1. **Architecture** : validez-vous Electron + React + TypeScript avec `.exe` via electron-builder ? (ou préférez-vous Tauri, plus léger mais nécessitant l'installation de Rust ?)
2. **Lacunes** : autorisez-vous la rédigation de contenus à partir du référentiel officiel et de références publiques (NIST, MITRE, OWASP, CISA), clairement signalés comme « aucun livre source » ? Ou préférez-vous fournir un livre Security+ complémentaire ?
3. **Périmètre du prototype** : les 4 cours proposés (1.1, 2.5, 3.4, 4.7) + leçon 2.6 vous conviennent-ils ?
4. **Langue** : interface en français avec termes techniques anglais (comme dans ce document) ?
5. **PDF supplémentaires** : les exclure (recommandé) ou les intégrer comme ressources d'exercices ?

---

## Partie J — Livraison du prototype (étapes 9 à 11)

Approbation reçue le 26 novembre 2026 : stack Electron/React/TypeScript retenue, rédaction des lacunes depuis le référentiel autorisée, périmètre validé, PDF supplémentaires exclus.

**Livré :** `SecurityPlus-SY0-801/` — prototype Windows fonctionnel, exécutable `release/SecurityPlus-SY0-801-Portable-0.1.0.exe` (~106 Mo).

**Périmètre effectivement livré : 8 objectifs complets** (1.1, 1.3, 2.5, 2.6, 3.3, 3.4, 4.7, 5.2) répartis sur les 5 domaines, donc un sur-ensemble du périmètre approuvé (1.1, 2.5, 3.4, 4.7 + 2.6) — les objectifs 1.3, 3.3 et 5.2 étaient déjà présents dans le projet préexistant et ont été conservés. 20 leçons, 8 decks (176 cartes), 8 quiz, 9 exercices pratiques, 6 scénarios, 7 schémas interactifs. Les 27 objectifs et 716 sous-thèmes sont tous affichés ; les 19 autres objectifs sont cartographiés et marqués « contenu en préparation ».

**Corrections apportées au projet préexistant :** import invalide dans `DiagramView.tsx`, type `DiagramNode.kind` manquant, chargeur `loadAll` qui ne dépliait pas les leçons JSON (plantage au démarrage), scénarios et PBQ référencés mais absents, libellés de domaines tronqués, textes « six objectifs » figés, source « OBJ » absente du libellé.

**Tests :** typecheck OK, build OK, packaging OK, exécutable lancé (fenêtre active), parcours vérifiés dans le navigateur intégré sans erreur console.

### Extension approuvée (production complète)

Suite à la validation du prototype, les **19 objectifs restants** ont été produits selon la même spécification (`docs/CONTENT_SPEC.md`) puis intégrés avec `tools/integrate.py` : **27/27 objectifs complets, 0 problème de référence**.

Effectifs finaux : **64 leçons, 520 flashcards, 27 quiz, 28 exercices pratiques, 27 scénarios, 28 schémas interactifs**. Retouches visuelles demandées : fond blanc cassé, accent indigo/violet, bascule clair/sombre, animations renforcées, icône Windows personnalisée. Nouvel exe regeneré et testé.

### Transformation « centre de formation interactif »

Le tableau de bord est devenu un centre de formation : progression globale, domaines cliquables, reprise, recommandations dynamiques, résultats récents, temps, série et activité hebdomadaire — tous dérivés de l'historique réel (`Progress.history`). Les leçons utilisent un lecteur par étapes avec 8 simulations animées, feedback immédiat, répétition des notions faibles et déblocage progressif. Direction artistique : thème sombre élégant, accents cyan/bleu, animations discrètes, interface responsive et tactile. L'UI React reste réutilisable pour une future version Android sans duplication d'application.

> Le détail de l'architecture, des schémas de données et des instructions d'utilisation est dans `SecurityPlus-SY0-801/README.md`.
