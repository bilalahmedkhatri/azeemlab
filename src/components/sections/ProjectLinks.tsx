import Link from 'next/link';

export function ProjectLinks({ mode = 'pricing' }: { mode?: 'pricing' | 'partners' | 'both' }) {
  return (
    <aside className="container my-10 rounded-2xl border border-border bg-card p-6 md:p-8" aria-label="Project resources">
      <h2 className="text-xl font-semibold mb-3">Plan your next step</h2>
      <div className="space-y-3 text-sm leading-7 text-muted-foreground">
        {mode !== 'partners' && <>
          <p>Compare starting rates and included scope on our{' '}<Link href="/pricing/plan_detail/business" className="text-foreground underline underline-offset-4">service pricing page</Link>.</p>
          <p>Explore our{' '}<Link href="/process" className="text-foreground underline underline-offset-4">project process</Link>{' '}to understand how we plan and deliver your work.</p>
        </>}
        {mode !== 'pricing' && <p>For agency projects, referrals or technology collaboration, explore our{' '}<Link href="/partners" className="text-foreground underline underline-offset-4">partner program</Link>.</p>}
      </div>
    </aside>
  );
}
