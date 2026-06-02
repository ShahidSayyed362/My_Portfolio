import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

// Inline SVGs for brand icons removed from lucide-react
const GitHubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
import { Button } from '../ui/Button';
import { Tag } from '../ui/Tag';
import { SectionWrapper } from '../layout/SectionWrapper';
import resume from '../../data/resume.json';
import styles from './Hero.module.css';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const SOCIAL_ICONS = { GitHub: <GitHubIcon size={16} />, LinkedIn: <LinkedInIcon size={16} /> };

export function Hero() {
  const { name, label, summary, location, profiles } = resume.basics;
  const [firstName, ...rest] = name.split(' ');
  const lastName = rest.join(' ');
  const topKeywords = resume.skills[0]?.keywords?.slice(0, 5) ?? [];

  return (
    <SectionWrapper id="hero">
      <motion.div
        className={styles.heroInner}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Eyebrow */}
        <motion.p variants={item} className={styles.eyebrow}>
          {label} · {location.city}, {location.countryCode}
        </motion.p>

        {/* Name */}
        <motion.h1 variants={item} className={styles.name}>
          {firstName}
          <br />
          {lastName}
        </motion.h1>

        {/* Tagline */}
        <motion.p variants={item} className={styles.tagline}>
          {summary}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={item} className={styles.ctas}>
          <Button variant="primary" href="#projects">View Projects</Button>
          <Button variant="ghost" href="#contact">Get in Touch</Button>
        </motion.div>

        {/* Tech Chips */}
        {topKeywords.length > 0 && (
          <motion.div variants={item} className={styles.chips}>
            {topKeywords.map((kw) => (
              <Tag key={kw} pill>{kw}</Tag>
            ))}
          </motion.div>
        )}

        {/* Social Links */}
        <motion.div variants={item} className={styles.socials}>
          {profiles.map(({ network, url }) => (
            <a key={network} href={url} target="_blank" rel="noopener noreferrer"
              className={styles.socialLink} aria-label={network}>
              {SOCIAL_ICONS[network] ?? network}
            </a>
          ))}
          <a href={`mailto:${resume.basics.email}`} className={styles.socialLink} aria-label="Email">
            <Mail size={16} />
          </a>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
