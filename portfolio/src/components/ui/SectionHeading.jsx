/**
 * SectionHeading — Gold uppercase eyebrow label for each section.
 * Renders a small ALL-CAPS label with wide tracking in accent color.
 */
export function SectionHeading({ children }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '11px',
        fontWeight: 400,
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
        color: 'var(--color-accent)',
        marginBottom: '28px',
      }}
    >
      {children}
    </p>
  );
}
