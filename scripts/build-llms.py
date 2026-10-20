#!/usr/bin/env python3
"""Erzeugt public/llms.txt aus dem Build (RECETTE §21). Aufruf: npm run build && python3 scripts/build-llms.py && npm run build"""
import glob, html, os, re
SITE = re.search(r'SITE_URL = "([^"]+)"', open('src/data/site-config.ts').read()).group(1)
rows = {'de': []}
for f in sorted(glob.glob('dist/*/**/index.html', recursive=True)):
    d = open(f, encoding='utf-8').read()
    if 'noindex' in d[:3000] or '/embed/' in f: continue
    path = '/' + os.path.relpath(os.path.dirname(f), 'dist').replace(os.sep, '/') + '/'
    lang = path.split('/')[1]
    if lang not in rows: continue
    t = html.unescape(re.search(r'<title>(.*?)</title>', d, re.S).group(1))
    m = re.search(r'name="description" content="(.*?)"', d, re.S)
    rows[lang].append((path, t, html.unescape(m.group(1)) if m else ''))
out = ['# GdB-Rechner', '',
       '> Unabhängige Seite von Radif Partners auf Deutsch zum Grad der Behinderung (GdB) in Deutschland, Rechtsstand 2026: Gesamt-GdB aus mehreren Leiden nach der Versorgungsmedizin-Verordnung, Anlage Teil A Nummer 3 in der Fassung seit 3. Oktober 2025 (höchster Einzelwert als Ausgang, keine Addition, GdB 10 erhöht in der Regel nicht, GdB 20 vielfach nicht), als Spanne mit offengelegter Annahme; GdB-Tabelle nach Teil B; Behinderten-Pauschbetrag nach § 33b EStG, Fahrtkostenpauschale, Zusatzurlaub, Kündigungsschutz, Gleichstellung, Altersrente für schwerbehinderte Menschen und Merkzeichen G, aG, B, H, Bl, TBl, Gl, RF.', '',
       'Alle Berechnungen laufen im Browser; keine Datenerhebung, kein Formular, keine Vermittlung. Ergebnisse sind Schätzungen, keine ärztliche oder rechtliche Beratung; den GdB stellt allein die zuständige Behörde des Landes fest. Die Seite gehört zu keiner Behörde.', '']
for lang, titel in (('de', '## Seiten'),):
    out.append(titel); out.append('')
    for p, t, d in rows[lang]: out.append(f'- [{t}]({SITE}{p}): {d}')
    out.append('')
open('public/llms.txt', 'w', encoding='utf-8').write('\n'.join(out))
print('llms.txt:', sum(len(v) for v in rows.values()), 'Seiten')
