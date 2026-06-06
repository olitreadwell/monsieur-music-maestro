'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getDueItems } from '@/lib/leitner';

const STATIC_NAV_LINKS = [
  { href: '/', label: 'tree' },
  { href: '/review', label: 'review' },
  { href: '/journey/narrative', label: 'narrative' },
  { href: '/cheatsheet', label: 'cheatsheet' },
  { href: '/resources', label: 'resources' },
  { href: '/practice-log', label: 'practice log' },
];

export default function DropdownNav() {
  const [open, setOpen] = useState(false);
  const [dueCount, setDueCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDueCount(getDueItems().length);
  }, []);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="text-sm px-3 py-1 rounded border border-fg/10 hover:border-fg/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current transition-colors"
      >
        menu ▾
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-1 min-w-[10rem] rounded border border-fg/10 bg-bg shadow-sm z-50"
        >
          {STATIC_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm hover:text-accent focus-visible:outline-none focus-visible:text-accent transition-colors"
            >
              {link.label === 'review' && dueCount > 0
                ? `review (${dueCount})`
                : link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
