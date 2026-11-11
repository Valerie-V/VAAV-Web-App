'use client'
import { useEffect } from 'react'

// One page-wide listener that tells any `.glow-card` under the pointer where
// the pointer is, so its green spotlight can follow it (see globals.css).
function PointerGlow() {
  useEffect(() => {
    const onMove = (e) => {
      const card = e.target instanceof Element ? e.target.closest('.glow-card') : null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return null;
}

export default PointerGlow
