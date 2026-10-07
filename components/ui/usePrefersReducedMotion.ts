'use client';

import { useEffect, useState } from 'react';

export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(query.matches);
    const onChange = () => setReduce(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduce;
}
