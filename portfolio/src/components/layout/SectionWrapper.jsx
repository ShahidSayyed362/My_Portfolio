/**
 * SectionWrapper — Per-section container with consistent padding,
 * max-width centering, and a hairline border-bottom separating sections.
 *
 * @param {string}  id        - section ID for anchor scroll and useScrollSpy
 * @param {string}  className - optional extra class
 * @param {boolean} noBorder  - if true, omits the bottom border (use on last section)
 */
export function SectionWrapper({ id, children, className = '', noBorder = false }) {
  return (
    <section
      id={id}
      className={className}
      style={{
        padding: 'var(--section-padding-y) var(--section-padding-x)',
        borderBottom: noBorder ? 'none' : '0.5px solid var(--color-border)',
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {children}
    </section>
  );
}
