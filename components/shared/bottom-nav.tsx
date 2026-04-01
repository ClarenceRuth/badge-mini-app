'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Award, Gem, Home, ScrollText } from 'lucide-react';
import { cn } from '@/lib/utils';

const items = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/badge', label: 'Badge', icon: Gem },
  { href: '/me', label: 'My Badge', icon: Award },
  { href: '/records', label: 'Records', icon: ScrollText },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 mx-auto flex max-w-md justify-center px-4 pb-5">
      <nav className="panel grid w-full grid-cols-4 rounded-[26px] p-2">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 rounded-[18px] px-2 py-3 text-[11px] font-medium transition',
                active ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white',
              )}
            >
              <Icon className={cn('h-4 w-4', active ? 'text-secondary' : 'text-slate-500')} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
