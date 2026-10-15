// shadcn/ui Card primitives, adapted to use class strings without adding dependencies.
// https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/card.tsx
import type { ComponentProps } from 'react';

export function Card({ className = '', ...props }: ComponentProps<'div'>) {
  return <div data-slot="card" className={`flex flex-col gap-6 rounded-xl border border-border bg-card py-6 text-card-foreground shadow-sm ${className}`} {...props} />;
}

export function CardHeader({ className = '', ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-header" className={`grid auto-rows-min items-start gap-2 px-6 ${className}`} {...props} />;
}

export function CardContent({ className = '', ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-content" className={`px-6 ${className}`} {...props} />;
}
