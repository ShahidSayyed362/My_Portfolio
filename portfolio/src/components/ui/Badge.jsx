import { useState } from 'react';

/**
 * Badge — Skill badge. Border-only (no fill), with hover accent effect.
 * Used in: Skills section grouped badges.
 */
export function Badge({ children }) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '12px',
        fontWeight: 400,
        padding: '5px 14px',
        borderRadius: 'var(--radius-md)',
        background: 'var(--color-bg-card)',
        border: `0.5px solid ${hovered ? 'var(--color-accent)' : 'var(--color-border)'}`,
        color: hovered ? 'var(--color-text)' : 'var(--color-text-muted)',
        display: 'inline-block',
        transition: 'border-color var(--transition-fast), color var(--transition-fast)',
        cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </span>
  );
}
