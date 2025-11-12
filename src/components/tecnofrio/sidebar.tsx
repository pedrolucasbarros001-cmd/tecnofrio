'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  items: Array<{
    icon: LucideIcon;
    label: string;
    path: string;
  }>;
  theme?: 'dark' | 'light';
  title: string;
  subtitle: string;
}

export function Sidebar({ items, theme = 'dark', title, subtitle }: SidebarProps) {
  const pathname = usePathname();

  const isDark = theme === 'dark';

  return (
    <div
      className={cn(
        'w-64 h-screen fixed left-0 top-0 flex flex-col border-r z-40',
        isDark
          ? 'bg-slate-900 border-slate-800 text-white'
          : 'bg-white border-slate-200 text-slate-900'
      )}
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <Link
          href="/"
          className={cn(
            'flex items-center gap-2 mb-4 text-sm transition-colors',
            isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
          )}
        >
          <Home className="w-4 h-4" />
          Voltar ao início
        </Link>
        <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className={cn('text-sm mt-1', isDark ? 'text-slate-400' : 'text-slate-600')}>
          {subtitle}
        </p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                isActive
                  ? isDark
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : isDark
                  ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={cn('p-4 border-t', isDark ? 'border-slate-800' : 'border-slate-200')}>
        <div className="text-xs text-center text-slate-500">
          TECNOFRIO v1.0
        </div>
      </div>
    </div>
  );
}
