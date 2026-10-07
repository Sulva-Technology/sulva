'use client';

import { useRef, useState, type KeyboardEvent } from 'react';

export function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

// Roving-tabindex tablist state: arrows move selection and focus.
export function useTabs(length: number) {
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (index: number, focus = false) => {
    const next = wrapIndex(index, length);
    setInteracted(true);
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const advance = () => setActive((current) => wrapIndex(current + 1, length));

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      select(active + 1, true);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      select(active - 1, true);
    }
  };

  return { active, interacted, select, advance, onKeyDown, tabRefs };
}
