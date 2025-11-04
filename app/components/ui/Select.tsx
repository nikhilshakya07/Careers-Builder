'use client';

import * as React from 'react';
import { cn } from '@/app/lib/utils/cn';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function Select({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className,
  disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Calculate scrollbar width to prevent layout shift
  const scrollbarWidthRef = React.useRef<number>(0);

  React.useEffect(() => {
    // Calculate scrollbar width once
    const calculateScrollbarWidth = () => {
      if (typeof window === 'undefined') return 0;
      const outer = document.createElement('div');
      outer.style.visibility = 'hidden';
      outer.style.overflow = 'scroll';
      (outer.style as any).msOverflowStyle = 'scrollbar';
      outer.style.width = '100px';
      document.body.appendChild(outer);
      const inner = document.createElement('div');
      inner.style.width = '100%';
      outer.appendChild(inner);
      const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
      outer.parentNode?.removeChild(outer);
      return scrollbarWidth;
    };
    scrollbarWidthRef.current = calculateScrollbarWidth();
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll but maintain scrollbar to prevent layout shift
      const scrollbarWidth = scrollbarWidthRef.current;
      const body = document.body;
      
      // Add padding to compensate for scrollbar width
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }
      
      // Prevent scrolling
      body.style.overflow = 'hidden';
    } else {
      // Restore original state
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  };

  // Scroll selected option into view when opening
  const selectedOptionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen && selectedOptionRef.current) {
      selectedOptionRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [isOpen]);

  // Calculate if dropdown should open upward (for mobile overflow prevention)
  const [openUpward, setOpenUpward] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      // If not enough space below (less than 250px) and more space above, open upward
      setOpenUpward(spaceBelow < 250 && spaceAbove > spaceBelow);
    }
  }, [isOpen]);

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm',
          'ring-offset-background transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'hover:border-ring',
          isOpen && 'ring-2 ring-ring ring-offset-2'
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={cn('truncate', !selectedOption && 'text-muted-foreground')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={cn(
            'h-4 w-4 text-muted-foreground transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div
            className="fixed inset-0 z-40 bg-black/20 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Dropdown Panel */}
          <div
            ref={selectRef}
            className={cn(
              'absolute z-50 w-full rounded-md border border-input bg-background shadow-lg',
              'max-h-[min(300px,calc(100vh-200px))] overflow-auto overscroll-contain',
              'transition-all duration-200 ease-out',
              'opacity-100 scale-100',
              openUpward ? 'bottom-full mb-1' : 'top-full mt-1'
            )}
            style={{
              // Ensure dropdown doesn't go off-screen on mobile
              maxHeight: 'min(300px, calc(100vh - 200px))',
            }}
            onKeyDown={handleKeyDown}
            role="listbox"
          >
            <div className="p-1">
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <div
                    key={option.value}
                    ref={isSelected ? selectedOptionRef : null}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                      buttonRef.current?.focus();
                    }}
                    className={cn(
                      'relative flex w-full cursor-pointer select-none items-center rounded-md px-3 py-2.5 text-sm',
                      'transition-colors',
                      'focus:bg-accent focus:text-accent-foreground',
                      'hover:bg-accent hover:text-accent-foreground',
                      isSelected && 'bg-primary text-primary-foreground font-medium'
                    )}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span className="block truncate">{option.label}</span>
                    {isSelected && (
                      <svg
                        className="ml-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

