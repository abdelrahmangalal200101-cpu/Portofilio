"use client";

import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

function AGLogo() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      className="shrink-0"
    >
      <rect
        width="32"
        height="32"
        rx="8"
        className="fill-slate-900 dark:fill-slate-100"
      />
      <path
        d="M8 22L13 10L18 22"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="stroke-slate-50 dark:stroke-slate-900"
      />
      <path
        d="M10.2 18.2H15.8"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        className="stroke-slate-50 dark:stroke-slate-900"
      />
      <path
        d="M24 16.5H20.5C20.5 16.5 20.5 13 23 13C25.5 13 25.5 15 25.5 16C25.5 19.5 22 21 20.5 21"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="stroke-slate-50 dark:stroke-slate-900"
      />
      <circle cx="13" cy="10" r="1.4" className="fill-[#c8522a]" />
    </svg>
  );
}

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

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

const scrollTo = (href: string) => {
  document
    .getElementById(href.replace("#", ""))
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Footer() {
  return (
    <footer className="relative bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800/80 overflow-hidden">
      {/* subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.012] dark:opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#c8522a 1px,transparent 1px),linear-gradient(90deg,#c8522a 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* subtle glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-[#c8522a]/[0.04] dark:bg-[#c8522a]/[0.07] blur-[100px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
        {/* ── Top ── */}
        <div className="py-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Logo + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col items-center md:items-start gap-3"
          >
            <div className="flex items-center gap-2.5">
              <AGLogo />
              <div className="flex flex-col leading-none gap-0.5">
                <span
                  className="font-extrabold text-[0.9rem] tracking-tight text-slate-900 dark:text-slate-50"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Abdelrahman Galal
                </span>
                <span className="text-[0.6rem] tracking-[0.2em] uppercase text-slate-400 font-mono">
                  Front-End Developer
                </span>
              </div>
            </div>

            {/* availability dot */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                Available for new opportunities
              </span>
            </div>
          </motion.div>

          {/* Nav links */}
          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="flex items-center gap-1 flex-wrap justify-center"
          >
            {navLinks.map(({ href, label }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className="px-3 py-1.5 text-xs font-mono text-slate-400 dark:text-slate-500
                  hover:text-slate-700 dark:hover:text-slate-200
                  hover:bg-slate-50 dark:hover:bg-slate-900
                  rounded-lg transition-all duration-200 outline-none
                  focus-visible:ring-2 focus-visible:ring-[#c8522a]/40"
              >
                {label}
              </button>
            ))}
          </motion.nav>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="flex items-center gap-2"
          >
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

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/201147680346"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              whileHover={{ y: -2, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="w-8 h-8 flex items-center justify-center rounded-lg
                text-slate-400 dark:text-slate-500
                hover:text-[#25D366]
                hover:bg-slate-100 dark:hover:bg-slate-800
                border border-transparent hover:border-slate-200 dark:hover:border-slate-700
                transition-colors duration-200"
            >
              <svg
                className="w-[15px] h-[15px]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </motion.a>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

        {/* ── Bottom ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-[11px] font-mono text-slate-400">
            © {new Date().getFullYear()} Abdelrahman Galal · Built with{" "}
            <span className="text-slate-500">Next.js</span> &{" "}
            <span className="text-slate-500">Tailwind CSS</span>
          </p>
          <p className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            Designed & developed with
            <motion.span
              className="text-[#c8522a]"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ♥
            </motion.span>
            in Sohag, Egypt
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
