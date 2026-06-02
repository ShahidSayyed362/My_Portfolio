import { SectionWrapper } from '../layout/SectionWrapper';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectCard } from '../ui/ProjectCard';
import resume from '../../data/resume.json';
import styles from './Projects.module.css';

export function Projects() {
  const { projects } = resume;

  return (
    <SectionWrapper id="projects">
      <SectionHeading>Projects</SectionHeading>
      <h2 className={styles.sectionTitle}>Things I've built</h2>
      <div className={styles.grid}>
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
