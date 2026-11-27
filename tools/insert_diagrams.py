"""Insère les schémas batch dans les leçons ciblées via leur ID d'<objectif>-L<ordre>-<slug>."""
import glob, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
C = os.path.join(ROOT, 'src', 'content')


def load(p):
    with open(p, encoding='utf-8') as f:
        return json.load(f)


def dump(p, data):
    with open(p, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


# Charger tous les schémas
diagrams = []
for p in glob.glob(os.path.join(C, 'diagrams.json')) + glob.glob(os.path.join(C, 'diagrams-extra', '*.json')):
    d = load(p)
    diagrams += d.get('diagrams', []) if isinstance(d, dict) else d
ids = {d['id'] for d in diagrams}
print('Schémas disponibles :', len(ids))

# Nouveaux schémas batch : ID = d-<objectif>-L<ordre>-<slug>
pat = re.compile(r'^d-(\d\.\d)-L(\d{2})-(.+)$')
targets = {}
for d in diagrams:
    m = pat.match(d['id'])
    if not m:
        continue
    objective, order = m.group(1), int(m.group(2))
    targets.setdefault(objective, {}).setdefault(order, []).append(d['id'])

inserted = 0
problems = []
for objective, lessons_map in targets.items():
    p = os.path.join(C, 'lessons', f'{objective}.json')
    if not os.path.exists(p):
        problems.append(f'{objective}: fichier leçons absent')
        continue
    lessons = load(p)
    for order, diagram_ids in lessons_map.items():
        lesson = next((l for l in lessons if l.get('order') == order), None)
        if not lesson:
            problems.append(f'{objective} L{order:02d}: leçon absente')
            continue
        existing = {b.get('diagramId') for b in lesson['blocks'] if b.get('type') == 'diagram'}
        for did in diagram_ids:
            if did not in ids:
                problems.append(f'{objective} L{order:02d}: schéma inconnu {did}')
                continue
            if did in existing:
                continue
            # insérer après le premier bloc lead ou à la position 2
            idx = 2 if len(lesson['blocks']) > 2 else len(lesson['blocks'])
            lesson['blocks'].insert(idx, {'type': 'diagram', 'diagramId': did})
            inserted += 1
    dump(p, lessons)

# Validation finale : chaque bloc diagram résout, et couverture par leçon
missing = []
lesson_count = 0
with_diagram = 0
for p in glob.glob(os.path.join(C, 'lessons', '*.json')):
    for l in load(p):
        lesson_count += 1
        ds = [b['diagramId'] for b in l['blocks'] if b.get('type') == 'diagram']
        if ds:
            with_diagram += 1
        for did in ds:
            if did not in ids:
                missing.append(f"{l['id']} -> {did}")

print('Schémas insérés :', inserted)
print('Leçons :', lesson_count, '| avec au moins un schéma :', with_diagram)
print('Références manquantes :', missing if missing else 'aucune')
print('Problèmes :', problems if problems else 'aucun')
sys.exit(1 if missing or problems else 0)
