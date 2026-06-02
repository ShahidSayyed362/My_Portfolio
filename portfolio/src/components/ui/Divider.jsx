/**
 * Divider — 0.5px hairline horizontal rule in border color.
 * Used for visual separation within sections.
 */
export function Divider({ style = {} }) {
  return (
    <hr
      style={{
        border: 'none',
        borderTop: '0.5px solid var(--color-border)',
        margin: '0',
        ...style,
      }}
    />
  );
}
