'use client';
import { useLocale } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { Languages, Check } from 'lucide-react';
import { isLocale, languageNames, locales, localizedPath } from './config';

export function LanguageSwitcher() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = async (next: string) => {
    if (!isLocale(next)) return;
    setIsOpen(false);
    if (next === locale) return;
    setBusy(true);
    setFailed(false);
    try {
      const response = await fetch('/api/language', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale: next })
      });
      if (!response.ok) throw new Error('Language preference failed');
      const target = new URL(window.location.href);
      target.pathname = localizedPath(next, target.pathname);
      window.location.assign(target.href);
    } catch {
      setFailed(true);
      setBusy(false);
    }
  };

  const currentName = languageNames[isLocale(locale) ? locale : 'en'];

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        disabled={busy}
        aria-label={`Current language: ${currentName}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'transparent',
          border: 'none',
          padding: '4px 0',
          color: '#191b20',
          fontSize: '13px',
          fontWeight: 500,
          cursor: busy ? 'wait' : 'pointer',
          fontFamily: 'inherit',
          lineHeight: 1.4,
          opacity: busy ? 0.6 : 1,
        }}
      >
        <Languages size={17} strokeWidth={1.8} style={{ flexShrink: 0 }} />
        <span>{currentName}</span>
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Select language"
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: 0,
            background: '#ffffff',
            border: '1px solid #e2e4e9',
            borderRadius: '12px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
            padding: '6px',
            minWidth: '150px',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}
        >
          {locales.map(value => {
            const isSelected = value === locale;
            return (
              <button
                key={value}
                type="button"
                role="option"
                aria-selected={isSelected}
                lang={value}
                onClick={() => handleSelect(value)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '7px 12px',
                  border: 'none',
                  background: isSelected ? '#f4f5f7' : 'transparent',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: isSelected ? 600 : 400,
                  color: '#191b20',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={e => {
                  if (!isSelected) e.currentTarget.style.background = '#f9fafb';
                }}
                onMouseLeave={e => {
                  if (!isSelected) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span>{languageNames[value]}</span>
                {isSelected && <Check size={14} style={{ color: '#191b20', marginLeft: '8px', flexShrink: 0 }} />}
              </button>
            );
          })}
        </div>
      )}

      {failed && <span role="alert" style={{ color: '#ef4444', fontSize: '11px', marginLeft: '6px' }}>⚠</span>}
    </div>
  );
}

