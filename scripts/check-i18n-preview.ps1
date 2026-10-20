param([Parameter(Mandatory=$true)][string]$Preview)
$ErrorActionPreference = 'Stop'
if ($Preview -notmatch '^https://[a-z0-9-]+\.vercel\.app$') { throw 'Expected a Vercel preview URL' }
function Read-Preview([string]$Route, [string[]]$Options = @()) {
  $body = & vercel curl $Route --deployment $Preview -- --silent --show-error @Options
  if ($LASTEXITCODE -ne 0) { throw "Preview request failed: $Route" }
  return ($body -join "`n")
}
$results = @()
foreach ($locale in @('en','ru','nl','fr','es','pt-BR','zh-Hans','ko','ja')) {
  $html = Read-Preview "/$locale" @('--write-out','%{http_code}')
  if (-not $html.EndsWith('200')) { throw "Unexpected preview status: $locale" }
  if (-not $html.Contains('<html lang="' + $locale + '"')) { throw "Incorrect HTML language: $locale" }
  if (-not $html.Contains('rel="canonical" href="https://www.azeemlab.com/' + $locale + '"')) { throw "Incorrect canonical: $locale" }
  if ([regex]::Matches($html, 'rel="alternate" hrefLang=').Count -ne 10) { throw "Missing hreflang: $locale" }
  $results += @{ locale=$locale; status=200; canonical=$true; hreflang=10 }
  Write-Output "$locale hosted checks passed"
}
$headers = Read-Preview '/?campaign=i18n' @('--head','-H','Cookie: AZEEMLAB_LOCALE=ru','-H','Accept-Language: en')
if ($headers -notmatch '307' -or $headers -notmatch '/ru\?campaign=i18n' -or $headers -notmatch 'no-store') { throw 'Saved preference/query/cache check failed' }
$explicit = Read-Preview '/en' @('--head','-H','Cookie: AZEEMLAB_LOCALE=ru','-H','x-azeemlab-locale: ru')
if ($explicit -notmatch '200' -or $explicit -notmatch 'noindex') { throw 'Explicit URL/preview protection check failed' }
New-Item -ItemType Directory -Force artifacts | Out-Null
$results | ConvertTo-Json | Set-Content -Encoding utf8 artifacts/i18n-preview-check.json
Write-Output 'PASS: 9 hosted locale pages, saved preference, query preservation, no-store redirect and preview noindex.'
