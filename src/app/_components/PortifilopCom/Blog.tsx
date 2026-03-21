"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

type EaseTuple = [number, number, number, number];
const EASE: EaseTuple = [0.22, 1, 0.36, 1];

/* ── Data ─────────────────────────────────────────────── */
const tags = ["All", "React.js", "Next.js", "TypeScript"];

const articles = [
  {
    id: 1,
    tag: "React.js",
    tagColor: "#61DAFB",
    tagBg: "rgba(97,218,251,0.08)",
    tagBorder: "rgba(97,218,251,0.20)",
    date: "Mar 2025",
    readTime: "5 min read",
    featured: true,
    number: "01",
    title: "Why useEffect Is Not the Best Choice for Fetching Data in React",
    excerpt:
      "When I first started learning React, I used useEffect for everything — especially for fetching data from APIs. It worked… but over time, I realized it can get messy very quickly. Loading states, errors, caching — all manual. Here's what I use instead.",
    problem: "Repetitive, hard-to-scale data fetching logic across components",
    solution:
      "React Query — handles caching, background updates & error states",
    codeSnippet: `// ❌ Before — manual & messy
const [data, setData] = useState(null)
useEffect(() => {
  fetch("/api/data").then(...)
}, [])

// ✅ After — React Query
const { data, isLoading } = useQuery({
  queryKey: ["data"],
  queryFn: () => fetch("/api/data").then(r => r.json())
})`,
    accentGradient: "from-[#61DAFB]/20 via-cyan-500/5 to-transparent",
    glowColor: "rgba(97,218,251,0.15)",
  },
  {
    id: 2,
    tag: "Next.js",
    tagColor: "#e2e8f0",
    tagBg: "rgba(226,232,240,0.08)",
    tagBorder: "rgba(226,232,240,0.20)",
    date: "Apr 2025",
    readTime: "4 min read",
    featured: false,
    number: "02",
    title: "Understanding SSR vs CSR in Next.js (Simple Explanation)",
    excerpt:
      "When I started using Next.js, SSR and CSR sounded confusing. Once I understood them, everything clicked. Here's the clearest explanation I could write.",
    problem: "Blank screens, slow first loads, and SEO issues with pure CSR",
    solution: "Know when to use SSR vs CSR — Next.js gives you full control",
    codeSnippet: `// CSR → loads blank, then hydrates
// SSR → server sends full HTML instantly

// Next.js lets you choose per-page:
export async function getServerSideProps() {
  const data = await fetchData()
  return { props: { data } }
}`,
    accentGradient: "from-slate-400/10 via-slate-500/5 to-transparent",
    glowColor: "rgba(226,232,240,0.10)",
  },
  {
    id: 3,
    tag: "TypeScript",
    tagColor: "#3178C6",
    tagBg: "rgba(49,120,198,0.08)",
    tagBorder: "rgba(49,120,198,0.20)",
    date: "May 2025",
    readTime: "6 min read",
    featured: false,
    number: "03",
    title: "Building a Custom useFetch Hook in React with TypeScript",
    excerpt:
      "Instead of repeating API logic in every component, I built a reusable custom hook. Clean, typed, and works across any component in seconds.",
    problem:
      "Copy-pasting fetch logic into every component — dirty and fragile",
    solution: "A typed generic useFetch<T> hook that handles everything once",
    codeSnippet: `export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(result => { setData(result); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [url])

  return { data, loading, error }
}`,
    accentGradient: "from-[#3178C6]/15 via-blue-500/5 to-transparent",
    glowColor: "rgba(49,120,198,0.15)",
  },
];

/* ── Tag Filter ───────────────────────────────────────── */
function TagFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (t: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {tags.map((tag) => (
        <motion.button
          key={tag}
          onClick={() => onChange(tag)}
          whileTap={{ scale: 0.95 }}
          className="relative px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all duration-300 outline-none"
          style={{
            color: active === tag ? "#fff" : "#94a3b8",
            background:
              active === tag
                ? "linear-gradient(135deg,#c8522a,#f97316)"
                : "transparent",
            border:
              active === tag
                ? "1px solid transparent"
                : "1px solid rgba(148,163,184,0.2)",
          }}
        >
          {tag}
        </motion.button>
      ))}
    </div>
  );
}

/* ── Code Block ───────────────────────────────────────── */
function CodeBlock({ code, color }: { code: string; color: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div
      className="relative rounded-xl overflow-hidden"
      style={{
        background: "rgba(15,23,42,0.95)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <button
          onClick={copy}
          className="text-[10px] font-mono transition-colors duration-200"
          style={{ color: copied ? color : "rgba(148,163,184,0.5)" }}
        >
          {copied ? "✓ copied" : "copy"}
        </button>
      </div>
      <pre
        className="px-4 py-4 text-[11px] leading-relaxed overflow-x-auto font-mono"
        style={{ color: "rgba(226,232,240,0.75)" }}
      >
        {code}
      </pre>
    </div>
  );
}

/* ── Featured Card ────────────────────────────────────── */
function FeaturedCard({ article }: { article: (typeof articles)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-3xl overflow-hidden cursor-default
        bg-white dark:bg-slate-900
        border border-slate-200/80 dark:border-slate-800
        transition-all duration-500"
      style={{
        boxShadow: hovered
          ? `0 30px 80px -20px ${article.glowColor}, 0 0 0 1px rgba(200,82,42,0.12)`
          : "0 4px 24px rgba(0,0,0,0.03)",
      }}
    >
      {/* gradient bg */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${article.accentGradient} transition-opacity duration-500 pointer-events-none`}
        style={{ opacity: hovered ? 1 : 0 }}
      />

      {/* noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 p-8 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-[10px] font-mono font-bold px-3 py-1 rounded-full tracking-wider uppercase"
                style={{
                  background:
                    "linear-gradient(135deg,rgba(200,82,42,0.12),rgba(249,115,22,0.12))",
                  border: "1px solid rgba(200,82,42,0.3)",
                  color: "#c8522a",
                }}
              >
                ✦ Featured
              </span>
              <span
                className="text-[10px] font-mono font-bold px-3 py-1 rounded-full"
                style={{
                  background: article.tagBg,
                  border: `1px solid ${article.tagBorder}`,
                  color: article.tagColor,
                }}
              >
                {article.tag}
              </span>
            </div>

            <div
              className="font-black text-[5rem] leading-none mb-2 select-none pointer-events-none"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: "rgba(200,82,42,0.06)",
                letterSpacing: "-0.05em",
              }}
            >
              {article.number}
            </div>

            <h3
              className="font-extrabold text-2xl md:text-3xl leading-tight text-slate-900 dark:text-slate-50 mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {article.title}
            </h3>

            <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              {article.excerpt}
            </p>

            <div className="space-y-2.5 mb-6">
              <div className="flex items-start gap-2.5">
                <span
                  className="flex-shrink-0 mt-0.5 text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                  style={{
                    background: "rgba(239,68,68,0.08)",
                    color: "#ef4444",
                    border: "1px solid rgba(239,68,68,0.15)",
                  }}
                >
                  Problem
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {article.problem}
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span
                  className="flex-shrink-0 mt-0.5 text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                  style={{
                    background: "rgba(52,211,153,0.08)",
                    color: "#34d399",
                    border: "1px solid rgba(52,211,153,0.15)",
                  }}
                >
                  Fix
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {article.solution}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
                <span>{article.date}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span>{article.readTime}</span>
              </div>
              <motion.button
                whileHover={{ x: 4 }}
                className="flex items-center gap-2 text-xs font-mono font-semibold"
                style={{ color: "#c8522a" }}
              >
                Read article
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Right — code */}
          <div className="relative">
            <div
              className="absolute -top-4 -right-4 w-32 h-32 rounded-full blur-3xl pointer-events-none"
              style={{ background: article.glowColor }}
            />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  Code Comparison
                </span>
                <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
              </div>
              <CodeBlock code={article.codeSnippet} color={article.tagColor} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Small Card ───────────────────────────────────────── */
function SmallCard({
  article,
  index,
}: {
  article: (typeof articles)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const [showCode, setShowCode] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden cursor-default flex flex-col
        bg-white dark:bg-slate-900
        border border-slate-200/80 dark:border-slate-800
        transition-all duration-400"
      style={{
        boxShadow: hovered
          ? `0 20px 50px -15px ${article.glowColor}, 0 0 0 1px rgba(200,82,42,0.08)`
          : "none",
      }}
    >
      {/* top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(90deg,transparent,${article.tagColor},transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* bg glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${article.accentGradient} transition-opacity duration-500 pointer-events-none`}
        style={{ opacity: hovered ? 1 : 0 }}
      />

      <div className="relative z-10 p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-5">
          <span
            className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full"
            style={{
              background: article.tagBg,
              border: `1px solid ${article.tagBorder}`,
              color: article.tagColor,
            }}
          >
            {article.tag}
          </span>
          <span
            className="font-black text-5xl leading-none select-none"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: "rgba(200,82,42,0.06)",
            }}
          >
            {article.number}
          </span>
        </div>

        <h3
          className="font-bold text-[15px] leading-snug text-slate-900 dark:text-slate-50 mb-3"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {article.title}
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-5 flex-1">
          {article.excerpt}
        </p>

        <div className="space-y-2 mb-5">
          <div className="flex items-start gap-2">
            <span
              className="flex-shrink-0 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded mt-0.5"
              style={{
                background: "rgba(239,68,68,0.08)",
                color: "#ef4444",
                border: "1px solid rgba(239,68,68,0.12)",
              }}
            >
              Problem
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              {article.problem}
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span
              className="flex-shrink-0 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded mt-0.5"
              style={{
                background: "rgba(52,211,153,0.08)",
                color: "#34d399",
                border: "1px solid rgba(52,211,153,0.12)",
              }}
            >
              Fix
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              {article.solution}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowCode((p) => !p)}
          className="flex items-center gap-1.5 text-[11px] font-mono mb-4 w-fit transition-colors duration-200"
          style={{ color: showCode ? article.tagColor : "#94a3b8" }}
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
          {showCode ? "Hide code" : "Show code snippet"}
        </button>

        <AnimatePresence>
          {showCode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="overflow-hidden mb-4"
            >
              <CodeBlock code={article.codeSnippet} color={article.tagColor} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
            <span>{article.date}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span>{article.readTime}</span>
          </div>
          <motion.button
            whileHover={{ x: 3 }}
            className="flex items-center gap-1.5 text-[11px] font-mono font-semibold"
            style={{ color: "#c8522a" }}
          >
            Read
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   BLOG SECTION
═══════════════════════════════════════════════════════ */
export default function Blog() {
  const [activeTag, setActiveTag] = useState("All");
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  const filtered =
    activeTag === "All"
      ? articles
      : articles.filter((a) => a.tag === activeTag);
  const featured = filtered.find((a) => a.featured) ?? filtered[0];
  const rest = filtered.filter((a) => a.id !== featured?.id);

  return (
    <section
      id="blog"
      className="relative py-28 bg-white dark:bg-slate-950 overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-[#c8522a]/[0.04] dark:bg-[#c8522a]/[0.07] blur-[140px]" />
        <div className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] rounded-full bg-cyan-500/[0.03] dark:bg-cyan-500/[0.06] blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#c8522a 1px,transparent 1px),linear-gradient(90deg,#c8522a 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
        {/* ── Header ── */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#c8522a]/60" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-mono">
              What I Write About
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h2
              className="font-extrabold text-[2.2rem] sm:text-[2.8rem] leading-[1.05] tracking-tight text-slate-900 dark:text-slate-50"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Dev{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c8522a] via-orange-400 to-amber-400">
                Blog
              </span>
            </h2>

            <div className="flex items-center gap-6 pb-1">
              {[
                { value: String(articles.length), label: "Articles" },
                { value: "Real", label: "Problems" },
                { value: "Clean", label: "Solutions" },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center gap-6">
                  {i > 0 && (
                    <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
                  )}
                  <div className="text-center">
                    <div
                      className="font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#c8522a] to-orange-400"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {s.value}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Tag Filter ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="flex items-center gap-4 mb-12"
        >
          <TagFilter active={activeTag} onChange={setActiveTag} />
          <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 hidden sm:block" />
          <span className="text-[10px] font-mono text-slate-400 hidden sm:block">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
          </span>
        </motion.div>

        {/* ── Content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {featured && (
              <div className="mb-8">
                <FeaturedCard article={featured} />
              </div>
            )}

            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rest.map((article, i) => (
                  <SmallCard key={article.id} article={article} index={i} />
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div
                  className="text-6xl mb-4 select-none"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  ✦
                </div>
                <p className="text-slate-400 font-mono text-sm">
                  No articles yet for{" "}
                  <span style={{ color: "#c8522a" }}>{activeTag}</span>
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
