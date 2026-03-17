'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '../ui/card';

interface SelectOption {
  value: string;
  label: string;
  icon?: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function CustomSelect({ options, value, onChange, label }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Закрытие при клике вне элемента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={selectRef}>
      {label && (
        <label className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
          {label}
        </label>
      )}
      
      {/* Кнопка выбора */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="mt-2 flex h-12 w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white transition hover:border-white/20 focus:border-[color:var(--neon)] focus:outline-none"
      >
        <span className="flex items-center gap-2">
          {selectedOption?.icon && (
            <span className="text-lg">{selectedOption.icon}</span>
          )}
          <span>{selectedOption?.label}</span>
        </span>
        <svg
          className={`h-5 w-5 text-[color:var(--muted)] transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Выпадающий список */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <Card className="absolute left-0 right-0 z-20 mt-2 max-h-64 overflow-y-auto border border-white/10 bg-[#0f111a]/98 p-2 shadow-xl backdrop-blur-sm">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition ${
                  value === option.value
                    ? 'bg-[color:var(--neon)]/20 text-white'
                    : 'text-[color:var(--muted)] hover:bg-white/5 hover:text-white'
                }`}
              >
                {option.icon && (
                  <span className="text-lg">{option.icon}</span>
                )}
                <span className="flex-1">{option.label}</span>
                {value === option.value && (
                  <svg className="h-5 w-5 text-[color:var(--neon-2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </Card>
        </>
      )}
    </div>
  );
}
