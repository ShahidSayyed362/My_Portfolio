import './styles/globals.css';
import './styles/animations.css';
import { PageWrapper } from './components/layout/PageWrapper';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Education } from './components/sections/Education';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <PageWrapper>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </PageWrapper>
  );
}

export default App;
