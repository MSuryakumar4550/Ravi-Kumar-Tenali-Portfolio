import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { Github } from "lucide-react";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#training", label: "Training" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#qualifications", label: "Qualifications" },
  { href: "#publications", label: "Research" },
  { href: "#contact", label: "Connect" },
];

export function CountUp({ 
  to, 
  duration = 1.5, 
  suffix = "", 
  padZero = false 
}) {
  const [count, setCount] = useState(1);
  const elementRef = useRef(null);

  useEffect(() => {
    let start = 1;
    const end = to;
    if (start === end) return;

    let startTime = null;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeProgress = progress * (2 - progress); // easeOutQuad
      const currentCount = Math.floor(easeProgress * (end - start) + start);
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animationFrameId = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [to, duration]);

  const displayVal = padZero ? count.toString().padStart(2, '0') : count.toString();
  return <span ref={elementRef}>{displayVal}{suffix}</span>;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV.map((item) => document.querySelector(item.href)).filter(
      (el) => el !== null
    );

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const handleScroll = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-white/95 backdrop-blur-xl border-b border-border shadow-[var(--shadow-card)]"
          : "bg-white/70 backdrop-blur-md"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
        <a href="#top" className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-[var(--shadow-soft)]"
            style={{ background: "var(--gradient-hero)" }}
          >
            TRK
          </div>
          <div className="leading-tight">
            <div className="font-bold text-base">Mr. Tenali Ravi Kumar</div>
            <div className="text-xs text-muted-foreground">
              Assistant Professor (Senior Grade) · CSE
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex gap-2 text-sm font-semibold relative">
          {NAV.map((l) => {
            const isActive = activeSection === l.href.substring(1);
            return (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  className={`relative z-10 px-4 py-2 rounded-xl block transition-all duration-300 ${
                    isActive ? "text-white font-black scale-102" : "text-foreground/80 hover:text-[var(--brand)]"
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-[var(--brand)] rounded-xl -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Hamburger Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-foreground focus:outline-none flex flex-col gap-[5px] cursor-pointer"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-[2px] bg-foreground transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`w-6 h-[2px] bg-foreground transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-[2px] bg-foreground transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>

        {/* Mobile Slide-down Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-border shadow-lg overflow-hidden z-40"
            >
              <ul className="flex flex-col p-6 gap-4 font-semibold text-sm">
                {NAV.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={(e) => handleScroll(e, l.href)}
                      className="block py-2 text-foreground/80 hover:text-[var(--brand)] transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li className="pt-2 border-t border-border/60 mt-2">
                  <a
                    href="https://github.com/TRAVIKUMAR81/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 py-2 text-[var(--brand)] hover:underline"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Profile</span>
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}

const TAGS = [
  "Cybersecurity",
  "Machine Learning",
  "IoT Systems",
  "Enterprise Java",
  "C++",
  "Data Mining",
  "Networking",
];

export function Hero({ image }) {
  return (
    <section
      id="top"
      className="relative pt-20 overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* texture overlay */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.5) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.4) 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, #fff 0%, transparent 70%)",
          animation: "blob 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, #fff 0%, transparent 70%)",
          animation: "blob 26s ease-in-out infinite reverse",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-20 grid md:grid-cols-[auto_1fr] gap-10 md:gap-14 items-center">
        {/* Circular profile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto md:mx-0"
        >
          <div className="absolute inset-0 rounded-full bg-white/40 blur-2xl scale-110" />
          <div
            className="relative w-56 h-56 md:w-64 md:h-64 rounded-full bg-white p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
            style={{ animation: "float 6s ease-in-out infinite" }}
          >
            <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-white">
              <img
                src={image}
                alt="Mr. Tenali Ravi Kumar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-center md:text-left text-white"
        >
          <p className="text-sm md:text-base font-semibold tracking-wide text-white/90">
            Educator &nbsp;|&nbsp; Mentor &nbsp;|&nbsp; Researcher &nbsp;|&nbsp; Senior Technical Trainer
          </p>
          <h1 className="mt-3 text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] drop-shadow-sm">
            Mr. Tenali Ravi Kumar
          </h1>
          <p className="mt-2 text-sm md:text-base font-medium text-white/90 leading-relaxed max-w-2xl">
            D.EC.E, B.Tech(CSE), M.Tech(CSE), (Ph.D.), MCSI, LMISTE, AMIRED, LMISRD, MCSTA.
          </p>
          <h2 className="mt-3 text-xl md:text-2xl font-semibold text-white/95">
            Assistant Professor (Senior Grade)
          </h2>
          <p className="mt-4 text-white/90 md:text-lg leading-relaxed max-w-2xl">
            {TAGS.join("  •  ")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
            <a
              href="#contact"
              className="px-7 py-3 rounded-full font-semibold bg-white text-[var(--brand)] hover:-translate-y-0.5 hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.3)] transition-all cursor-pointer"
            >
              Contact for Collaboration
            </a>
            <a
              href="#experience"
              className="px-7 py-3 rounded-full font-semibold border-2 border-white text-white hover:bg-white hover:text-[var(--brand)] transition-all cursor-pointer"
            >
              View Experience
            </a>
            <a
              href="https://github.com/TRAVIKUMAR81/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-full font-semibold bg-[#181717] hover:bg-[#2c2b2b] text-white hover:-translate-y-0.5 hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.3)] transition-all cursor-pointer flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const HIGHLIGHTS = [
  {
    icon: "🎓",
    value: 20,
    suffix: "+",
    padZero: false,
    label: "Years of Experience",
    desc: "Academic, Teaching, Research, and Mentoring experience.",
  },
  {
    icon: "🏆",
    value: 63,
    suffix: "",
    padZero: false,
    label: "Publications",
    desc: "International journal articles and conference research papers.",
  },
  {
    icon: "💡",
    value: 7,
    suffix: "",
    padZero: true,
    label: "Patents Published",
    desc: "Published innovation assets in environmental hazards and fleet tracking.",
  },
  {
    icon: "📊",
    value: 7,
    suffix: "",
    padZero: true,
    label: "Scopus H-Index",
    desc: "Scopus research citation impact value.",
  },
];

export function Highlights() {
  return (
    <section className="relative -mt-12 md:-mt-16 z-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {HIGHLIGHTS.map((h, i) => (
          <motion.div
            key={h.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-white rounded-2xl p-6 border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] hover:-translate-y-1 transition-all"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3"
              style={{ background: "var(--brand-soft)" }}
            >
              {h.icon}
            </div>
            <h3 className="font-bold text-[var(--brand)] text-base md:text-lg">
              <CountUp to={h.value} suffix={h.suffix} padZero={h.padZero} /> {h.label}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {h.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
