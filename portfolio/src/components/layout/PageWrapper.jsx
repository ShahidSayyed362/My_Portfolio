/**
 * PageWrapper — Outermost container constraining max-width
 * and providing page-level horizontal padding.
 */
export function PageWrapper({ children }) {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      {children}
    </div>
  );
}
