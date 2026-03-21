"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

type EaseTuple = [number, number, number, number];
const EASE: EaseTuple = [0.22, 1, 0.36, 1];

/* ── Contact Info ─────────────────────────────────────── */
const contactLinks = [
  {
    id: "email",
    label: "Email",
    value: "abdelrahmangalal200101@gmail.com",
    display: "abdelrahmangalal200101@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&to=abdelrahmangalal200101@gmail.com",
    newTab: true,
    color: "#c8522a",
    glow: "rgba(200,82,42,0.20)",
    bg: "rgba(200,82,42,0.07)",
    border: "rgba(200,82,42,0.20)",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.6}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    value: "https://github.com/abdelrahmangalal200101-cpu",
    display: "abdelrahmangalal200101-cpu",
    href: "https://github.com/abdelrahmangalal200101-cpu",
    newTab: true,
    color: "#e2e8f0",
    glow: "rgba(226,232,240,0.15)",
    bg: "rgba(226,232,240,0.06)",
    border: "rgba(226,232,240,0.15)",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "https://www.linkedin.com/in/abdelrahman-galal-7b36823a7/",
    display: "abdelrahman-galal",
    href: "https://www.linkedin.com/in/abdelrahman-galal-7b36823a7/",
    newTab: true,
    color: "#0A66C2",
    glow: "rgba(10,102,194,0.20)",
    bg: "rgba(10,102,194,0.07)",
    border: "rgba(10,102,194,0.20)",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "+20 114 768 0346",
    display: "+20 114 768 0346",
    href: "https://wa.me/201147680346",
    newTab: true,
    color: "#25D366",
    glow: "rgba(37,211,102,0.20)",
    bg: "rgba(37,211,102,0.07)",
    border: "rgba(37,211,102,0.20)",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

/* ── Copy Button ──────────────────────────────────────── */
function CopyButton({ value, color }: { value: string; color: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200"
      style={{
        background: copied ? `${color}20` : "transparent",
        border: `1px solid ${copied ? color + "40" : "transparent"}`,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={copied ? "check" : "copy"}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.15 }}
          style={{ color: copied ? color : "#94a3b8" }}
        >
          {copied ? (
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
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
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

/* ── Contact Card ─────────────────────────────────────── */
function ContactCard({
  link,
  index,
}: {
  link: (typeof contactLinks)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.09, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden
        bg-white dark:bg-slate-900
        border border-slate-200/80 dark:border-slate-800
        transition-all duration-300 group"
      style={{
        boxShadow: hovered
          ? `0 20px 50px -15px ${link.glow}, 0 0 0 1px ${link.border}`
          : "none",
      }}
    >
      {/* top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${link.color}, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />
      {/* bg glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at top left, ${link.bg}, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className="relative z-10 p-5 flex items-center gap-4">
        {/* icon */}
        <div
          className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
          style={{
            background: hovered ? link.bg : "rgba(148,163,184,0.06)",
            border: `1px solid ${hovered ? link.border : "rgba(148,163,184,0.12)"}`,
            color: hovered ? link.color : "#94a3b8",
          }}
        >
          {link.icon}
        </div>

        {/* info */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-0.5">
            {link.label}
          </p>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono truncate block transition-colors duration-200 text-slate-700 dark:text-slate-200"
            style={{ color: hovered ? link.color : undefined }}
          >
            {link.display}
          </a>
        </div>

        {/* copy */}
        <CopyButton value={link.value} color={link.color} />

        {/* external link */}
        <motion.a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 2, y: -2 }}
          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-200"
          style={{ color: hovered ? link.color : "#cbd5e1" }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </motion.a>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   CONTACT SECTION
═══════════════════════════════════════════════════════ */
export default function Contact() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section
      id="contact"
      className="relative py-28 bg-white dark:bg-slate-950 overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-[#c8522a]/[0.04] dark:bg-[#c8522a]/[0.07] blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/[0.03] dark:bg-blue-500/[0.05] blur-[130px]" />
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
              Get In Touch
            </span>
          </div>
          <h2
            className="font-extrabold text-[2.2rem] sm:text-[2.8rem] leading-[1.05] tracking-tight text-slate-900 dark:text-slate-50"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Let&apos;s{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c8522a] via-orange-400 to-amber-400">
              Work Together
            </span>
          </h2>
        </motion.div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* ── Left ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            {/* Quote card */}
            <div
              className="relative rounded-3xl p-8 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(200,82,42,0.08) 0%, rgba(249,115,22,0.05) 50%, transparent 100%)",
                border: "1px solid rgba(200,82,42,0.20)",
              }}
            >
              <div
                className="absolute top-4 right-6 text-[6rem] leading-none select-none pointer-events-none font-black"
                style={{
                  color: "rgba(200,82,42,0.08)",
                  fontFamily: "Georgia, serif",
                  lineHeight: 1,
                }}
              >
                "
              </div>
              <div className="relative z-10">
                <p
                  className="text-[1.05rem] leading-relaxed font-medium text-slate-700 dark:text-slate-300 mb-6"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  I&apos;m really happy you made it to my page.{" "}
                  <span className="text-[#c8522a] font-semibold">
                    Whether you have a project, an opportunity, or just want to
                    say hi
                  </span>{" "}
                  — my inbox is always open.
                </p>
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    Available for{" "}
                    <span className="text-slate-800 dark:text-slate-200 font-semibold">
                      freelance & full-time opportunities
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Info pills */}
            <div className="flex items-center gap-4 px-2">
              {[
                { icon: "⚡", label: "Fast reply", sub: "Usually within 24h" },
                { icon: "🤝", label: "Open to work", sub: "Remote & On-site" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 flex-1">
                  <span className="text-xl leading-none mt-0.5">
                    {item.icon}
                  </span>
                  <div>
                    <p
                      className="text-xs font-semibold text-slate-700 dark:text-slate-200"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {item.label}
                    </p>
                    <p className="text-[10px] font-mono text-slate-400">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 px-2">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(200,82,42,0.08)",
                  border: "1px solid rgba(200,82,42,0.20)",
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="#c8522a"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <p
                  className="text-xs font-semibold text-slate-700 dark:text-slate-200"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Sohag, Egypt
                </p>
                <p className="text-[10px] font-mono text-slate-400">
                  UTC+2 · Cairo Time
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Right — Cards ── */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {contactLinks.map((link, i) => (
              <ContactCard key={link.id} link={link} index={i} />
            ))}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
              className="mt-2"
            >
              <motion.a
                href="https://mail.google.com/mail/?view=cm&to=abdelrahmangalal200101@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden flex items-center justify-center gap-3
                  w-full py-4 rounded-2xl font-semibold text-sm
                  text-white transition-all duration-300 group"
                style={{
                  background: "linear-gradient(135deg, #c8522a, #f97316)",
                  boxShadow: "0 8px 32px -8px rgba(200,82,42,0.45)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <svg
                  className="w-4 h-4 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="relative z-10">Send me an email</span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
