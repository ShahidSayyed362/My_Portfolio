/**
 * Tag — Tech tag/chip with sharp or pill border-radius.
 * Used in: Hero tech chips (pill=true), ProjectCard tech tags (pill=false)
 *
 * @param {boolean} pill - If true, uses border-radius: 999px (pill shape)
 */
export function Tag({ children, pill = false }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        fontWeight: 400,
        padding: '3px 9px',
        borderRadius: pill ? 'var(--radius-pill)' : 'var(--radius-sm)',
        background: 'var(--color-tag-bg)',
        color: 'var(--color-tag-text)',
        whiteSpace: 'nowrap',
        letterSpacing: '0.3px',
        display: 'inline-block',
      }}
    >
      {children}
    </span>
  );
}
