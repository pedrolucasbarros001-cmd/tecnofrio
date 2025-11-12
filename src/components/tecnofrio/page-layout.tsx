'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: ReactNode;
  theme?: 'dark' | 'light';
}

export function PageLayout({ children, theme = 'dark' }: PageLayoutProps) {
  const isDark = theme === 'dark';

  return (
    <div
      className={cn(
        'ml-64 min-h-screen',
        isDark ? 'bg-slate-950' : 'bg-slate-50'
      )}
    >
      <div className="p-8">{children}</div>
    </div>
  );
}
