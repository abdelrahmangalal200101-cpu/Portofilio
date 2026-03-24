"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type EaseTuple = [number, number, number, number];
const EASE: EaseTuple = [0.22, 1, 0.36, 1];

/* ── Skills ───────────────────────────────────────────── */
const skills = [
  {
    name: "React.js",
    level: 88,
    color: "#61DAFB",
    glow: "rgba(97,218,251,0.35)",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#61DAFB">
        <path d="M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C9.94 2 8.2 5.27 7.27 9.97 5.23 10.57 3 11.6 3 13.5s2.23 2.93 4.27 3.53C8.2 21.73 9.94 25 12 25s3.8-3.27 4.73-7.97c2.04-.6 4.27-1.63 4.27-3.53s-2.23-2.93-4.27-3.53C15.8 5.27 14.06 2 12 2Z"
        />
      </svg>
    ),
  },
  {
    name: "Next.js",
    level: 78,
    color: "#e2e8f0",
    glow: "rgba(226,232,240,0.25)",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#e2e8f0">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.85 0 3.58-.51 5.07-1.39L9.07 9.9v7.1H7V6.84l9.3 12.54A9.96 9.96 0 0 0 22 12c0-5.52-4.48-10-10-10Zm2.93 14.43L13 14.07V9h2v7.43Z" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    level: 75,
    color: "#3178C6",
    glow: "rgba(49,120,198,0.35)",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#3178C6">
        <path d="M3 3h18v18H3V3Zm10 9h3v1.5h-1.5V18H13v-4.5H11.5V12H13Zm-3.5 0H11v6H9.5v-2.5H8V18H6.5v-2.5H5V12h1.5v1.5H8V12h1.5Z" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    level: 90,
    color: "#38BDF8",
    glow: "rgba(56,189,248,0.35)",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#38BDF8">
        <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.5 6 12 6Zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.39 17.85 9.5 19 12 19c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.61 13.15 9.5 12 7 12Z" />
      </svg>
    ),
  },
  {
    name: "Redux Toolkit",
    level: 72,
    color: "#764ABC",
    glow: "rgba(118,74,188,0.35)",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#764ABC">
        <path d="M16.63 16.63c.39-1.54.1-3.22-.93-4.5l.93-1.86c1.34 1.81 1.76 4.17 1.06 6.4l-1.06-.04ZM12.5 19.5c-1.08 0-2.12-.28-3.03-.8l-1.5 1.1c1.35.78 2.88 1.2 4.53 1.2 2.26 0 4.32-.83 5.9-2.2l-1.07-.94c-1.28 1.08-2.93 1.64-4.83 1.64Zm-6-7.5c0-1.47.5-2.83 1.34-3.91L6.77 6.94A8.49 8.49 0 0 0 4.5 12c0 2.1.76 4.03 2.02 5.52l1.08-.93A6.5 6.5 0 0 1 6.5 12Zm5.5-6.5c1.5 0 2.88.5 3.99 1.34l1.07-.93A8.5 8.5 0 0 0 12 4.5c-1.5 0-2.93.4-4.16 1.1l.94 1.5A6.5 6.5 0 0 1 12 5.5Z" />
      </svg>
    ),
  },
  {
    name: "Git & GitHub",
    level: 82,
    color: "#F05032",
    glow: "rgba(240,80,50,0.35)",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#F05032">
        <path d="M23.13 11.57 12.43.87a1.36 1.36 0 0 0-1.93 0L8.31 3.06l2.44 2.44a1.62 1.62 0 0 1 2.05 2.07l2.35 2.35a1.62 1.62 0 1 1-.97.91L12.1 8.75v5.14a1.62 1.62 0 1 1-1.33.06V8.67a1.62 1.62 0 0 1-.88-2.13L7.49 4.13.87 10.74a1.36 1.36 0 0 0 0 1.93l10.7 10.7a1.36 1.36 0 0 0 1.93 0l9.63-9.63a1.36 1.36 0 0 0 0-1.97Z" />
      </svg>
    ),
  },
];

/* ── Timeline ─────────────────────────────────────────── */
const timeline = [
  {
    year: "2023",
    title: "The Beginning",
    desc: "Started the programming journey — explored multiple fields, then locked in on Front-End. Built solid foundations in HTML, CSS, Bootstrap & JavaScript (DOM, OOP).",
    tag: "Foundation",
    tagColor: "#34d399",
    side: "left" as const,
  },
  {
    year: "2024",
    title: "Going Deep",
    desc: "Mastered API integration, React.js & Next.js. Built projects ranging from basic HTML pages all the way to a full E-commerce application.",
    tag: "Growth",
    tagColor: "#c8522a",
    side: "right" as const,
  },
  {
    year: "Now",
    title: "Leveling Up",
    desc: "Expanding into Full-Stack with ASP.NET at Route Academy. Ranked top of class for two consecutive years — GPA 3.43/4 (B+).",
    tag: "Active",
    tagColor: "#38bdf8",
    side: "left" as const,
  },
];

/* ── Values ───────────────────────────────────────────── */
const values = [
  { icon: "✦", label: "Clean Code", desc: "Readable, maintainable & scalable" },
  {
    icon: "⚡",
    label: "Performance",
    desc: "Lighthouse-optimized, fast loads",
  },
  { icon: "🔍", label: "SEO-Friendly", desc: "SSR/SSG, meta, Core Web Vitals" },
  { icon: "📐", label: "Pixel-Perfect", desc: "Design-to-code with precision" },
  { icon: "📅", label: "Deadlines", desc: "Committed & reliable delivery" },
  { icon: "∞", label: "Always Learning", desc: "Continuous growth mindset" },
];

/* ── Stats ────────────────────────────────────────────── */
const stats = [
  { value: "2+", label: "Years Learning" },
  { value: "3.43", label: "GPA / 4.0" },
  { value: "#1", label: "Class Rank" },
  { value: "20+", label: "Projects Built" },
];

/* ── Skill Bar ────────────────────────────────────────── */
function SkillBar({
  skill,
  index,
}: {
  skill: (typeof skills)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
    >
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: `${skill.color}15`,
              border: `1px solid ${skill.color}30`,
            }}
          >
            {skill.icon}
          </div>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 font-mono">
            {skill.name}
          </span>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.08 + 0.5 }}
          className="text-xs font-mono font-bold tabular-nums"
          style={{ color: skill.color }}
        >
          {skill.level}%
        </motion.span>
      </div>

      {/* Track */}
      <div className="relative h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        {/* Glow */}
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{
            duration: 1.2,
            delay: index * 0.08 + 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-y-0 left-0 rounded-full blur-sm opacity-50"
          style={{ background: skill.color }}
        />
        {/* Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{
            duration: 1.2,
            delay: index * 0.08 + 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`,
          }}
        />
        {/* Tip dot */}
        <motion.div
          initial={{ left: 0, opacity: 0 }}
          animate={
            inView ? { left: `calc(${skill.level}% - 4px)`, opacity: 1 } : {}
          }
          transition={{
            duration: 1.2,
            delay: index * 0.08 + 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{
            background: skill.color,
            boxShadow: `0 0 8px 3px ${skill.glow}`,
          }}
        />
      </div>
    </motion.div>
  );
}

/* ── Timeline Node ────────────────────────────────────── */
function TimelineNode({
  item,
  index,
}: {
  item: (typeof timeline)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isLeft = item.side === "left";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: EASE }}
    >
      {/* ── Mobile layout (< md) ── */}
      <div className="flex md:hidden items-start gap-4">
        {/* Dot */}
        <div className="flex flex-col items-center flex-shrink-0 mt-1">
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{
              duration: 0.4,
              delay: index * 0.15 + 0.25,
              type: "spring",
              stiffness: 300,
            }}
            className="w-4 h-4 rounded-full border-2 border-white dark:border-slate-950 flex-shrink-0"
            style={{
              background: item.tagColor,
              boxShadow: `0 0 14px 4px ${item.tagColor}50`,
            }}
          />
        </div>

        {/* Card */}
        <div className="flex-1 pb-2">
          <div
            className="relative p-5 rounded-2xl
            bg-white dark:bg-slate-900
            border border-slate-200/80 dark:border-slate-800
            hover:border-slate-300 dark:hover:border-slate-700
            hover:shadow-lg hover:shadow-slate-200/40 dark:hover:shadow-slate-950/60
            transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full"
                style={{
                  color: item.tagColor,
                  background: `${item.tagColor}15`,
                  border: `1px solid ${item.tagColor}30`,
                }}
              >
                {item.tag}
              </span>
              <span className="font-black text-2xl text-slate-100 dark:text-slate-800 font-mono leading-none select-none">
                {item.year}
              </span>
            </div>
            <h3
              className="font-bold text-slate-900 dark:text-slate-50 text-sm mb-1.5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {item.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      </div>

      {/* ── Desktop layout (md+) ── */}
      <div
        className={`hidden md:flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}
      >
        {/* Card */}
        <div
          className={`w-[calc(50%-28px)] ${isLeft ? "pr-6 text-right" : "pl-6 text-left"}`}
        >
          <div
            className="relative p-5 rounded-2xl group
            bg-white dark:bg-slate-900
            border border-slate-200/80 dark:border-slate-800
            hover:border-slate-300 dark:hover:border-slate-700
            hover:shadow-lg hover:shadow-slate-200/40 dark:hover:shadow-slate-950/60
            transition-all duration-300"
          >
            <div
              className={`flex items-center gap-2 mb-2 ${isLeft ? "justify-end" : "justify-start"}`}
            >
              <span
                className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full"
                style={{
                  color: item.tagColor,
                  background: `${item.tagColor}15`,
                  border: `1px solid ${item.tagColor}30`,
                }}
              >
                {item.tag}
              </span>
              <span className="font-black text-2xl text-slate-100 dark:text-slate-800 font-mono leading-none select-none">
                {item.year}
              </span>
            </div>

            <h3
              className="font-bold text-slate-900 dark:text-slate-50 text-sm mb-1.5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {item.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {item.desc}
            </p>

            {/* connector */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 h-px w-6 bg-slate-200 dark:bg-slate-700
              ${isLeft ? "-right-6" : "-left-6"}`}
            />
          </div>
        </div>

        {/* Center dot */}
        <div className="relative z-10 flex-shrink-0 w-14 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{
              duration: 0.4,
              delay: index * 0.15 + 0.25,
              type: "spring",
              stiffness: 300,
            }}
            className="w-4 h-4 rounded-full border-2 border-white dark:border-slate-950"
            style={{
              background: item.tagColor,
              boxShadow: `0 0 14px 4px ${item.tagColor}50`,
            }}
          />
        </div>

        {/* Opposite side spacer */}
        <div className="w-[calc(50%-28px)]" />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════════ */
export default function About() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  const bioRef = useRef<HTMLDivElement>(null);
  const bioInView = useInView(bioRef, { once: true, margin: "-60px" });

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-60px" });

  return (
    <section
      id="about"
      className="relative py-28 bg-white dark:bg-slate-950 overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full
          bg-[#c8522a]/[0.04] dark:bg-[#c8522a]/[0.07] blur-[140px]"
        />
        <div
          className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] rounded-full
          bg-blue-500/[0.04] dark:bg-blue-500/[0.07] blur-[130px]"
        />
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
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#c8522a]/60" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-mono">
              Who I Am
            </span>
          </div>
          <h2
            className="font-extrabold text-[2.2rem] sm:text-[2.8rem] leading-[1.05] tracking-tight
              text-slate-900 dark:text-slate-50"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c8522a] via-orange-400 to-amber-400">
              Me
            </span>
          </h2>
        </motion.div>

        {/* ── Bio + Stats ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-24">
          {/* Bio — 3 cols */}
          <motion.div
            ref={bioRef}
            initial={{ opacity: 0, y: 30 }}
            animate={bioInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:col-span-3"
          >
            {/* Avatar + name */}
            <div className="flex items-start gap-5 mb-8">
              <div className="relative flex-shrink-0">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center
                    bg-gradient-to-br from-[#c8522a]/20 to-orange-400/10
                    border border-[#c8522a]/25 font-black text-xl text-[#c8522a] select-none"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  AG
                </div>
                <span
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500
                  border-2 border-white dark:border-slate-950 flex items-center justify-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </span>
              </div>
              <div>
                <h3
                  className="font-extrabold text-xl text-slate-900 dark:text-slate-50"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Abdelrahman Galal
                </h3>
                <p className="text-sm text-slate-400 font-mono mt-0.5">
                  Front-End Developer · Sohag, Egypt
                </p>
              </div>
            </div>

            {/* Bio text */}
            <div className="pl-5 border-l-2 border-[#c8522a]/30 mb-8 space-y-3">
              <p className="text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Passionate Front-End Developer focused on building{" "}
                <span className="text-slate-800 dark:text-slate-200 font-semibold">
                  modern, high-performance
                </span>{" "}
                web applications with clean architecture and pixel-perfect UI.
              </p>
              <p className="text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed">
                I care deeply about{" "}
                <span className="text-[#c8522a] font-semibold">
                  SEO-friendly structure
                </span>
                ,{" "}
                <span className="text-[#c8522a] font-semibold">
                  Lighthouse scores
                </span>
                , and writing code that's a pleasure to read and maintain.
              </p>
            </div>

            {/* Currently badge */}
            <div
              className="inline-flex items-center gap-3 px-4 py-3 rounded-xl
              border border-slate-200 dark:border-slate-800
              bg-slate-50/80 dark:bg-slate-900/80"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Currently →{" "}
                <span className="text-slate-800 dark:text-slate-200 font-semibold">
                  Full-Stack with ASP.NET @ Route Academy
                </span>
              </span>
            </div>
          </motion.div>

          {/* Stats — 2 cols */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="lg:col-span-2 grid grid-cols-2 gap-4 content-start"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.09 + 0.25,
                  ease: EASE,
                }}
                className="group relative p-5 rounded-2xl overflow-hidden
                  bg-white dark:bg-slate-900
                  border border-slate-200/80 dark:border-slate-800
                  hover:border-[#c8522a]/40 transition-all duration-300
                  hover:shadow-lg hover:shadow-[#c8522a]/5 cursor-default"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  bg-gradient-to-br from-[#c8522a]/[0.05] to-transparent"
                />
                <div
                  className="font-black text-3xl leading-none mb-1 text-transparent bg-clip-text
                    bg-gradient-to-r from-[#c8522a] to-orange-400"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {s.value}
                </div>
                <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Skills ── */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#c8522a]/60" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-mono">
                Core Skills
              </span>
            </div>
            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-7">
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#c8522a]/60" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-mono">
                My Journey
              </span>
            </div>
            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
          </motion.div>

          <div className="relative">
            {/* Center line — desktop في المنتصف، mobile على اليسار بجانب الـ dot */}
            <div
              className="absolute top-0 bottom-0 w-px
              left-[9px] md:left-1/2 md:-translate-x-1/2
              bg-gradient-to-b from-transparent via-slate-200 dark:via-slate-800 to-transparent"
            />
            <div className="flex flex-col gap-10">
              {timeline.map((item, i) => (
                <TimelineNode key={item.year} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Values ── */}
        <div>
          <motion.div
            ref={valuesRef}
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#c8522a]/60" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-mono">
                My Values
              </span>
            </div>
            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, y: 24 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative p-5 rounded-2xl overflow-hidden cursor-default
                  bg-white dark:bg-slate-900
                  border border-slate-200/80 dark:border-slate-800
                  hover:border-[#c8522a]/40 dark:hover:border-[#c8522a]/30
                  hover:shadow-xl hover:shadow-[#c8522a]/5
                  transition-colors duration-300"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  bg-gradient-to-br from-[#c8522a]/[0.05] via-transparent to-transparent"
                />
                <div
                  className="absolute top-0 right-0 w-14 h-14 opacity-0 group-hover:opacity-100
                  transition-opacity duration-300 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at top right,rgba(200,82,42,0.13),transparent 70%)",
                  }}
                />

                <div className="relative z-10">
                  <div className="text-xl mb-3 leading-none">{v.icon}</div>
                  <div
                    className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-1"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {v.label}
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500 font-mono leading-relaxed">
                    {v.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
