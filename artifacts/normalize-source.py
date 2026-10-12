from pathlib import Path
import re
paths=[Path('src/app/layout.tsx'),Path('src/app/page.tsx'),Path('src/app/blog/page.tsx'),Path('src/app/services/[slug]/page.tsx'),Path('src/app/portfolio/[slug]/page.tsx'),Path('src/app/blog/[slug]/page.tsx'),Path('src/app/services/[slug]/[location]/page.tsx'),Path('src/app/about/AboutClient.tsx'),Path('src/app/not-found.tsx'),Path('src/components/ui/Input.tsx'),Path('src/app/contact/ContactForm.tsx')]+list(Path('src/app').glob('*/layout.tsx'))
def fix(match):
 t=match.group()
 try:return t.encode('cp1252').decode('utf8')
 except (UnicodeEncodeError,UnicodeDecodeError):return t
for p in paths:
 s=p.read_text(encoding='utf8');fixed=re.sub(r'[^\x00-\x7f]+',fix,s)
 if fixed!=s:p.write_text(fixed,encoding='utf8');print('Normalized',p)
