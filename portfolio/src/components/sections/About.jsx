import { motion } from 'framer-motion';
import { SectionWrapper } from '../layout/SectionWrapper';
import { SectionHeading } from '../ui/SectionHeading';
import resume from '../../data/resume.json';
import styles from './About.module.css';

export function About() {
  const { summary } = resume.basics;

  return (
    <SectionWrapper id="about">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={styles.aboutGrid}
      >
        <div className={styles.textCol}>
          <SectionHeading>About</SectionHeading>
          <h2 className={styles.headline}>
            Building things that matter
          </h2>
          <div className={styles.bio}>
            <p>{summary}</p>
            <p style={{ marginTop: '16px' }}>
              Having completed my MCA at IMED – Bharati Vidyapeeth with a 9.27 CGPA,
              I combine strong academic foundations with practical industry experience
              at Actly, where I built AI-powered backend systems and Meta API integrations.
            </p>
            <p style={{ marginTop: '16px' }}>
              I'm passionate about backend architecture, AI tooling, and bridging the gap
              between complex systems and elegant developer experiences.
            </p>
          </div>
        </div>

        {/* Decorative panel */}
        <div className={styles.decorPanel}>
          <div className={styles.decorCard}>
            <p className={styles.decorLabel}>Education</p>
            <p className={styles.decorValue}>MCA @ IMED</p>
            <p className={styles.decorSub}>CGPA 9.27 · Pune, IN</p>
          </div>
          <div className={styles.decorCard}>
            <p className={styles.decorLabel}>Focus</p>
            <p className={styles.decorValue}>Backend + AI</p>
            <p className={styles.decorSub}>FastAPI · MCP · Python</p>
          </div>
          <div className={styles.decorCard}>
            <p className={styles.decorLabel}>Available for</p>
            <p className={styles.decorValue}>Opportunities</p>
            <p className={styles.decorSub}>Internship · Full-time</p>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
