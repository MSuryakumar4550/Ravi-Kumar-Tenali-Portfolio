import { motion } from "motion/react";
import { Github } from "lucide-react";
import profileImg from "./assets/profile.jpg";
import { Hero, Highlights, Navbar } from "./components/portfolio/Hero";
import { Section, Timeline } from "./components/portfolio/Section";
import { Contact } from "./components/portfolio/Contact";
import { PublicationsSection } from "./components/portfolio/PublicationsSection";
import { AchievementsSection } from "./components/portfolio/AchievementsSection";
import { VisitorCounter } from "./components/portfolio/VisitorCounter";
import {
  education,
  experience,
  affiliations,
  skills,
  subjects,
  profile,
  administrativeActivities,
  flagshipTraining,
} from "./components/portfolio/data";

export default function App() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <Hero image={profileImg} />
      <Highlights />

      {/* About Section - enriched with structured highlights */}
      <Section
        id="about"
        eyebrow="About"
        title="A lifetime in Computer Science"
        subtitle="Two decades of academic excellence across eight reputed engineering institutions in India — with 63 international publications, a Ph.D. in progress at Anna University, and an enduring passion for teaching the future of computing."
        className="pt-12 pb-12 px-6"
      >
        <div className="grid md:grid-cols-3 gap-6 mt-10 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-6 border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center text-lg font-bold mb-4">
                👨‍🏫
              </div>
              <h3 className="font-bold text-base md:text-lg mb-2">Teaching Philosophy</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Committed to student-centric learning by bridging theoretical computer science concepts with hands-on labs, engineering workshops, and real-world software project development.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-3xl p-6 border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center text-lg font-bold mb-4">
                🔍
              </div>
              <h3 className="font-bold text-base md:text-lg mb-2">Research Focus</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Actively exploring machine learning applications, cyber security protocols, and internet-of-things (IoT) integrations, with 63 international publications and a Ph.D. in progress at Anna University.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-3xl p-6 border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center text-lg font-bold mb-4">
                💼
              </div>
              <h3 className="font-bold text-base md:text-lg mb-2">Industry Enablement</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Certified by corporate leaders like Infosys, Wipro, and Virtusa to deliver specialized train-the-trainer (TTT) curriculum, preparing the next generation of engineers for technical careers.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Flagship Training Areas */}
      <TrainingSection />

      {/* Education */}
      <Section
        id="education"
        eyebrow="Education"
        title="Academic Journey"
        subtitle="From Diploma to Doctorate — a continuous pursuit of knowledge."
      >
        <Timeline
          items={education.map((e) => ({
            period: e.period,
            title: e.degree,
            subtitle: e.institution,
          }))}
        />
      </Section>

      {/* Experience */}
      <Section
        id="experience"
        eyebrow="Experience"
        title="20+ Years of Teaching"
        subtitle="Across eight reputed engineering institutions in India."
      >
        <Timeline
          items={experience.map((e) => ({
            period: e.period,
            title: e.role,
            subtitle: e.place,
            meta: e.duration,
          }))}
        />
      </Section>

      {/* Qualifications: Affiliations + Skills + Subjects */}
      <Section
        id="qualifications"
        eyebrow="Qualifications"
        title="Memberships & Expertise"
        subtitle="Professional affiliations, technical skills, and subjects taught."
      >
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Affiliations */}
          <div>
            <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded" style={{ background: "var(--brand)" }} />
              Professional Affiliations
            </h3>
            <div className="space-y-3">
              {affiliations.map((a, i) => (
                <motion.div
                  key={a.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white rounded-xl p-4 border border-border shadow-[var(--shadow-card)] hover:border-[var(--brand)] hover:shadow-[var(--shadow-glow)] transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-sm">{a.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">ID · {a.id}</div>
                    </div>
                    <span
                      className="shrink-0 text-xs font-bold px-2.5 py-1 rounded-md whitespace-nowrap"
                      style={{ background: "var(--brand-soft)", color: "var(--brand)" }}
                    >
                      {a.period}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded" style={{ background: "var(--brand)" }} />
              Technical Skills
            </h3>
            <div className="space-y-4">
              {Object.entries(skills).map(([cat, items], i) => (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white rounded-xl p-4 border border-border shadow-[var(--shadow-card)]"
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    {cat}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-full text-xs font-medium hover:scale-105 transition-transform cursor-default"
                        style={{ background: "var(--brand-soft)", color: "var(--brand)" }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Subjects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 bg-white rounded-2xl p-6 border border-border shadow-[var(--shadow-card)]"
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 rounded" style={{ background: "var(--brand)" }} />
            Subjects Taught
          </h3>
          <div className="flex flex-wrap gap-2">
            {subjects.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className="px-3 py-1.5 rounded-lg text-sm font-medium border hover:bg-[var(--brand-soft)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-all cursor-default"
                style={{ borderColor: "var(--border)" }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Publications Section */}
      <PublicationsSection />

      {/* Administrative Activities Section */}
      <ActivitiesSection />

      {/* Achievements, Certifications & Seminars Section */}
      <AchievementsSection className="pt-12 pb-2 px-6" />

      {/* Contact Section */}
      <Contact />

      <footer className="py-8 px-6 border-t border-border bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-sm text-muted-foreground font-semibold">
          <div>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </div>
          <div className="flex items-center justify-center">
            <VisitorCounter />
          </div>
        </div>
      </footer>
    </main>
  );
}

function TrainingSection() {
  return (
    <Section
      id="training"
      eyebrow="Training"
      title="Flagship Training Areas"
      subtitle="Built around practical implementation, research orientation, and the teaching needs of computer science engineering learners."
    >
      <div className="grid md:grid-cols-2 gap-6">
        {flagshipTraining.map((t, idx) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative overflow-hidden bg-white rounded-3xl p-6 pl-8 border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Left Highlight Vertical Bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[var(--brand)]" />
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0"
                  style={{ background: "var(--brand-soft)", color: "var(--brand)" }}
                >
                  {t.id}
                </span>
                <div>
                  <h3 className="font-bold text-base md:text-lg text-foreground group-hover:text-[var(--brand)] transition-colors leading-tight">
                    {t.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.subtitle}</p>
                </div>
              </div>

              <div className="mt-4 border-t border-border pt-4">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-2">You will learn</span>
                <div className="grid grid-cols-2 gap-2">
                  {t.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-border bg-slate-50 text-foreground/80 hover:bg-white hover:border-[var(--brand)] hover:text-[var(--brand)] hover:scale-[1.03] transition-all cursor-default text-center"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function ActivitiesSection() {
  return (
    <Section
      id="activities"
      eyebrow="Leadership"
      title="Administrative Activities"
      subtitle="Key leadership and organizational responsibilities undertaken across various academic institutions."
    >
      <div className="grid md:grid-cols-2 gap-6">
        {administrativeActivities.map((act, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative overflow-hidden bg-white rounded-2xl p-6 pl-8 border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] hover:border-[var(--brand)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Left Highlight Vertical Bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[var(--brand)]" />
            <div>
              <span
                className="inline-block px-2.5 py-1 rounded-md text-xs font-bold mb-4"
                style={{ background: "var(--brand-soft)", color: "var(--brand)" }}
              >
                {act.period}
              </span>
              <h3 className="text-lg font-bold text-foreground mb-1">
                {act.role}
              </h3>
              <p className="text-sm text-muted-foreground font-semibold">
                {act.institution}
              </p>
              {act.description && (
                <p className="text-xs text-muted-foreground mt-3 border-t border-slate-100 pt-2 leading-relaxed">
                  {act.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
