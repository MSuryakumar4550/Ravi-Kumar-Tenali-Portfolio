import { motion } from "motion/react";

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}) {
  return (
    <section id={id} className="py-24 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className={`text-center ${children ? "mb-14" : ""}`}
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{ background: "var(--brand-soft)", color: "var(--brand)" }}
          >
            {eyebrow}
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">{title}</h2>
          {subtitle && (
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
          )}
          <div
            className="mx-auto mt-6 h-1 w-20 rounded-full"
            style={{ background: "var(--gradient-hero)" }}
          />
        </motion.div>
        {children}
      </div>
    </section>
  );
}

export function Timeline({
  items,
}) {
  return (
    <div className="relative">
      <div
        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
        style={{ background: "linear-gradient(180deg, var(--brand) 0%, transparent 100%)" }}
      />
      <div className="space-y-10">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className={`relative flex md:items-center gap-6 md:gap-0 ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            <div className="hidden md:block md:w-1/2" />
            <div
              className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 ring-4 ring-white shadow-[var(--shadow-glow)]"
              style={{ background: "var(--brand)" }}
            />
            <div className="pl-12 md:pl-0 md:w-1/2 md:px-8">
              <div className="bg-white rounded-2xl p-6 border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] hover:-translate-y-1 transition-all duration-300 group">
                <span
                  className="inline-block px-2.5 py-1 rounded-md text-xs font-bold"
                  style={{ background: "var(--brand-soft)", color: "var(--brand)" }}
                >
                  {item.period}
                </span>
                <h3 className="mt-3 text-lg font-bold text-foreground group-hover:text-[var(--brand)] transition-colors">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="mt-1 text-sm text-muted-foreground">{item.subtitle}</p>
                )}
                {item.meta && (
                  <p className="mt-2 text-xs font-semibold" style={{ color: "var(--brand)" }}>
                    {item.meta}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
