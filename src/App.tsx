import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { AppProvider, useApp } from "./lib/store";
import { MARQUEE_A, MARQUEE_B } from "./lib/content";
import Preloader from "./components/Preloader";
import Background from "./components/Background";
import Cursor from "./components/Cursor";
import Frame from "./components/Frame";
import Nav from "./components/Nav";
import SideRail from "./components/SideRail";
import StatusBar from "./components/StatusBar";
import Toast from "./components/Toast";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    mass: 0.4,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[150] h-[3px] w-full origin-left bg-copperb shadow-[0_0_10px_rgba(230,168,104,0.6)]"
    />
  );
}

function SectionTracker() {
  const { setSection } = useApp();
  useEffect(() => {
    const ids = ["home", "about", "experience", "skills", "projects", "contact"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [setSection]);
  return null;
}

function Shell() {
  return (
    <>
      <Preloader />
      <Background />
      <Frame />
      <Cursor />
      <ProgressBar />
      <SectionTracker />
      <Nav />
      <SideRail />
      <main className="relative">
        <Hero />
        <Marquee items={MARQUEE_A} />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Marquee items={MARQUEE_B} reverse />
        <Contact />
      </main>
      <StatusBar />
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
