'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Braces, Check, FileText, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TextArea } from '@/components/ui/Input';
import { Card, CardContent, CardHeader } from '@/components/ui/report-card';
import sample from '@/data/sample-lead-report.json';
import styles from './LeadReport.module.css';

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
type Report = { [key: string]: Json; leads: { [key: string]: Json }[] };
type SavedReport = { id: string; savedAt: string; report: Report };
const storageKey = 'azeemlab.lead-reports.v1';

function isReport(value: unknown): value is Report {
  return value !== null && typeof value === 'object' && !Array.isArray(value) && 'leads' in value
    && Array.isArray(value.leads) && value.leads.every(lead => lead !== null && typeof lead === 'object' && !Array.isArray(lead));
}

function readSavedReports(): SavedReport[] {
  const stored: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
  if (!Array.isArray(stored) || !stored.every((entry: unknown) => entry !== null && typeof entry === 'object'
    && 'id' in entry && typeof entry.id === 'string' && 'savedAt' in entry && typeof entry.savedAt === 'string' && Number.isFinite(Date.parse(entry.savedAt))
    && 'report' in entry && isReport(entry.report))) {
    throw new Error('Invalid saved reports');
  }
  return stored;
}
// JSON imports infer absent optional keys as undefined across array unions.
const sampleReport = sample as unknown as Report;
const sampleInput = JSON.stringify(sample, null, 2);
const leadIdentityFields = ['lead_id', 'country', 'city', 'client_name'];
const threeColumnHeaderFields: Record<string, string[]> = {
  report_details: ['report_id', 'generated_at', 'timezone'],
  summary: ['total_leads_found', 'leads_with_email', 'leads_with_other_contact'],
  project: ['title', 'required_services', 'technologies'],
  source: ['post_url', 'published_at', 'language'],
  service_match: ['matched_services', 'match_score', 'reason'],
  outreach: ['status', 'email_sent', 'suggested_subject'],
};
const contactHeaderFields = ['email', 'email_verified', 'email_source_url', 'website'];
const runHeaderFields = ['number', 'scheduled_time', 'countries', 'search_languages'];
const contactSecondaryFields = ['linkedin', 'other_contact_method', 'preferred_method'];

const label = (key: string) => key.replaceAll('_', ' ').replace(/\b\w/g, char => char.toUpperCase());
const isObject = (value: Json): value is { [key: string]: Json } => value !== null && typeof value === 'object' && !Array.isArray(value);
const display = (value: Json): string => value === null ? 'Not provided' : typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value);

function LinkedText({ text, truncateUrls = false }: { text: string; truncateUrls?: boolean }) {
  return text.split(/(https?:\/\/[^\s<>"']+|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi).map((part, index) => {
    const isUrl = /^https?:\/\//i.test(part);
    const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(part);
    const truncate = isUrl && truncateUrls;
    const linkText = truncate && part.length > 32 ? `${part.slice(0, 29)}...` : part;
    return isUrl || isEmail ? <a key={index} href={isEmail ? `mailto:${part}` : part} target="_blank" rel="noopener noreferrer" title={truncate ? part : undefined} aria-label={truncate ? part : undefined} className={truncate ? styles.truncatedLink : undefined}>{truncate ? <span>{linkText}</span> : part}<ArrowUpRight size={12} aria-hidden="true" /></a> : part;
  });
}

function Field({ name, value, truncateUrls = false }: { name: string; value: Json; truncateUrls?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [wide, setWide] = useState(true);
  const text = Array.isArray(value) ? (value.length ? value.map(display).join(' · ') : 'None found') : display(value);

  useEffect(() => {
    const element = ref.current;
    const grid = element?.parentElement;
    if (!element || !grid) return;
    // Measure the actual font against one column; wrapped values occupy the whole row.
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const measure = () => {
      if (!context) return;
      context.font = getComputedStyle(element.querySelector('dd')!).font;
      const columnWidth = (grid.clientWidth - 24) / 2;
      setWide(text.includes('\n') || context.measureText(text).width + 24 > columnWidth);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(grid);
    measure();
    return () => observer.disconnect();
  }, [text]);

  return <div ref={ref} className={`${styles.field} ${wide || name === 'suggested_message' || name === 'description' ? styles.wide : ''}`}>
    <dt>{label(name)}</dt>
    <dd tabIndex={0} className={value === null ? styles.missing : ''}><LinkedText text={text} truncateUrls={truncateUrls} /></dd>
  </div>;
}

function DataFields({ data, section }: { data: { [key: string]: Json }; section?: string }) {
  const budget = section === 'budget';
  const source = section === 'source';
  const contact = section === 'contact';
  const headerFields = section === 'run' ? runHeaderFields : contact ? contactHeaderFields : threeColumnHeaderFields[section ?? ''] ?? [];
  const limits = budget ? [data.min, data.max].filter(value => value !== null && value !== undefined && value !== '') : [];
  const entries: [string, Json][] = budget
    ? [['range', limits.length ? limits.map(display).join(' - ') : null], ...Object.entries(data).filter(([key]) => key !== 'min' && key !== 'max')]
    : Object.entries(data).filter(([key]) => (!source || key !== 'platform') && !headerFields.includes(key) && (!contact || !contactSecondaryFields.includes(key)));
  return <>
    {headerFields.length > 0 && <dl className={`${styles.fields} ${contact || section === 'run' ? styles.identityFields : styles.sourceFields}`}>
      {headerFields.map(key => <Field key={key} name={key} value={data[key] ?? null} truncateUrls={contact} />)}
    </dl>}
    {contact && <dl className={`${styles.fields} ${styles.sourceFields}`}>
      {contactSecondaryFields.map(key => <Field key={key} name={key} value={data[key] ?? null} truncateUrls />)}
    </dl>}
    <dl className={`${styles.fields} ${budget ? styles.budgetFields : ''}`}>{entries.filter(([, value]) => !isObject(value) && !(Array.isArray(value) && value.some(item => typeof item === 'object' && item !== null))).map(([key, value]) => <Field key={key} name={key} value={value} truncateUrls={contact} />)}</dl>
    {entries.map(([key, value]) => isObject(value) ? <section className={styles.nested} key={key}><h4>{label(key)}</h4><DataFields data={value} section={key} /></section> : Array.isArray(value) && value.some(item => typeof item === 'object' && item !== null) ? <section className={styles.nested} key={key}><h4>{label(key)}</h4>{value.map((item, index) => <div className={styles.nested} key={index}>{isObject(item) ? <DataFields data={item} /> : <Field name={`${key} ${index + 1}`} value={item} />}</div>)}</section> : null)}
  </>;
}

export function LeadReport() {
  const [input, setInput] = useState(sampleInput);
  const [report, setReport] = useState<Report | null>(sampleReport);
  const [savedReports, setSavedReports] = useState<SavedReport[]>([]);
  const [activeSavedId, setActiveSavedId] = useState<string | null>(null);
  const [storageReady, setStorageReady] = useState(false);
  const [storageError, setStorageError] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('Showing the sample report');

  useEffect(() => {
    try {
      const stored = readSavedReports();
      setSavedReports(stored);
      if (stored.length) {
        setInput('');
        setReport(null);
        setNotice('Saved reports loaded from this browser');
      }
    } catch {
      setStorageError('Saved reports could not be loaded. Existing browser data has not been changed.');
    }
    setStorageReady(true);
  }, []);

  function clearReport() {
    setInput('');
    setReport(null);
    setActiveSavedId(null);
    setError('');
    setNotice('Input and report cleared');
  }

  function saveReport() {
    if (!report) return;
    try {
      const id = activeSavedId ?? (typeof report.report_id === 'string' && report.report_id ? report.report_id : crypto.randomUUID());
      const entry = { id, savedAt: new Date().toISOString(), report };
      const updated = [entry, ...readSavedReports().filter(saved => saved.id !== id)];
      localStorage.setItem(storageKey, JSON.stringify(updated));
      setSavedReports(updated);
      setStorageError('');
      clearReport();
      setNotice('Report saved in this browser on this device');
    } catch {
      setStorageError('Could not save the report. Browser storage may be unavailable, full, or contain invalid data. Your current report is still open.');
    }
  }

  function removeSavedReport(id: string) {
    try {
      const updated = readSavedReports().filter(saved => saved.id !== id);
      localStorage.setItem(storageKey, JSON.stringify(updated));
      setSavedReports(updated);
      setStorageError('');
      if (activeSavedId === id) setActiveSavedId(null);
      setNotice('Saved report removed');
    } catch {
      setStorageError('Could not remove the saved report. Browser storage is unavailable.');
    }
  }

  function generate() {
    try {
      const parsed = JSON.parse(input);
      if (!isReport(parsed)) {
        throw new Error('Use a JSON report object with a leads array containing lead objects.');
      }
      setReport(parsed);
      setActiveSavedId(null);
      setError('');
      setNotice(`Report generated · ${parsed.leads.length} leads loaded`);
    } catch (cause) {
      setError(cause instanceof SyntaxError ? 'Invalid JSON. Check quotation marks, commas, and brackets, then try again.' : (cause as Error).message);
      setNotice('');
    }
  }

  return <div className={styles.page}>
    <div className="container">
      <header className={styles.heading}>
        <h1>Your next conversation<br /><span>starts here.</span></h1>
        <p>Turn your lead report into a clear view of projects, contacts, and opportunities.</p>
      </header>

      <Card className={styles.inputCard}>
        <CardHeader><div className={styles.sectionHeading}><h2><Braces size={20} /> JSON input</h2><span className={styles.pill}>Local report workspace</span></div><p className={styles.hint}>Paste a report below, then generate your view. Saved reports stay in this browser on this device.</p></CardHeader>
        <CardContent>
          <TextArea id="report-json" label="Report JSON" value={input} onChange={event => setInput(event.target.value)} rows={5} spellCheck={false} aria-invalid={!!error} aria-describedby={error ? 'report-error' : undefined} className={styles.editor} />
          {error && <p id="report-error" role="alert" className={styles.error}>{error}</p>}
          <div className={styles.actions}>
            <div className={styles.buttons}><Button onClick={generate} size="sm"><FileText size={16} />Generate report<ArrowDown size={15} /></Button><Button variant="outline" size="sm" onClick={clearReport}><X size={14} />Clear report</Button>{report && <Button variant="outline" size="sm" onClick={saveReport} disabled={!storageReady}><Save size={14} />Save report</Button>}</div>
            <span role="status" className={styles.hint}>{notice && <><Check size={14} />{notice}</>}</span>
          </div>
          {storageError && <p role="alert" className={styles.error}>{storageError}</p>}
        </CardContent>
      </Card>

      <section className={styles.report} aria-label="Saved reports">
        <Card>
          <CardHeader><div className={styles.sectionHeading}><h2>Saved reports</h2><span className={styles.pill}>{savedReports.length} saved</span></div></CardHeader>
          <CardContent>
            {savedReports.length ? <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="Saved reports table">
              <table className={styles.savedTable}>
                <caption className="sr-only">Reports saved in this browser on this device</caption>
                <thead><tr><th scope="col">Report ID</th><th scope="col">Generated at</th><th scope="col">Leads</th><th scope="col">Saved at (PKT)</th><th scope="col">Actions</th></tr></thead>
                <tbody>{savedReports.map(saved => <tr key={saved.id}>
                  <td>{display(saved.report.report_id ?? saved.id)}</td><td>{display(saved.report.generated_at ?? null)}</td><td>{saved.report.leads.length}</td><td>{new Date(saved.savedAt).toLocaleString('en-GB', { timeZone: 'Asia/Karachi' })}</td>
                  <td><div className={styles.buttons}><Button variant="outline" size="sm" onClick={() => { setReport(saved.report); setInput(JSON.stringify(saved.report, null, 2)); setActiveSavedId(saved.id); setError(''); setNotice('Saved report opened'); }}>View</Button><Button variant="outline" size="sm" onClick={() => removeSavedReport(saved.id)}>Remove</Button></div></td>
                </tr>)}</tbody>
              </table>
            </div> : <p className={styles.hint}>{storageReady ? 'No saved reports yet. Generate a report, then select Save report.' : 'Loading saved reports…'}</p>}
          </CardContent>
        </Card>
      </section>

      {report && <section className={styles.report} aria-label="Generated lead report">
        <div className={styles.reportHeading}><div><span className={styles.eyebrow}>THE REPORT</span><h2>Opportunity overview</h2></div><span className={styles.pill}>{report.leads.length} leads</span></div>
        <Card><CardHeader><h3>Report details</h3></CardHeader><CardContent><DataFields section="report_details" data={Object.fromEntries(Object.entries(report).filter(([key]) => key !== 'leads' && key !== 'summary' && key !== 'search_metadata'))} /></CardContent></Card>
        {isObject(report.summary ?? null) && <Card><CardHeader><h3>At a glance</h3></CardHeader><CardContent><DataFields section="summary" data={report.summary as { [key: string]: Json }} /></CardContent></Card>}
        {report.leads.map((lead, index) => <Card key={index} className={styles.lead}>
          <CardHeader><div className={styles.sectionHeading}><span className={styles.eyebrow}>LEAD {String(index + 1).padStart(2, '0')}</span><span className={styles.pill}>{display(lead.country ?? null)}</span></div><h3 className={styles.clientName}>{display(lead.client_name ?? `Lead ${index + 1}`)}</h3>{isObject(lead.project ?? null) && <p className={styles.projectTitle}><LinkedText text={display((lead.project as { [key: string]: Json }).title ?? null)} /></p>}</CardHeader>
          <CardContent>
            <dl className={`${styles.fields} ${styles.identityFields}`}>
              {leadIdentityFields.map(key => <Field key={key} name={key} value={lead[key] ?? null} />)}
            </dl>
            <DataFields data={Object.fromEntries(Object.entries(lead).filter(([key]) => !leadIdentityFields.includes(key)))} />
          </CardContent>
        </Card>)}
        {report.leads.length === 0 && <Card><CardContent><h3>No leads in this report</h3><p className={styles.hint}>Add lead objects to the JSON input to see them here.</p></CardContent></Card>}
        {isObject(report.search_metadata ?? null) && <Card><CardHeader><h3>Search metadata</h3></CardHeader><CardContent><DataFields data={report.search_metadata as { [key: string]: Json }} /></CardContent></Card>}
      </section>}
    </div>
  </div>;
}
