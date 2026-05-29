import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { profile, professionalProfiles } from "./data";

export function Contact() {
  const [revealed, setRevealed] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.12;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.12;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  return (
    <section id="contact" className="py-12 px-6 relative overflow-hidden scroll-mt-20">
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{ background: "var(--gradient-soft)" }}
      />
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20 -z-10"
        style={{
          background: "radial-gradient(circle, #4BB8FA 0%, transparent 70%)",
          animation: "blob 20s ease-in-out infinite",
        }}
      />
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Main Connect Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 md:p-12 border border-border shadow-[var(--shadow-card)] flex flex-col items-center"
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{ background: "var(--brand-soft)", color: "var(--brand)" }}
          >
            Get in touch
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight">
            Let's <span style={{ color: "var(--brand)" }}>connect</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-sm max-w-lg leading-relaxed">
            Open to academic collaborations, research discussions, mentoring, guest lectures, or corporate train-the-trainer consulting opportunities.
          </p>

          <div className="mt-8 w-full flex flex-col items-center justify-center min-h-[120px]">
            <AnimatePresence mode="wait">
              {!revealed ? (
                <div className="flex flex-col items-center">
                  {/* Bouncing animated cue pointing down at the button */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center text-[10px] font-extrabold uppercase tracking-widest text-[var(--brand)] gap-1 mb-3 select-none"
                  >
                    <span>Click here to enquire</span>
                    <span className="text-sm">👇</span>
                  </motion.div>

                  <motion.button
                    key="enquire-btn"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    animate={{ x: coords.x, y: coords.y }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 180, damping: 20, mass: 0.1 }}
                    onClick={() => setRevealed(true)}
                    className="px-8 py-3.5 rounded-full font-bold text-white text-sm shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] cursor-pointer flex items-center gap-2 select-none relative z-10"
                    style={{ background: "var(--gradient-hero)" }}
                  >
                    <span>✉</span>
                    <span>Enquire Now</span>
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  key="email-revealed"
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
                  className="flex flex-col items-center gap-4 w-full px-4"
                >
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 justify-center items-center w-full">
                    {/* Primary/Personal Email */}
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest mb-1.5">
                        Personal Email
                      </span>
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-base md:text-xl font-black tracking-tight relative group hover:text-[var(--brand)] transition-colors break-all text-center"
                      >
                        {profile.email}
                        <span
                          className="absolute -bottom-1 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-300 rounded-full"
                          style={{ background: "var(--brand)" }}
                        />
                      </a>
                    </div>

                    {/* Divider line for desktop */}
                    <div className="hidden sm:block w-px h-10 bg-border/80 self-center" />

                    {/* Institutional/Academic Email */}
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest mb-1.5">
                        Academic Email
                      </span>
                      <a
                        href={`mailto:${profile.emailAlt}`}
                        className="text-base md:text-xl font-black tracking-tight relative group hover:text-[var(--brand)] transition-colors break-all text-center"
                      >
                        {profile.emailAlt}
                        <span
                          className="absolute -bottom-1 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-300 rounded-full"
                          style={{ background: "var(--brand)" }}
                        />
                      </a>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground font-medium mt-2">
                    Click either email above to start your inquiry.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Address */}
          <div className="w-full flex flex-col items-center border-t border-border/60 pt-6 text-xs text-muted-foreground space-y-1">
            <span className="font-bold uppercase tracking-wider">Office Address</span>
            <span className="text-sm font-semibold text-foreground text-center">
              Dept. of CSE, Saveetha Engineering College, Thandalam, Chennai, Tamil Nadu
            </span>
          </div>
        </motion.div>

        {/* Professional & Research Profiles Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-3xl p-6 md:p-8 border border-border shadow-[var(--shadow-card)] space-y-6"
        >
          <div className="text-center">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground">
              Professional & Academic Portals
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6 justify-center items-stretch">
            {professionalProfiles.map((p) => (
              <motion.a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.06, 
                  y: -4,
                  boxShadow: `0 10px 25px -5px ${p.bgColor}40` 
                }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center p-4 rounded-2xl border border-border/80 hover:border-transparent transition-colors text-center group bg-slate-50/50 hover:bg-white"
              >
                {/* Rounded Square Icon Badge */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-sm transition-transform group-hover:scale-110"
                  style={{ backgroundColor: p.bgColor }}
                >
                  {p.icon}
                </div>
                {/* Title */}
                <span className="font-bold text-foreground text-sm mt-4 group-hover:text-[var(--brand)] transition-colors leading-tight">
                  {p.name}
                </span>
                {/* Subtitle */}
                <span className="text-[10px] text-muted-foreground font-semibold mt-1 uppercase tracking-wider">
                  {p.label}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Institutional Faculty IDs */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl p-6 border border-border shadow-[var(--shadow-card)] max-w-xl mx-auto"
        >
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground text-center mb-4">
            Institutional Registrations
          </h3>
          <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-muted-foreground text-center">
            <div className="p-4 rounded-xl border border-border bg-slate-50/50 flex flex-col justify-between h-full">
              <span className="uppercase tracking-wider text-[10px]">AICTE Faculty ID</span>
              <span className="text-foreground text-sm font-bold mt-2">{profile.aicteId}</span>
            </div>
            <div className="p-4 rounded-xl border border-border bg-slate-50/50 flex flex-col justify-between h-full">
              <span className="uppercase tracking-wider text-[10px]">Anna University ID</span>
              <span className="text-foreground text-sm font-bold mt-2">{profile.annaUniversityId}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
