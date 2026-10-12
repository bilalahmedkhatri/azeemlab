from pathlib import Path
p=Path('artifacts/apply-contact-fixes.py');s=p.read_text(encoding='utf-8-sig');s=s[s.index("p=Path('src/app/contact/page.tsx')"):];s="from pathlib import Path\n"+s.replace('p.read_text()','p.read_text(encoding="utf8")');p=Path('artifacts/finish-contact-fixes.py');p.write_text(s,encoding='utf8')
