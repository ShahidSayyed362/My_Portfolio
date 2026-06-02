import { motion } from 'framer-motion';
import { SectionWrapper } from '../layout/SectionWrapper';
import { SectionHeading } from '../ui/SectionHeading';
import { formatDateRange } from '../../utils/formatDate';
import resume from '../../data/resume.json';
import styles from './Education.module.css';

export function Education() {
  const { education } = resume;

  return (
    <SectionWrapper id="education">
      <SectionHeading>Education</SectionHeading>
      <h2 className={styles.sectionTitle}>Academic background</h2>

      <div className={styles.list}>
        {education.map((edu, i) => (
          <motion.div
            key={`${edu.institution}-${i}`}
            className={styles.item}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
          >
            <div className={styles.left}>
              <p className={styles.institution}>{edu.institution}</p>
              <p className={styles.degree}>{edu.studyType}{edu.area ? ` — ${edu.area}` : ''}</p>
              <p className={styles.date}>{formatDateRange(edu.startDate, edu.endDate)}</p>
            </div>
            {edu.score && (
              <div className={styles.score}>
                <span>{edu.score}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
