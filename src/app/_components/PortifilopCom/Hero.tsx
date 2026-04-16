"use client";

import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Download, Layers } from "lucide-react";
import React from "react";

type EaseTuple = [number, number, number, number];
const EASE: EaseTuple = [0.22, 1, 0.36, 1];



const socials = [
  {
    icon: Github,
    href: "https://github.com/abdelrahmangalal200101-cpu",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/abdelrahman-galal-7b36823a7/",
    label: "LinkedIn",
  },
];

const stack = [
  {
    name: "React",
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.10)",
    border: "rgba(14,165,233,0.25)",
  },
  {
    name: "Next.js",
    color: "#94a3b8",
    bg: "rgba(148,163,184,0.08)",
    border: "rgba(148,163,184,0.2)",
  },
  {
    name: "Tailwind",
    color: "#0284c7",
    bg: "rgba(2,132,199,0.10)",
    border: "rgba(2,132,199,0.25)",
  },
];

const floatingCards = [
  {
    label: "const passion",
    value: '"clean code"',
    top: "12%",
    left: "4%",
    delay: 0,
  },
  {
    label: "import",
    value: "{ creativity }",
    top: "72%",
    left: "2%",
    delay: 0.15,
  },
  {
    label: "return",
    value: "<Amazing />",
    top: "82%",
    left: "62%",
    delay: 0.3,
  },
];

/* ─── Stars ─────────────────────────────────────────────── */
function StarField() {
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.8 + 0.5,
        duration: Math.random() * 4 + 2,
        delay: Math.random() * 5,
      })),
    [],
  );

  const glowStars = [
    { x: 15, y: 20, size: 3 },
    { x: 72, y: 12, size: 3.5 },
    { x: 88, y: 55, size: 2.5 },
    { x: 35, y: 75, size: 3 },
    { x: 55, y: 88, size: 2.5 },
    { x: 8, y: 60, size: 3.5 },
    { x: 92, y: 30, size: 2.5 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-slate-500 dark:bg-slate-300"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{ opacity: [0.45, 0.05, 0.45] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {glowStars.map((s, i) => (
        <motion.div
          key={`g-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: "#64748b",
            boxShadow: "0 0 5px 2px rgba(100,116,139,0.5)",
          }}
          animate={{ opacity: [0.7, 0.1, 0.7], scale: [1, 1.5, 1] }}
          transition={{
            duration: 3 + i * 0.4,
            delay: i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── SVG Illustration ──────────────────────────────────── */
function DevIllustration() {
  return (
    <svg
      viewBox="0 0 480 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect
        x="60"
        y="60"
        width="360"
        height="260"
        rx="18"
        fill="#0f172a"
        stroke="#334155"
        strokeWidth="2"
      />
      <rect x="72" y="72" width="336" height="236" rx="10" fill="#020617" />
      <ellipse
        cx="240"
        cy="190"
        rx="130"
        ry="90"
        fill="#c8522a"
        opacity="0.07"
      />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <g key={i}>
          <rect
            x="88"
            y={92 + i * 26}
            width="14"
            height="8"
            rx="2"
            fill="#334155"
            opacity="0.5"
          />
          <rect
            x="112"
            y={92 + i * 26}
            width={[28, 20, 36, 16, 28, 20, 36, 16][i]}
            height="8"
            rx="2"
            fill="#c8522a"
            opacity="0.85"
          />
          <rect
            x={148 + [0, 4, -4, 8, 0, 4, -4, 8][i]}
            y={92 + i * 26}
            width={[60, 80, 50, 72, 64, 76, 54, 68][i]}
            height="8"
            rx="2"
            fill="#94a3b8"
            opacity="0.5"
          />
          {i % 3 === 0 && (
            <rect
              x={220 + [0, 4, -4, 8][i % 4]}
              y={92 + i * 26}
              width={[30, 24, 36, 28][i % 4]}
              height="8"
              rx="2"
              fill="#38bdf8"
              opacity="0.4"
            />
          )}
        </g>
      ))}
      <motion.rect
        x="88"
        y={92 + 8 * 26}
        width="2"
        height="14"
        rx="1"
        fill="#c8522a"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
      <rect x="215" y="322" width="50" height="36" rx="4" fill="#1e293b" />
      <rect x="170" y="354" width="140" height="12" rx="6" fill="#1e293b" />
      <rect
        x="90"
        y="390"
        width="300"
        height="70"
        rx="10"
        fill="#0f172a"
        stroke="#1e293b"
        strokeWidth="1.5"
      />
      {[0, 1, 2].map((row) =>
        Array.from({ length: [13, 12, 10][row] }).map((_, col) => (
          <rect
            key={`${row}-${col}`}
            x={100 + col * 22 + row * 6}
            y={402 + row * 18}
            width="16"
            height="12"
            rx="3"
            fill="#1e293b"
          />
        )),
      )}
      <rect
        x="390"
        y="395"
        width="48"
        height="64"
        rx="24"
        fill="#0f172a"
        stroke="#1e293b"
        strokeWidth="1.5"
      />
      <line
        x1="414"
        y1="395"
        x2="414"
        y2="432"
        stroke="#334155"
        strokeWidth="1.2"
      />
      <ellipse cx="406" cy="415" rx="4" ry="6" fill="#1e293b" />
      <motion.circle
        cx="420"
        cy="100"
        r="28"
        fill="#c8522a"
        opacity="0.12"
        animate={{ y: [0, -12, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="60"
        cy="340"
        r="20"
        fill="#38bdf8"
        opacity="0.1"
        animate={{ y: [0, 10, 0], scale: [1, 1.1, 1] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />
      <motion.circle
        cx="440"
        cy="260"
        r="14"
        fill="#a78bfa"
        opacity="0.12"
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
      />
      <text
        x="28"
        y="190"
        fontSize="36"
        fill="#c8522a"
        opacity="0.2"
        fontFamily="monospace"
      >
        {"{"}
      </text>
      <text
        x="445"
        y="300"
        fontSize="36"
        fill="#c8522a"
        opacity="0.2"
        fontFamily="monospace"
      >
        {"}"}
      </text>
    </svg>
  );
}

function FloatingCard({
  label,
  value,
  style,
  delay,
}: {
  label: string;
  value: string;
  style: React.CSSProperties;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: [0, -6, 0] }}
      transition={{
        opacity: { delay, duration: 0.5 },
        y: {
          delay,
          duration: 3.5 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      style={style}
      className="absolute z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg
        bg-slate-900/90 dark:bg-slate-800/90
        border border-slate-700/60 backdrop-blur-sm shadow-xl
        text-[11px] font-mono pointer-events-none select-none"
    >
      <span className="text-slate-400">{label}</span>
      <span className="text-[#c8522a]">=</span>
      <span className="text-emerald-400">{value}</span>
    </motion.div>
  );
}

/* ─── Stack Pill ────────────────────────────────────────── */
function StackPill({
  name,
  color,
  bg,
  border,
}: {
  name: string;
  color: string;
  bg: string;
  border: string;
}) {
  return (
    <motion.span
      whileHover={{ y: -3, scale: 1.06 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold cursor-default select-none"
      style={{
        color,
        background: bg,
        border: `1px solid ${border}`,
        boxShadow: `0 0 14px 0 ${color}30`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: color }}
      />
      {name}
    </motion.span>
  );
}

/* ─── Scroll Indicator ──────────────────────────────────── */
function MouseScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.8, ease: EASE }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <motion.span
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-[9px] uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500 font-mono select-none"
      >
        scroll
      </motion.span>

      <div className="relative flex flex-col items-center">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-[12px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, #c8522a55, transparent 70%)",
            filter: "blur(6px)",
          }}
        />
        <svg
          width="26"
          height="40"
          viewBox="0 0 26 40"
          fill="none"
          className="relative z-10"
        >
          <rect
            x="1.5"
            y="1.5"
            width="23"
            height="37"
            rx="11.5"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-slate-300 dark:text-slate-600"
          />
          <line
            x1="13"
            y1="1.5"
            x2="13"
            y2="16"
            stroke="currentColor"
            strokeWidth="1"
            className="text-slate-200 dark:text-slate-700"
          />
          <motion.circle
            cx="13"
            cy="10"
            r="2.5"
            fill="#c8522a"
            animate={{ cy: [10, 16, 10], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-[3px] mt-0.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="rounded-full bg-slate-300 dark:bg-slate-600"
            style={{
              width: i === 0 ? 3 : i === 1 ? 2.5 : 2,
              height: i === 0 ? 3 : i === 1 ? 2.5 : 2,
            }}
            animate={{ opacity: [0.8 - i * 0.2, 0.1, 0.8 - i * 0.2] }}
            transition={{
              duration: 1.6,
              delay: i * 0.15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════ */
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-slate-950"
    >
      <StarField />

      {/* blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#c8522a]/[0.04] dark:bg-[#c8522a]/[0.07] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-500/[0.04] dark:bg-blue-500/[0.07] blur-[130px]" />
      </div>

      <div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10
        pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center"
      >
        {/* ── LEFT ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex flex-col"
        >
          {/* available badge */}
          <motion.div variants={item} className="mb-7 w-fit">
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs tracking-wide
              bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400
              border border-emerald-200/70 dark:border-emerald-800/70"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for work
            </span>
          </motion.div>

          {/* headline */}
          <motion.div variants={item} className="mb-6">
            <h1
              className="font-extrabold leading-[1.05] tracking-tight text-slate-900 dark:text-slate-50"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <span className="block text-[2.6rem] sm:text-[3.2rem] lg:text-[3.6rem]">
                Abdelrahman
              </span>
              <span className="block text-[2.6rem] sm:text-[3.2rem] lg:text-[3.6rem]">
                Galal
              </span>
              <span
                className="block mt-2 text-[1.6rem] sm:text-[2rem] lg:text-[2.2rem]
                text-transparent bg-clip-text font-extrabold
                bg-gradient-to-r from-[#c8522a] via-orange-400 to-amber-400"
              >
                Front End Developer
              </span>
            </h1>
          </motion.div>

          {/* bio */}
          <motion.p
            variants={item}
            className="mb-8 max-w-md text-base text-slate-500 dark:text-slate-400 leading-relaxed"
          >
            Building modern web experiences with{" "}
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              React
            </span>
            ,{" "}
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              Next.js
            </span>
            , and a passion for{" "}
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              clean code
            </span>
            .
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={item} className="flex flex-wrap gap-3 mb-10">
            {/* Download CV — put your cv.pdf in /public/ */}
            <motion.a
              href="/cv.pdf"
              download="Abdelrahman_Galal_CV.pdf"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                text-sm font-medium bg-slate-900 dark:bg-slate-50
                text-slate-50 dark:text-slate-900
                hover:bg-slate-800 dark:hover:bg-white
                transition-colors duration-300 shadow-lg shadow-slate-900/10"
            >
              <Download size={14} strokeWidth={2.5} />
              Download CV
            </motion.a>

            {/* Show Projects → GitHub */}
            <motion.a
              href="https://github.com/abdelrahmangalal200101-cpu"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                text-sm font-medium bg-transparent
                text-slate-700 dark:text-slate-300
                border border-slate-200 dark:border-slate-700
                hover:border-slate-400 dark:hover:border-slate-500
                hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-300"
            >
              <Github size={14} strokeWidth={2} />
              My Projects
            </motion.a>
          </motion.div>

          {/* stack */}
          <motion.div variants={item} className="mb-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-3 font-mono">
              Tech Stack
            </p>
            <div className="flex items-center gap-2.5">
              {stack.map((s) => (
                <StackPill key={s.name} {...s} />
              ))}
            </div>
          </motion.div>

          {/* socials */}
          <motion.div variants={item} className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600 mr-2 font-mono">
              Find me
            </span>
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="w-8 h-8 flex items-center justify-center rounded-lg
                  text-slate-400 dark:text-slate-500
                  hover:text-slate-700 dark:hover:text-slate-200
                  hover:bg-slate-100 dark:hover:bg-slate-800
                  border border-transparent hover:border-slate-200 dark:hover:border-slate-700
                  transition-colors duration-200"
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          className="relative flex items-center justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[480px]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#c8522a]/10 via-transparent to-blue-500/[0.08] blur-2xl scale-105" />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-3xl overflow-hidden
                border border-slate-200/60 dark:border-slate-800/60
                bg-slate-50/50 dark:bg-slate-900/50
                shadow-2xl shadow-slate-200/50 dark:shadow-slate-950/80
                backdrop-blur-sm p-6"
            >
              <DevIllustration />
            </motion.div>
            {floatingCards.map((card) => (
              <FloatingCard
                key={card.label}
                label={card.label}
                value={card.value}
                delay={card.delay}
                style={{ top: card.top, left: card.left }}
              />
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.5, ease: EASE }}
              className="absolute -bottom-4 -right-4 flex items-center gap-3 px-4 py-3 rounded-2xl
                bg-white dark:bg-slate-900
                border border-slate-200 dark:border-slate-800
                shadow-xl shadow-slate-200/50 dark:shadow-slate-950/80"
            >
              <div className="flex flex-col items-center">
                <span
                  className="font-extrabold text-lg text-slate-900 dark:text-slate-50 leading-none"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  2+
                </span>
                <span className="text-[10px] text-slate-400">Years</span>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
              <div className="flex flex-col items-center">
                <span
                  className="font-extrabold text-lg text-slate-900 dark:text-slate-50 leading-none"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  20+
                </span>
                <span className="text-[10px] text-slate-400">Projects</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <MouseScrollIndicator />
    </section>
  );
}
