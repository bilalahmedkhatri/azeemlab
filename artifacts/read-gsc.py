import openpyxl,json,pathlib,datetime
result={}
for path in pathlib.Path('gsc').glob('*.xlsx'):
 w=openpyxl.load_workbook(path,data_only=True,read_only=True)
 result[path.name]={s.title:[[v.isoformat() if isinstance(v,(datetime.datetime,datetime.date)) else v for v in row] for row in s.iter_rows(values_only=True)] for s in w}
pathlib.Path('artifacts/gsc-extracted.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf8')
for name,sheets in result.items():
 print(name)
 for sheet,rows in sheets.items():
  print(sheet,len(rows),json.dumps(rows[:8],ensure_ascii=False))
