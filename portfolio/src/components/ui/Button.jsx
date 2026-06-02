/**
 * Button — Primary (gold filled) or Ghost (outlined) variant
 * Can render as <button> or <a> depending on whether `href` is provided.
 */
export function Button({ variant = 'primary', href, onClick, children, className = '' }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 24px',
    borderRadius: 'var(--radius-md)',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all var(--transition-fast)',
    whiteSpace: 'nowrap',
    border: 'none',
  };

  const styles = {
    primary: {
      ...base,
      background: 'var(--color-accent)',
      color: 'var(--color-bg)',
    },
    ghost: {
      ...base,
      background: 'transparent',
      color: 'var(--color-text)',
      border: '1px solid var(--color-border)',
    },
  };

  const handleHover = (e, entering) => {
    if (variant === 'primary') {
      e.currentTarget.style.opacity = entering ? '0.85' : '1';
    } else {
      e.currentTarget.style.borderColor = entering ? 'var(--color-accent)' : 'var(--color-border)';
      e.currentTarget.style.color = entering ? 'var(--color-accent)' : 'var(--color-text)';
    }
  };

  if (href) {
    return (
      <a
        href={href}
        style={styles[variant]}
        className={className}
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      style={styles[variant]}
      onClick={onClick}
      className={className}
      onMouseEnter={(e) => handleHover(e, true)}
      onMouseLeave={(e) => handleHover(e, false)}
    >
      {children}
    </button>
  );
}
