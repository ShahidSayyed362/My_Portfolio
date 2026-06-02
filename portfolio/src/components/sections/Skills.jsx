import { motion } from 'framer-motion';
import { SectionWrapper } from '../layout/SectionWrapper';
import { SectionHeading } from '../ui/SectionHeading';
import { Badge } from '../ui/Badge';
import resume from '../../data/resume.json';
import styles from './Skills.module.css';

export function Skills() {
  const { skills } = resume;

  return (
    <SectionWrapper id="skills">
      <SectionHeading>Skills</SectionHeading>
      <h2 className={styles.sectionTitle}>What I work with</h2>

      <div className={styles.groups}>
        {skills.map((group, gi) => (
          <motion.div
            key={group.name}
            className={styles.group}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: gi * 0.07 }}
          >
            <p className={styles.groupLabel}>{group.name}</p>
            <div className={styles.badges}>
              {group.keywords.map((kw) => (
                <Badge key={kw}>{kw}</Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
