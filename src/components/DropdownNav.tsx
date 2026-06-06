'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getDueItems } from '@/lib/leitner';

const STATIC_NAV_LINKS = [
  { href: '/', label: 'home' },
  { href: '/lessons', label: 'lessons' },
  { href: '/review', label: 'review' },
  { href: '/journey/narrative', label: 'narrative' },
  { href: '/cheatsheet', label: 'cheatsheet' },
  { href: '/resources', label: 'resources' },
  { href: '/practice-log', label: 'practice log' },
];

const MENU_ID = 'site-menu';

export default function DropdownNav() {
  const [open, setOpen] = useState(false);
  const [dueCount, setDueCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    setDueCount(getDueItems().length);
  }, []);

  // Focus first menu item when the menu opens.
  useEffect(() => {
    if (open) {
      // Wait for the DOM to render the menu items before focusing.
      requestAnimationFrame(() => {
        itemRefs.current[0]?.focus();
      });
    }
  }, [open]);

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
        // Return focus to the trigger button.
        buttonRef.current?.focus();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  function handleMenuKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const items = itemRefs.current.filter((el): el is HTMLAnchorElement => el !== null);
    if (items.length === 0) return;

    const activeIndex = items.findIndex((el) => el === document.activeElement);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = activeIndex < 0 ? 0 : (activeIndex + 1) % items.length;
      items[next]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = activeIndex <= 0 ? items.length - 1 : activeIndex - 1;
      items[next]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      items[items.length - 1]?.focus();
    } else if (e.key === 'Tab') {
      // Close on tab-out so focus exits naturally.
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={MENU_ID}
        onClick={() => setOpen((v) => !v)}
        className="text-sm px-3 py-1 rounded border border-fg/10 bg-bg/90 backdrop-blur-sm hover:border-fg/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 motion-safe:transition-colors"
      >
        menu ▾
      </button>

      {open && (
        <div
          ref={menuRef}
          id={MENU_ID}
          role="menu"
          aria-label="Site navigation"
          onKeyDown={handleMenuKeyDown}
          className="absolute right-0 mt-1 min-w-[10rem] rounded border border-fg/10 bg-bg shadow-sm z-50"
        >
          {STATIC_NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              href={link.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset focus-visible:text-accent motion-safe:transition-colors"
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
