import { motion } from 'framer-motion';
import { SectionWrapper } from '../layout/SectionWrapper';
import { SectionHeading } from '../ui/SectionHeading';
import { formatDateRange } from '../../utils/formatDate';
import resume from '../../data/resume.json';
import styles from './Experience.module.css';

function TimelineItem({ job, index }) {
  const { company, position, startDate, endDate, location, summary, highlights } = job;

  return (
    <motion.div
      className={styles.timelineItem}
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
    >
      {/* Dot + line */}
      <div className={styles.dotCol}>
        <span className={styles.dot} />
        <span className={styles.line} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <p className={styles.date}>{formatDateRange(startDate, endDate)}</p>
        <p className={styles.role}>{position}</p>
        <p className={styles.company}>{company} · {location}</p>
        {summary && <p className={styles.description}>{summary}</p>}
        {highlights?.length > 0 && (
          <ul className={styles.highlights}>
            {highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

export function Experience() {
  const { work } = resume;

  return (
    <SectionWrapper id="experience">
      <SectionHeading>Work Experience</SectionHeading>
      <div className={styles.timeline}>
        {work.map((job, i) => (
          <TimelineItem key={`${job.company}-${i}`} job={job} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
