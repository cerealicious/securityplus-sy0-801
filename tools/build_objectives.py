"""Genere src/content/objectives.json + domains.json a partir du referentiel officiel."""
import json, os, re

SRC = r"C:\Users\Administrator\AppData\Local\Temp\opencode\splus\data\objectives.json"
OUT = r"C:\Users\Administrator\Documents\Default Project\SecurityPlus-SY0-801\src\content"
os.makedirs(OUT, exist_ok=True)

FR_TITLES = {
 "1.1": "Expliquer les concepts et contrôles de sécurité.",
 "1.2": "Étant donné un scénario, démontrer l'impact des processus de gestion du changement sur la sécurité.",
 "1.3": "Expliquer l'importance d'utiliser des solutions cryptographiques adaptées.",
 "2.1": "Expliquer les caractéristiques des menaces et des vulnérabilités.",
 "2.2": "Décrire les acteurs de menace courants et leurs motivations.",
 "2.3": "Décrire les vecteurs et les sources de menace.",
 "2.4": "Expliquer les types de vulnérabilités et les surfaces d'attaque.",
 "2.5": "Étant donné un scénario, analyser les indicateurs d'activité malveillante.",
 "2.6": "Résumer les menaces et vulnérabilités liées à l'usage de l'intelligence artificielle.",
 "3.1": "Comparer les implications de sécurité des différents modèles d'architecture.",
 "3.2": "Étant donné un scénario, gérer l'architecture de sécurité pour mieux protéger l'infrastructure.",
 "3.3": "Résumer les concepts et stratégies utilisés pour protéger les données.",
 "3.4": "Expliquer l'importance de la résilience et de la reprise dans l'architecture de sécurité.",
 "4.1": "Étant donné un scénario, appliquer des contrôles, techniques et solutions d'atténuation pour sécuriser l'environnement.",
 "4.2": "Expliquer les implications de sécurité d'une gestion correcte des actifs matériels, logiciels et de données.",
 "4.3": "Étant donné un scénario, réaliser les tâches associées à la gestion des vulnérabilités.",
 "4.4": "Expliquer les concepts et outils d'alerte et de supervision de sécurité.",
 "4.5": "Étant donné un scénario, appliquer les concepts liés à la gestion des identités et des accès.",
 "4.6": "Étant donné un scénario, appliquer des solutions d'automatisation et d'orchestration pour sécuriser les opérations.",
 "4.7": "Résumer les concepts associés aux activités de réponse aux incidents.",
 "4.8": "Étant donné un scénario, exploiter des données, artefacts et sources pour appuyer une investigation de sécurité.",
 "5.1": "Expliquer l'importance des artefacts de gouvernance, de risque et de conformité.",
 "5.2": "Expliquer l'impact des processus de gestion des risques sur la sécurité de l'organisation.",
 "5.3": "Expliquer les processus d'évaluation et de gestion associés au risque fournisseur.",
 "5.4": "Résumer les éléments d'une conformité de sécurité efficace.",
 "5.5": "Expliquer les concepts associés aux activités d'audit et d'évaluation.",
 "5.6": "Étant donné un scénario, appliquer les concepts de sensibilisation à la sécurité.",
}

COVERAGE = {
 "1.1": "partial", "1.2": "weak", "1.3": "weak", "2.1": "solid", "2.2": "weak",
 "2.3": "partial", "2.4": "weak", "2.5": "solid", "2.6": "absent", "3.1": "solid",
 "3.2": "solid", "3.3": "solid", "3.4": "partial", "4.1": "solid", "4.2": "partial",
 "4.3": "solid", "4.4": "solid", "4.5": "partial", "4.6": "weak", "4.7": "solid",
 "4.8": "solid", "5.1": "solid", "5.2": "partial", "5.3": "weak", "5.4": "weak",
 "5.5": "weak", "5.6": "partial",
}

SUMMARY = {
 "1.1": "CIA, AAA, non-répudiation, Zero Trust, moindre privilège, puis la double taxonomie officielle des contrôles : 4 catégories × 6 types.",
 "1.2": "Le changement est la première cause d'incident évitable. CAB, analyse d'impact, plan de retour arrière, fail forward et implications techniques.",
 "1.3": "Symétrique, asymétrique, hachage, PKI, certificats, révocation, signatures. L'objectif le plus lacunaire du corpus : presque tout est rédigé pour l'examen.",
 "2.1": "Flux de renseignement, probabilité, impact, sources, cycle de vie de la menace, CVSS et priorisation des vulnérabilités.",
 "2.2": "Huit profils d'acteurs, douze motivations, trois attributs. La matrice acteurs × motivations que les livres ne fournissent pas.",
 "2.3": "Quatorze familles de vecteurs, du phishing au NFC, en passant par la chaîne d'approvisionnement et les outils « living off the land ».",
 "2.4": "Systèmes, applications, identités, surfaces modernes : ce qui rend un environnement exploitable avant même qu'une attaque ne commence.",
 "2.5": "Reconnaître une attaque à ses traces : malwares, attaques réseau, ingénierie sociale, attaques applicatives, indicateurs de compromission.",
 "2.6": "Injection de prompt, empoisonnement, jailbreak, hallucination, fuite de données : les risques propres aux systèmes d'IA.",
 "3.1": "Cloud, serverless, multicloud, IaC, OT, microservices, segmentation : choisir une architecture, c'est choisir ses risques.",
 "3.2": "Zones de sécurité, Zero Trust, accès distant, SSE, gMSA, dérive des privilèges et modes de défaillance.",
 "3.3": "États, classifications, méthodes de protection, six rôles, cycle de vie et contraintes de conformité.",
 "3.4": "Sites chauds/tièdes/froids, redondance, sauvegardes immuables, tests de bascule, RTO, RPO, MTTR, MTBF.",
 "4.1": "Le catalogue complet des contrôles défensifs : segmentation, durcissement, IDS/IPS, pare-feu, DLP, EDR, NAC, SPF/DKIM/DMARC.",
 "4.2": "Le cycle de vie des actifs en six étapes, et pourquoi l'inventaire conditionne toute la sécurité.",
 "4.3": "Identifier, prioriser, remédier, vérifier, rapporter : la boucle de gestion des vulnérabilités.",
 "4.4": "Agrégation, corrélation, alerte, réglage, SIEM, NetFlow, syslog, SCAP : la chaîne de supervision.",
 "4.5": "Cycle de vie des identités, fédération, SSO, modèles de contrôle d'accès, MFA et passkeys.",
 "4.6": "Playbooks, garde-fous, gestion d'état désiré, CI/CD et IA appliquée aux opérations.",
 "4.7": "Le cycle de réponse en sept phases, du tabletop au rapport post-incident, avec les décisions difficiles.",
 "4.8": "Quelle source de données répond à quelle question, et comment préserver la valeur probante des preuves.",
 "5.1": "La pyramide documentaire : lignes directrices, normes, procédures, plans et les dix politiques officielles.",
 "5.2": "Identification, évaluation, analyse, registre, traitement, suivi — et le calcul SLE / ALE / ARO.",
 "5.3": "Sélection fournisseur, sept types d'accords, droit d'audit et limites du risque tiers.",
 "5.4": "Formation, supervision, conséquences, vie privée et obligations légales de conservation.",
 "5.5": "Collecte de preuves, cadrage, types de mission, neuf types de tests d'intrusion, cadres de référence.",
 "5.6": "Former, mesurer, cibler : concevoir un programme de sensibilisation qui change réellement les comportements.",
}

GROUP_FR = {
 ("1.1", "Defense in depth"): "Défense en profondeur",
 ("1.1", "Core security principles"): "Principes fondamentaux",
 ("1.1", "Control categories"): "Catégories de contrôles",
 ("1.1", "Control types"): "Types de contrôles",
 ("1.3", "Public key infrastructure (PKI)"): "Infrastructure à clé publique (PKI)",
 ("1.3", "Certificates"): "Certificats",
 ("1.3", "Encryption"): "Chiffrement",
 ("1.3", "Integrity and obfuscation"): "Intégrité et obscurcissement",
 ("2.5", "Malware attacks"): "Attaques par logiciels malveillants",
 ("2.5", "Physical attacks"): "Attaques physiques",
 ("2.5", "Network attacks"): "Attaques réseau",
 ("2.5", "Social engineering attacks"): "Ingénierie sociale",
 ("2.5", "Indicators of compromise"): "Indicateurs de compromission",
 ("2.5", "Application attacks"): "Attaques applicatives",
 ("2.5", "Credential attacks"): "Attaques d'identifiants",
 ("3.3", "Data types and states"): "Types et états des données",
 ("3.3", "Data classifications"): "Classifications des données",
 ("3.3", "Methods used to secure data"): "Méthodes de sécurisation",
 ("3.3", "Data protection roles"): "Rôles de protection des données",
 ("3.3", "Data handling and life cycle"): "Traitement et cycle de vie",
 ("3.3", "Data compliance"): "Conformité des données",
 ("4.7", "Preparation"): "Préparation",
 ("4.7", "Identification"): "Identification",
 ("4.7", "Investigation"): "Investigation",
 ("4.7", "Containment, negotiation, eradication"): "Confinement, négociation, éradication",
 ("4.7", "Notification and post-incident"): "Notification et post-incident",
 ("5.2", "Risk identification and assessment"): "Identification et évaluation du risque",
 ("5.2", "Risk analysis and register"): "Analyse et registre des risques",
 ("5.2", "Risk treatment"): "Traitement du risque",
 ("5.2", "Business-level considerations"): "Considérations métier",
}

ASSETS = {
 "1.1": dict(lessonIds=["1.1-01", "1.1-02", "1.1-03"], deckId="fc-1.1", quizId="qz-1.1",
             pbqIds=["pbq-1.1-classify"], scenarioIds=["sc-1.1-control-choice"]),
 "1.3": dict(lessonIds=["1.3-01", "1.3-02", "1.3-03"], deckId="fc-1.3", quizId="qz-1.3",
             pbqIds=["pbq-1.3-pki"], scenarioIds=["sc-1.3-expired-cert"]),
 "2.5": dict(lessonIds=["2.5-01", "2.5-02", "2.5-03"], deckId="fc-2.5", quizId="qz-2.5",
             pbqIds=["pbq-2.5-triage", "pbq-2.5-logs"], scenarioIds=["sc-2.5-ransomware"]),
 "3.3": dict(lessonIds=["3.3-01", "3.3-02"], deckId="fc-3.3", quizId="qz-3.3",
             pbqIds=["pbq-3.3-dlp"], scenarioIds=[]),
 "4.7": dict(lessonIds=["4.7-01", "4.7-02", "4.7-03"], deckId="fc-4.7", quizId="qz-4.7",
             pbqIds=["pbq-4.7-order"], scenarioIds=["sc-4.7-tabletop"]),
 "5.2": dict(lessonIds=["5.2-01", "5.2-02"], deckId="fc-5.2", quizId="qz-5.2",
             pbqIds=["pbq-5.2-ale"], scenarioIds=[]),
}

PLANNED = {
 "1.2": 2, "2.1": 2, "2.2": 2, "2.3": 5, "2.4": 3, "2.6": 2, "3.1": 4, "3.2": 4,
 "3.4": 4, "4.1": 7, "4.2": 1, "4.3": 2, "4.4": 3, "4.5": 5, "4.6": 2, "4.8": 3,
 "5.1": 2, "5.3": 2, "5.4": 2, "5.5": 2, "5.6": 2,
}

src = json.load(open(SRC, encoding="utf-8"))
out = []
for o in src:
    oid = o["id"]
    groups = []
    for g in o["groups"]:
        groups.append({
            "name": g["name"],
            "fr": GROUP_FR.get((oid, g["name"]), ""),
            "items": g["items"],
        })
    a = ASSETS.get(oid)
    rec = {
        "id": oid,
        "domain": int(o["domain"]),
        "title": o["title"],
        "titleFr": FR_TITLES[oid],
        "coverage": COVERAGE[oid],
        "summary": SUMMARY[oid],
        "status": "complete" if a else "planned",
        "groups": groups,
        "itemCount": sum(len(g["items"]) for g in groups),
    }
    if a:
        rec.update(a)
    else:
        rec["plannedLessons"] = PLANNED.get(oid, 2)
    out.append(rec)

json.dump(out, open(os.path.join(OUT, "objectives.json"), "w", encoding="utf-8"),
          ensure_ascii=False, indent=1)

domains = [
 {"id": 1, "name": "General Security Concepts", "fr": "Concepts généraux de sécurité",
  "weight": 16, "color": "#4F8CFF", "blurb": "Principes, contrôles, gestion du changement et cryptographie.",
  "objectives": ["1.1", "1.2", "1.3"]},
 {"id": 2, "name": "Threats, Vulnerabilities, and Attacks", "fr": "Menaces, vulnérabilités et attaques",
  "weight": 24, "color": "#FF5C7A", "blurb": "Acteurs, vecteurs, vulnérabilités, indicateurs et menaces liées à l'IA.",
  "objectives": ["2.1", "2.2", "2.3", "2.4", "2.5", "2.6"]},
 {"id": 3, "name": "Security Architecture", "fr": "Architecture de sécurité",
  "weight": 19, "color": "#22C55E", "blurb": "Modèles d'architecture, zones, protection des données et résilience.",
  "objectives": ["3.1", "3.2", "3.3", "3.4"]},
 {"id": 4, "name": "Security Operations", "fr": "Opérations de sécurité",
  "weight": 27, "color": "#F5A524", "blurb": "Contrôles, actifs, vulnérabilités, supervision, IAM, automatisation, IR et preuves.",
  "objectives": ["4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8"]},
 {"id": 5, "name": "Security Program Management and Oversight", "fr": "Pilotage et supervision du programme",
  "weight": 14, "color": "#A78BFA", "blurb": "Gouvernance, risque, tiers, conformité, audit et sensibilisation.",
  "objectives": ["5.1", "5.2", "5.3", "5.4", "5.5", "5.6"]},
]
json.dump(domains, open(os.path.join(OUT, "domains.json"), "w", encoding="utf-8"),
          ensure_ascii=False, indent=1)

print("objectives:", len(out), "items:", sum(o["itemCount"] for o in out))
print("complete:", [o["id"] for o in out if o["status"] == "complete"])
