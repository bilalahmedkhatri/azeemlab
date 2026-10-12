import json
j=json.load(open('artifacts/gsc-extracted.json',encoding='utf8'))
p=j['azeemlab.com-Performance-on-Search-2026-10-12.xlsx']
r=p['Chart'][1:]; clicks=sum(x[1] for x in r); imps=sum(x[2] for x in r)
print('TOTAL',clicks,imps,'CTR',clicks/imps,'WEIGHTED POSITION',sum(x[2]*(x[4] or 0) for x in r)/imps,'DATES',r[0][0],r[-1][0])
for s in ['Queries','Pages','Countries','Devices']:print(s,json.dumps(p[s],indent=2))
for name in ['pages.xlsx','indexed pages.xlsx','http.xlsx']:
 print(name,'LAST',j[name]['Chart'][-1]);print('TABLE',j[name].get('Critical issues',j[name].get('Table')))
