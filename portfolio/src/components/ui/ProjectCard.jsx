import { motion } from 'framer-motion';
import { Tag } from './Tag';

/**
 * ProjectCard — Single project card with hover animation.
 * Displays title, description, tech tags, and project link.
 *
 * @param {{ name, description, keywords, url }} project
 * @param {number} index - for staggered animation delay
 */
export function ProjectCard({ project, index = 0 }) {
  const { name, description, keywords = [], url } = project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -3 }}
      style={{
        background: 'var(--color-bg-card)',
        border: '0.5px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '22px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        transition: 'border-color var(--transition-base)',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-strong)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)';
      }}
    >
      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '16px',
          fontWeight: 500,
          color: 'var(--color-text)',
          marginBottom: '10px',
          lineHeight: 1.3,
        }}
      >
        {name}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          color: 'var(--color-text-muted)',
          lineHeight: 1.65,
          marginBottom: '16px',
          flexGrow: 1,
        }}
      >
        {description}
      </p>

      {/* Tech Tags */}
      {keywords.length > 0 && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {keywords.map((kw) => (
            <Tag key={kw}>{kw}</Tag>
          ))}
        </div>
      )}

      {/* Project Link */}
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            color: 'var(--color-accent)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            marginTop: 'auto',
            transition: 'opacity var(--transition-fast)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          View on GitHub →
        </a>
      )}
    </motion.div>
  );
}
