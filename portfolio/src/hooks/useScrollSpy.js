import { useState, useEffect } from 'react';

/**
 * useScrollSpy
 * Watches a list of section IDs via IntersectionObserver.
 * Returns the currently visible section's ID as a string.
 *
 * @param {string[]} sectionIds - Array of section element IDs to observe
 * @param {number}   offset     - rootMargin top offset in px (default 80)
 * @returns {string} activeSection - ID of the currently visible section
 */
export function useScrollSpy(sectionIds, offset = 80) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');

  useEffect(() => {
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: `-${offset}px 0px -40% 0px`,
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [sectionIds, offset]);

  return activeSection;
}
