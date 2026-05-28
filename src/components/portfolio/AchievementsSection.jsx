import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Section } from "./Section";
import { certifications, trainTheTrainer, seminarsWorkshops } from "./data";

const KEYWORDS = [
  "Big Data Analytics", "Hadoop", "Big Data", "AngularJS", "Cloud Computing",
  "Software Testing Tools", "IoT", "ISP", "Java Programming", "BSNL", "AWS",
  "Cyber Security", "Infosys", "TCS", "Data Mining", "Wireless Networks",
  "Soft Computing", "Computational Biology", "UML", "Rational Software Architect",
  "Infosys Campus Connect", "Outcome Based Education", "Oracle Academy",
  "SQL", "Infosys Faculty Enablement program", "Database Design", "Virtusa",
  "Wipro", ".Net Full Stack", "Full Stack Engineering"
];

function HighlightedText({ text }) {
  let highlighted = text;
  // Sort keywords by length descending to match longer phrases first
  const sortedKeywords = [...KEYWORDS].sort((a, b) => b.length - a.length);
  
  sortedKeywords.forEach(kw => {
    // Escape regex characters
    const escapedKw = kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`\\b(${escapedKw})\\b`, 'gi');
    highlighted = highlighted.replace(regex, `<span class="px-2 py-0.5 mx-0.5 rounded bg-sky-50/80 text-[var(--brand)] font-bold border border-sky-100/50">$1</span>`);
  });

  return <span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: highlighted }} />;
}

export function AchievementsSection() {
  const [activeTab, setActiveTab] = useState("certifications");
  const [workshopTab, setWorkshopTab] = useState("organized");
  const [visibleCount, setVisibleCount] = useState(6);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setVisibleCount(tab === "seminars" ? 5 : 6);
  };

  const getSeminarItems = () => {
    return workshopTab === "organized" ? seminarsWorkshops.organized : seminarsWorkshops.attended;
  };

  return (
    <Section
      id="achievements"
      eyebrow="Credentials"
      title="Achievements & Enablement"
      subtitle="Industry-grade certifications, Train-the-Trainer (TTT) credentials, and active participation in academic workshops."
    >
      <div className="space-y-8">
        {/* Navigation Tabs */}
        <div className="flex justify-center">
          <div className="flex flex-wrap p-1.5 bg-slate-50 border border-border rounded-2xl w-fit gap-1 shadow-sm">
            <button
              onClick={() => handleTabChange("certifications")}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeTab === "certifications" ? "text-white shadow-md scale-102" : "text-muted-foreground hover:text-foreground"
              }`}
              style={activeTab === "certifications" ? { background: "var(--brand)" } : {}}
            >
              📜 Certifications
            </button>
            <button
              onClick={() => handleTabChange("ttt")}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeTab === "ttt" ? "text-white shadow-md scale-102" : "text-muted-foreground hover:text-foreground"
              }`}
              style={activeTab === "ttt" ? { background: "var(--brand)" } : {}}
            >
              🏫 Trainer Enablement (TTT)
            </button>
            <button
              onClick={() => handleTabChange("seminars")}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeTab === "seminars" ? "text-white shadow-md scale-102" : "text-muted-foreground hover:text-foreground"
              }`}
              style={activeTab === "seminars" ? { background: "var(--brand)" } : {}}
            >
              🎤 Workshops & Seminars
            </button>
          </div>
        </div>

        {/* Content Panels */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            {/* Certifications Tab */}
            {activeTab === "certifications" && (
              <motion.div
                key="certifications-panel"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -6, boxShadow: "var(--shadow-glow)" }}
                    className="relative overflow-hidden bg-white rounded-3xl p-6 border border-border shadow-[var(--shadow-card)] transition-all duration-300 flex flex-col justify-between h-full group"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[var(--brand)]" />
                    <div>
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform duration-300"
                        style={{ background: "var(--brand-soft)" }}
                      >
                        📜
                      </div>
                      <h4 className="font-extrabold text-foreground text-sm line-clamp-3 mb-2 group-hover:text-[var(--brand)] transition-colors leading-snug">
                        {cert.title}
                      </h4>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-muted-foreground font-semibold">
                      <span>{cert.issuer}</span>
                      <span className="font-extrabold text-[var(--brand)]">{cert.date}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Trainer Enablement (TTT) Tab */}
            {activeTab === "ttt" && (
              <motion.div
                key="ttt-panel"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid sm:grid-cols-3 gap-6"
              >
                {trainTheTrainer.map((ttt, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -6, boxShadow: "var(--shadow-glow)" }}
                    className="relative overflow-hidden bg-white rounded-3xl p-6 border border-border shadow-[var(--shadow-card)] transition-all duration-300 flex flex-col justify-between h-full group"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[var(--brand)] to-emerald-400" />
                    <div>
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform duration-300"
                        style={{ background: "var(--brand-soft)" }}
                      >
                        🏫
                      </div>
                      <h4 className="font-extrabold text-foreground text-sm leading-snug group-hover:text-[var(--brand)] transition-colors">
                        {ttt.program}
                      </h4>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-muted-foreground font-semibold">
                      <span className="font-extrabold text-emerald-600 uppercase tracking-wider text-[10px]">Corporate Partner</span>
                      <span className="font-extrabold text-[var(--brand)]">{ttt.date}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Seminars & Workshops Tab */}
            {activeTab === "seminars" && (
              <motion.div
                key="seminars-panel"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Sub Toggle (Organized / Attended) */}
                <div className="flex bg-slate-100 p-1 rounded-xl border border-border/80 w-fit">
                  <button
                    onClick={() => { setWorkshopTab("organized"); setVisibleCount(5); }}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${
                      workshopTab === "organized" ? "bg-white text-[var(--brand)] shadow-sm font-extrabold" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Organized ({seminarsWorkshops.organized.length})
                  </button>
                  <button
                    onClick={() => { setWorkshopTab("attended"); setVisibleCount(5); }}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${
                      workshopTab === "attended" ? "bg-white text-[var(--brand)] shadow-sm font-extrabold" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Attended ({seminarsWorkshops.attended.length})
                  </button>
                </div>

                {/* List with highlights */}
                <div className="space-y-4">
                  {getSeminarItems().slice(0, visibleCount).map((item, idx) => (
                    <motion.div
                      key={`${workshopTab}-${idx}`}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="relative overflow-hidden bg-white rounded-2xl p-5 pl-7 border border-border shadow-[var(--shadow-card)] hover:border-[var(--brand)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 flex items-start gap-4"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[var(--brand)]" />
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5 select-none"
                        style={{ background: "var(--brand-soft)", color: "var(--brand)" }}
                      >
                        {idx + 1}
                      </div>
                      <p className="text-sm font-semibold text-foreground">
                        <HighlightedText text={item} />
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Load More Workshops */}
                {getSeminarItems().length > visibleCount && (
                  <div className="text-center mt-6">
                    <button
                      onClick={() => setVisibleCount(prev => prev + 5)}
                      className="px-6 py-2.5 rounded-full border border-border bg-white text-sm font-bold hover:border-[var(--brand)] hover:text-[var(--brand)] shadow-sm hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                    >
                      Load More Events
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
