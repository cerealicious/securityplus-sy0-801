"""Intègre et valide tous les contenus pédagogiques, puis met à jour objectives.json."""
import json, glob, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
C = os.path.join(ROOT, 'src', 'content')

def load(p):
    with open(p, encoding='utf-8') as f:
        return json.load(f)

def files(pattern):
    return sorted(glob.glob(os.path.join(C, pattern)))

lessons, decks, quizzes, pbqs, scenarios, diagrams = [], [], [], [], [], []
for p in files('lessons/*.json'):
    lessons += load(p)
for p in files('flashcards/*.json'):
    decks.append(load(p))
for p in files('quizzes/*.json'):
    quizzes.append(load(p))
for p in files('pbqs/*.json'):
    pbqs.append(load(p))
for p in files('scenarios/*.json'):
    scenarios.append(load(p))
for p in files('diagrams.json') + files('diagrams-extra/*.json'):
    d = load(p)
    diagrams += d.get('diagrams', []) if isinstance(d, dict) else d

ids = {
    'lesson': {x['id'] for x in lessons},
    'deck': {x['id'] for x in decks},
    'quiz': {x['id'] for x in quizzes},
    'pbq': {x['id'] for x in pbqs},
    'scenario': {x['id'] for x in scenarios},
    'diagram': {x['id'] for x in diagrams},
}

obj_path = os.path.join(C, 'objectives.json')
objectives = load(obj_path)
problems = []

for o in objectives:
    oid = o['id']
    ls = sorted([l for l in lessons if l.get('objective') == oid], key=lambda x: x.get('order', 0))
    dk = [d for d in decks if d.get('objective') == oid]
    qz = [q for q in quizzes if q.get('objective') == oid]
    pb = [p for p in pbqs if p.get('objective') == oid]
    sc = [s for s in scenarios if s.get('objective') == oid]
    dg = [b.get('diagramId') for l in ls for b in l.get('blocks', []) if b.get('type') == 'diagram']
    dg = [x for x in dg if x in ids['diagram']]

    for name, val in [('leçons', ls), ('deck', dk), ('quiz', qz), ('PBQ', pb), ('scénario', sc), ('schéma', dg)]:
        if not val:
            problems.append(f'{oid}: aucun {name}')

    if ls:
        o['lessonIds'] = [l['id'] for l in ls]
    if dk:
        o['deckId'] = dk[0]['id']
    if qz:
        o['quizId'] = qz[0]['id']
    if pb:
        o['pbqIds'] = [p['id'] for p in pb]
    if sc:
        o['scenarioIds'] = [s['id'] for s in sc]
    if not problems or not any(p.startswith(oid + ':') for p in problems):
        o['status'] = 'complete'

# Validate all references
for o in objectives:
    for key, kind in [('lessonIds','lesson'), ('deckId','deck'), ('quizId','quiz'), ('pbqIds','pbq'), ('scenarioIds','scenario')]:
        v = o.get(key) or []
        v = [v] if isinstance(v, str) else v
        for x in v:
            if x not in ids[kind]:
                problems.append(f"{o['id']}: {key} inconnu {x}")
for l in lessons:
    for b in l.get('blocks', []):
        if b.get('type') == 'diagram' and b.get('diagramId') not in ids['diagram']:
            problems.append(f"{l['id']}: schéma inconnu {b.get('diagramId')}")
        if b.get('type') == 'source' and b.get('book') not in ('DSH','STRAT','SOCN','NET','OBJ') and not str(b.get('book','')).startswith('CompTIA'):
            problems.append(f"{l['id']}: code livre inconnu {b.get('book')}")

with open(obj_path, 'w', encoding='utf-8') as f:
    json.dump(objectives, f, ensure_ascii=False, indent=2)

print('OBJECTIFS:', len(objectives), '| statut complete:', sum(1 for o in objectives if o['status']=='complete'))
print('CONTENUS:', {k: len(v) for k, v in ids.items()})
print('PROBLÈMES:', len(problems))
for p in problems:
    print(' -', p)
sys.exit(1 if problems else 0)
