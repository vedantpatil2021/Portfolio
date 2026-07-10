import { ThemeProvider } from "./lib/theme";
import { BackgroundMusicProvider } from "./lib/backgroundMusic";
import { BackgroundMusicToggle } from "./components/ui/BackgroundMusicToggle";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Quote } from "./components/Quote";
import { Metrics } from "./components/Metrics";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Thought } from "./components/Thought";
import { Skills } from "./components/Skills";
import { Education } from "./components/Education";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  return (
    <ThemeProvider>
      <BackgroundMusicProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-on"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">
          <Hero />
          <Quote />
          <Metrics />
          <About />
          <Experience />
          <Projects />
          <Thought />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
        <BackgroundMusicToggle />
      </BackgroundMusicProvider>
    </ThemeProvider>
  );
}

export default App;
