# Spécification de contenu — Security+ SY0-801

Tout nouveau contenu doit respecter exactement les schémas et règles ci-dessous.

## Règles absolues

1. Le référentiel officiel (fichier `ANALYSE_SY0-801_ET_PROGRAMME.md`, à la racine du projet) définit seul le périmètre. Utilisez les sous-thèmes officiels listés dans `src/content/objectives.json` pour chaque objectif.
2. N'attribuez JAMAIS un concept à un livre qui ne le contient pas. Consultez la cartographie (Partie D) et les lacunes (Partie E) du document d'analyse. Quand une notion n'est dans aucun livre, utilisez `{"type":"source","book":"OBJ","page":"X.Y","strength":"primary","note":"Référentiel officiel — aucun des 4 livres"}` et marquez les `term` concernés avec `"gap": true` et ajoutez un `callout` de type `gap`.
3. Codes livres : `DSH` = Defensive Security Handbook, `STRAT` = 11 Strategies of a World-Class SOC, `SOCN` = SOC Analyst Notes, `NET` = Networking Fundamentals, `OBJ` = objectifs officiels.
4. Pagination : SOCN = page PDF ; STRAT = page PDF = page imprimée + 20 (renseigner les deux champs `page` et `printed`) ; DSH = page PDF = page imprimée + 22 (renseigner les deux) ; NET = page PDF.
5. Langue : français,术语 techniques conservés en anglais. Style clair, concret, orienté examen.
6. Ne modifiez QUE les fichiers qui vous sont assignés. Ne touchez PAS à `objectives.json`, `diagrams.json`, ni aux fichiers d'un autre objectif (l'intégration est faite centralement).

## Fichiers à produire pour chaque objectif X.Y

### `src/content/lessons/X.Y.json`
Tableau de 2 à 3 leçons :
```json
[{
  "id": "X.Y-01", "objective": "X.Y", "order": 1,
  "title": "Titre de la leçon", "minutes": 15,
  "blocks": [ ... ]
}]
```
Types de blocs autorisés (avec leur forme exacte) :
- `{"type":"lead","text":"..."}`
- `{"type":"p","text":"... **gras** ..."}`
- `{"type":"h","text":"..."}`
- `{"type":"list","ordered":false,"items":["...","..."]}`
- `{"type":"term","en":"Term Name","fr":"Traduction","field":"Explication terrain","gap":false}`
- `{"type":"callout","kind":"exam|warning|tip|gap","text":"..."}` (`kind:"gap"` ajoute automatiquement le titre « Notion non couverte par vos livres »)
- `{"type":"compare","left":{"title":"...","points":["..."]},"right":{"title":"...","points":["..."]}}`
- `{"type":"table","head":["A","B"],"rows":[["x","y"],["z","w"]]}`
- `{"type":"steps","items":[{"title":"...","text":"..."}]}`
- `{"type":"diagram","diagramId":"d-..."}` (utilisez l'ID de votre fichier de schéma, voir ci-dessous)
- `{"type":"source","book":"DSH","chapter":"7","page":76,"printed":54,"strength":"primary|supporting","note":"..."}`
- `{"type":"check","q":"...","options":["...","..."],"answer":1,"explain":"..."}`
- `{"type":"summary","items":["...","..."]}`

Chaque leçon : environ 12-20 blocs, au moins 1 `source` réel, au moins 1 `check`, 1 `summary`, 1 `term` ou tableau. 2 leçons minimum, 3 si l'objectif est dense (4.1, 4.4, 4.5, 5.5 par exemple).

### `src/content/flashcards/fc-X.Y.json`
```json
{"id":"fc-X.Y","objective":"X.Y","title":"Titre","cards":[
 {"id":"c-X.Y-01","front":"Question courte","back":"Réponse précise","tag":"Cycle"},
 ... 16 à 20 cartes ...
]}
```

### `src/content/quizzes/qz-X.Y.json`
```json
{"id":"qz-X.Y","objective":"X.Y","title":"Quiz — ...","questions":[
 {"id":"q-X.Y-01","type":"single","q":"...","options":["...","..."],"answer":[1],"explain":"...","ref":"X.Y-01"},
 {"id":"q-X.Y-02","type":"multi","q":"...","options":["...","..."],"answer":[0,2],"explain":"...","ref":"X.Y-02"},
 {"id":"q-X.Y-03","type":"match","q":"...","pairs":[{"left":"...","right":"..."}],"explain":"...","ref":"X.Y-03"}
]}
```
6 questions minimum, dont au moins 1 `multi` ou `match`. `ref` = ID d'une leçon.

### `src/content/pbqs/pbq-X.Y-<slug>.json`
Un exercice pratique par objectif. Types possibles :
- `classify` : `{"id","objective","type":"classify","title","prompt","categories":["..."],"items":[{"id":"i1","label":"...","cat":"..."}],"explain":"..."}`
- `order` : `{"id","objective","type":"order","title","prompt","items":[{"id":"s1","label":"..."},...],"explain":"..."}` (les ID dans l'ordre correct)
- `match` : `pairs:[{"left":"...","right":"..."}]`
- `table` : `columns`, `rows:[{"id","cells":["...","..."],"answer":"..."}]`, `options:["..."]`
- `calc` : `fields:[{"id","label","answer":nombre,"tolerance":0.5,"unit":"..."}]`

### `src/content/scenarios/sc-X.Y-<slug>.json`
```json
{"id":"sc-X.Y-slug","objective":"X.Y","title":"...","context":"...","start":"n1",
 "nodes":{
   "n1":{"id":"n1","text":"Situation...","choices":[{"text":"Action A","next":"n2","score":4,"why":"Explication"},{"text":"Action B","next":"n2","score":0,"why":"..."}]},
   "n2":{"id":"n2","text":"Suite...","choices":[...]},
   "n3":{"id":"n3","outcome":"Conclusion du débrief"}
 },
 "debrief":["Leçon 1","Leçon 2","Leçon 3"]}
```
3 niveaux de décision (n1, n2, n3) avec n3 comme nœud final (`outcome`, pas de `choices`). Scores 0 à 4.

### `src/content/diagrams-extra/X.Y.json`
Un schéma interactif par objectif :
```json
{"diagrams":[{
 "id":"d-X.Y-slug","kind":"flow","title":"...","subtitle":"...",
 "modes":["explore","quiz","order"],
 "nodes":[{"id":"a","label":"...","sub":"...","x":30,"y":40,"w":160,"h":62,"kind":"artifact|actor|step|risk|neutral","detail":"...","exam":"..."}, ...],
 "edges":[{"from":"a","to":"b","label":"..."}],
 "sequence":["a","b","c"],
 "quiz":{"question":"...","answer":"b"}
}]}
```
Pour un tableau, utiliser `"kind":"matrix"` avec `matrix:{"columns":[...],"rows":[{"label":"...","cells":[{"text":"...","detail":"..."}]}]}`. Dans ce cas, pas de `nodes`/`edges`.

## Vérification avant de terminer
- Tous les fichiers sont du JSON valide, UTF-8, sans commentaire.
- Les IDs sont uniques et cohérents (`X.Y-01`, `fc-X.Y`, `qz-X.Y`, `pbq-X.Y-...`, `sc-X.Y-...`, `d-X.Y-...`).
- Aucune référence à un livre pour une notion absente selon la Partie E du document d'analyse.
