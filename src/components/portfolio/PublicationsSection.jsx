import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Section } from "./Section";
import { publications, patents } from "./data";

// Helper function to extract structured metadata from citation strings
function parseSource(source) {
  const yearMatch = source.match(/\b(20\d{2})\b/);
  const year = yearMatch ? yearMatch[1] : null;

  const monthMatch = source.match(/\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)(?:\s*(?:to|-)\s*(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?))?\b/i);
  const month = monthMatch ? monthMatch[0] : null;

  const issnMatch = source.match(/(?:ISSN|P-ISSN):\s*([0-9-]+)/i);
  const issn = issnMatch ? issnMatch[1] : null;

  const pagesMatch = source.match(/(?:Pg|Pages):\s*([0-9\s–-]+)/i);
  const pages = pagesMatch ? pagesMatch[1].trim() : null;

  // Extract journal abbreviation in parentheses
  const abbrMatch = source.match(/\(([A-Z\s&-]{3,})\)/);
  const abbr = abbrMatch ? abbrMatch[1] : null;

  // Clean the source string of duplicate info
  let cleanSource = source
    .replace(/(?:ISSN|P-ISSN):\s*[0-9-]+/gi, "")
    .replace(/(?:Pg|Pages):\s*[0-9\s–-]+/gi, "")
    .replace(/\b(20\d{2})\b/g, "");

  if (month) {
    // Escape regex characters just in case
    const escapedMonth = month.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    cleanSource = cleanSource.replace(new RegExp(escapedMonth, 'gi'), "");
  }

  cleanSource = cleanSource
    .replace(/\s*,\s*$/, "")
    .replace(/\s*;\s*$/, "")
    .trim();

  // Remove duplicate spacing and punctuation
  cleanSource = cleanSource.replace(/\s+/g, " ").replace(/,\s*,/g, ",").trim();
  if (cleanSource.endsWith(",")) cleanSource = cleanSource.slice(0, -1);

  return { year, month, issn, pages, abbr, cleanSource };
}

export function PublicationsSection() {
  const [activeTab, setActiveTab] = useState("patents");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [copiedId, setCopiedId] = useState("");

  const isPatents = activeTab === "patents";
  const rawItems = activeTab === "patents" 
    ? patents.map(p => ({ id: p.id, title: p.title, source: p.status, desc: p.desc }))
    : activeTab === "journals" 
      ? publications.journals 
      : publications.conferences;

  const filteredItems = rawItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const currentVisibleItems = filteredItems.slice(0, visibleCount);

  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  };

  return (
    <Section
      id="publications"
      eyebrow="Research Work"
      title="Publications & Innovation"
      subtitle={`7 Patents Published and 63 Research papers across CSE, Cloud, and IoT domains.`}
    >
      <div className="space-y-8">
        {/* Tab Header & Search with Glassmorphism styles */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-slate-50/50 p-4 rounded-3xl border border-border/80 backdrop-blur-sm shadow-[var(--shadow-soft)]">
          <div className="flex flex-wrap p-1 bg-white/80 rounded-2xl border border-border shadow-sm w-fit gap-1 backdrop-blur-md">
            <button
              onClick={() => { setActiveTab("patents"); setSearchQuery(""); setVisibleCount(6); }}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeTab === "patents" ? "text-white shadow-md scale-102" : "text-muted-foreground hover:text-foreground"
              }`}
              style={activeTab === "patents" ? { background: "var(--brand)" } : {}}
            >
              📜 Patents (7)
            </button>
            <button
              onClick={() => { setActiveTab("journals"); setSearchQuery(""); setVisibleCount(6); }}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeTab === "journals" ? "text-white shadow-md scale-102" : "text-muted-foreground hover:text-foreground"
              }`}
              style={activeTab === "journals" ? { background: "var(--brand)" } : {}}
            >
              📄 Journals (46)
            </button>
            <button
              onClick={() => { setActiveTab("conferences"); setSearchQuery(""); setVisibleCount(6); }}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeTab === "conferences" ? "text-white shadow-md scale-102" : "text-muted-foreground hover:text-foreground"
              }`}
              style={activeTab === "conferences" ? { background: "var(--brand)" } : {}}
            >
              🎤 Conferences (17)
            </button>
          </div>

          <div className="relative max-w-sm w-full">
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(6); }}
              className="w-full pl-5 pr-12 py-3 rounded-2xl border border-border bg-white text-sm font-medium focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/15 shadow-sm transition-all placeholder:text-muted-foreground/60"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/80 text-base">🔍</span>
          </div>
        </div>

        {/* Publications / Patents List */}
        <div className="grid gap-6">
          <AnimatePresence mode="popLayout">
            {currentVisibleItems.map((item) => {
              if (isPatents) {
                return (
                  <motion.div
                    key={`patent-${item.id}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="group relative overflow-hidden bg-white rounded-3xl p-6 pl-8 md:p-8 md:pl-10 border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] hover:-translate-y-1 transition-all duration-500"
                  >
                    {/* Left Highlight Vertical Bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-amber-400 via-[var(--brand)] to-[var(--brand)]" />
                    
                    {/* Floating ambient glow */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="flex flex-col md:flex-row gap-5 items-start">
                      {/* Emblem */}
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl bg-amber-50 border border-amber-100 text-amber-500 shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-500 select-none">
                        📜
                      </div>
                      
                      <div className="space-y-3 w-full">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
                            Patent Published
                          </span>
                          <button 
                            onClick={() => handleCopyId(item.id)}
                            className="px-3 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 cursor-pointer transition-all flex items-center gap-1 active:scale-95"
                            title="Click to copy Patent ID"
                          >
                            ID: {item.id} {copiedId === item.id ? "✅ Copied!" : "📋 Copy"}
                          </button>
                        </div>
                        
                        <h4 className="font-black text-foreground text-lg md:text-xl group-hover:text-[var(--brand)] transition-colors leading-tight">
                          {item.title}
                        </h4>
                        
                        <p className="text-sm text-foreground/80 leading-relaxed border-t border-slate-100/80 pt-3">
                          {item.desc}
                        </p>
                        
                        <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground font-semibold">
                          <span className="flex items-center gap-1">🏛️ Indian Patent Office</span>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-1">📅 Published Dec 2024</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              // Research Papers (Journals / Conferences)
              const meta = parseSource(item.source);
              return (
                <motion.div
                  key={`${activeTab}-${item.id}`}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group relative overflow-hidden bg-white rounded-2xl p-5 pl-7 md:p-6 md:pl-8 border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  {/* Left Highlight Vertical Bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[var(--brand)]" />
                  
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    {/* Index Badge */}
                    <div className="px-3 py-1.5 rounded-lg flex items-center justify-center font-black text-[10px] shrink-0 select-none text-center bg-[var(--brand-soft)] text-[var(--brand)] min-w-[70px] uppercase">
                      {activeTab === "journals" ? `Journal #${item.id}` : `Paper #${item.id}`}
                    </div>
                    
                    <div className="space-y-3 w-full">
                      <h4 className="font-extrabold text-foreground text-base md:text-md leading-snug group-hover:text-[var(--brand)] transition-colors">
                        {item.title}
                      </h4>
                      
                      {/* Structured Metadata Pills */}
                      <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-50/80">
                        {meta.abbr && (
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-sky-50 border border-sky-100 text-[var(--brand)]">
                            {meta.abbr}
                          </span>
                        )}
                        {activeTab === "journals" && item.id >= 15 && item.id <= 39 && (
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-orange-50 border border-orange-200 text-[#f36c21] shadow-sm">
                            Scopus
                          </span>
                        )}
                        {(meta.year || meta.month) && (
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-50 border border-emerald-100 text-emerald-700">
                            📅 {meta.month ? `${meta.month} ` : ""}{meta.year}
                          </span>
                        )}
                        {meta.issn && (
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-purple-50 border border-purple-100 text-purple-700">
                            ISSN: {meta.issn}
                          </span>
                        )}
                        {meta.pages && (
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 border border-rose-100 text-rose-700 shadow-sm">
                            📖 {meta.pages}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
                        {meta.cleanSource}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm font-medium bg-slate-50/40 rounded-2xl border border-dashed border-border/80">
              🔍 No items match your search query.
            </div>
          )}
        </div>

        {/* Load More Button */}
        {filteredItems.length > visibleCount && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="px-7 py-3 rounded-full border border-border bg-white text-sm font-bold hover:border-[var(--brand)] hover:text-[var(--brand)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer active:scale-98"
            >
              Load More {activeTab === "patents" ? "Patents" : "Papers"}
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}
