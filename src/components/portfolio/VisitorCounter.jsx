import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { motion } from "motion/react";

export function VisitorCounter() {
  const [displayCount, setDisplayCount] = useState(1085);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const project = "ravi-kumar-tenali-portfolio";
    const storageKey = `portfolio_visited_${project}`;
    const BASELINE = 1084;

    const fetchCounter = async () => {
      try {
        const isSessionViewed = sessionStorage.getItem(storageKey);
        const isDev = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
        
        let url;
        if (isDev) {
          // Local development: Call API directly
          url = `https://api.counterapi.dev/v1/ravi-kumar-tenali-portfolio/visits`;
          if (!isSessionViewed) {
            url += `/up`;
          }
        } else {
          // Production: Call our first-party Vercel Serverless Function proxy (bypasses adblockers)
          url = `/api/counter`;
          if (!isSessionViewed) {
            url += `?increment=true`;
          }
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Counter API failed");
        }
        const data = await response.json();
        
        if (isMounted) {
          const serverCount = data.count || 0;
          setDisplayCount(serverCount + BASELINE);
          
          if (!isSessionViewed) {
            sessionStorage.setItem(storageKey, "true");
          }
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching visitor count:", err);
        // Fallback: LocalStorage mock counter to never show error / zero.
        if (isMounted) {
          const localStored = localStorage.getItem(`local_visits_${project}`);
          let localCount = localStored ? parseInt(localStored, 10) : (BASELINE + 1);
          if (!sessionStorage.getItem(storageKey)) {
            localCount += 1;
            localStorage.setItem(`local_visits_${project}`, localCount.toString());
            sessionStorage.setItem(storageKey, "true");
          }
          setDisplayCount(localCount);
          setLoading(false);
        }
      }
    };

    fetchCounter();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-border animate-pulse w-32 h-8">
        <div className="w-4 h-4 bg-slate-200 rounded-full" />
        <div className="h-4 bg-slate-200 rounded w-16" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border bg-gradient-to-r from-slate-50 to-white shadow-sm hover:shadow-[var(--shadow-glow)] hover:border-[var(--brand)] transition-all duration-300 group cursor-default"
    >
      <div className="relative flex items-center justify-center">
        <Eye className="w-4 h-4 text-muted-foreground group-hover:text-[var(--brand)] transition-colors duration-300" />
        {/* Pulse Indicator */}
        <span className="absolute -top-1 -right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      </div>
      <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-300">
        Visitors:{" "}
        <span className="font-bold text-[var(--brand)] tabular-nums">
          {displayCount.toLocaleString()}
        </span>
      </span>
    </motion.div>
  );
}
