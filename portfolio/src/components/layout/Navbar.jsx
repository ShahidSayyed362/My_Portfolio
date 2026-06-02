import { useState, useEffect } from 'react';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { Menu, X } from 'lucide-react';
import resume from '../../data/resume.json';
import styles from './Navbar.module.css';

const NAV_SECTIONS = ['about', 'experience', 'projects', 'skills', 'contact'];

const INITIALS = resume.basics.name
  .split(' ')
  .slice(0, 2)
  .map((n) => n[0])
  .join('');

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useScrollSpy(NAV_SECTIONS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <a href="#hero" className={styles.logo}>
          {INITIALS}.
        </a>

        {/* Desktop nav links */}
        <ul className={styles.navLinks}>
          {NAV_SECTIONS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={activeSection === id ? `${styles.navLink} ${styles.active}` : styles.navLink}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.right}>
          <a
            href={`mailto:${resume.basics.email}`}
            className={styles.resumeBtn}
          >
            Hire Me
          </a>
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={styles.mobileLink}
              onClick={handleNavClick}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
