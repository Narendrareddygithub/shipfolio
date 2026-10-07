'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FolderKanban, Settings, PlusCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar (Left Column) */}
      <aside className="hidden md:flex flex-col w-64 border-r border-black/5 dark:border-white/10 bg-white/50 dark:bg-zinc-950/50 min-h-[calc(100vh-4rem)] p-4 space-y-6">
        <div className="px-3 py-2">
          <Link
            href="/projects/new"
            className="apple-button w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:from-blue-500 hover:to-indigo-500 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Campaign</span>
          </Link>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all apple-button',
                  isActive
                    ? 'bg-zinc-900/5 dark:bg-white/10 text-zinc-900 dark:text-white font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                )}
              >
                <Icon className={cn('w-4 h-4', isActive ? 'text-blue-600 dark:text-blue-400' : '')} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Navigation Bar (Fixed Bottom Bar - Apple Mobile Feel) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 apple-glass border-t border-black/5 dark:border-white/10 px-6 py-2.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 text-xs font-medium apple-button transition-colors',
                isActive ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-zinc-500 dark:text-zinc-400'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
