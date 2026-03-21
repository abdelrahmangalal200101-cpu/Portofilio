"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Sun, Moon, Menu, X, ArrowRight } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#blog", label: "Blog" },
];

function AGLogo() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const arrowControls = useAnimation();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const isDark = saved ? saved === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(`#${id}`);
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setActive(href);
    setMenuOpen(false);
    document
      .getElementById(href.replace("#", ""))
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* ══════════════════════ NAV BAR ══════════════════════ */}
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`
          fixed top-0 inset-x-0 z-50
          flex items-center justify-between
          px-6 md:px-10 h-16
          transition-all duration-500
          ${
            scrolled
              ? "bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800/70"
              : "bg-transparent"
          }
        `}
      >
        {/* ── Logo ── */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="group flex items-center gap-2.5 rounded-xl p-1 -m-1 outline-none
            focus-visible:ring-2 focus-visible:ring-[#c8522a]/60
            focus-visible:ring-offset-2 focus-visible:ring-offset-white
            dark:focus-visible:ring-offset-slate-950"
        >
          <motion.div
            whileHover={{ scale: 1.08, rotate: -4 }}
            whileTap={{ scale: 0.93 }}
            transition={{ type: "spring", stiffness: 380, damping: 18 }}
          >
            <AGLogo />
          </motion.div>
          <div className="flex flex-col leading-none gap-0.5">
            <span
              className="font-syne font-extrabold text-[0.95rem] tracking-tight
              text-slate-900 dark:text-slate-50
              group-hover:text-slate-600 dark:group-hover:text-slate-300
              transition-colors duration-200"
            >
              Abdelrahman
            </span>
            <span
              className="font-dm-sans text-[0.62rem] tracking-[0.2em] uppercase
              text-slate-400 dark:text-slate-500 transition-colors duration-200"
            >
              Galal
            </span>
          </div>
        </a>

        {/* ── Desktop links ── */}
        {/* 
          CHANGED: 
          - Removed border-r from <li> entirely
          - Pill now uses layoutId="nav-pill" with a smoother spring
          - Pill shape is slightly taller and more rounded for a premium feel
        */}
        <ul className="hidden md:flex items-center gap-0.5">
          {links.map(({ href, label }) => {
            const isActive = active === href;
            return (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={`
                    relative flex items-center gap-1.5
                    px-4 py-1.5 text-sm font-dm-sans rounded-lg
                    outline-none select-none
                    focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#c8522a]/50
                    transition-colors duration-200
                    ${
                      isActive
                        ? "text-slate-900 dark:text-slate-50 font-medium"
                        : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    }
                  `}
                >
                  {/* Gliding pill */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg
                        bg-slate-900/[0.06] dark:bg-slate-100/[0.08]
                        ring-1 ring-inset ring-slate-900/[0.07] dark:ring-slate-100/[0.07]"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 28,
                        mass: 0.9,
                      }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* ── Right controls ── */}
        <div className="flex items-center gap-2.5">
          {/* ── Theme toggle ── */}
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.87 }}
            aria-label="Toggle theme"
            className="relative w-14 h-7 rounded-full
              bg-slate-100 dark:bg-slate-800
              border border-slate-200 dark:border-slate-700
              hover:border-slate-300 dark:hover:border-slate-600
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[#c8522a]/50 focus-visible:ring-offset-2
              focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950
              transition-colors duration-300"
          >
            <motion.span
              animate={{ x: dark ? 28 : 4 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute top-[3px] w-5 h-5 rounded-full
                bg-white dark:bg-slate-900
                border border-slate-200 dark:border-slate-600
                shadow-sm flex items-center justify-center
                text-slate-500 dark:text-slate-400"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={dark ? "sun" : "moon"}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center"
                >
                  {dark ? <Sun size={11} /> : <Moon size={11} />}
                </motion.span>
              </AnimatePresence>
            </motion.span>
          </motion.button>

          {/* ── Hire me ── */}
          <motion.a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            onHoverStart={() =>
              arrowControls.start({
                rotate: -45,
                y: -2,
                transition: { type: "spring", stiffness: 400, damping: 18 },
              })
            }
            onHoverEnd={() =>
              arrowControls.start({
                rotate: 0,
                y: 0,
                transition: { type: "spring", stiffness: 400, damping: 18 },
              })
            }
            whileTap={{ scale: 0.96 }}
            className="hidden md:inline-flex items-center gap-2
    relative
    text-sm font-medium font-dm-sans
    px-5 py-2 rounded-full
    bg-slate-900 dark:bg-slate-50
    text-slate-50 dark:text-slate-900
    ring-1 ring-inset ring-white/10 dark:ring-black/10
    hover:bg-slate-800 dark:hover:bg-white
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-[#c8522a]/60 focus-visible:ring-offset-2
    focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950
    transition-colors duration-300
    group"
          >
            <span className="relative z-10">Hire me</span>

            {/* ── Arrow ── */}
            <motion.span
              animate={arrowControls}
              className="relative z-10 flex items-center justify-center
      w-5 h-5 rounded-full
      bg-white/15 dark:bg-black/15
      ring-1 ring-white/20 dark:ring-black/20"
            >
              <ArrowRight size={11} strokeWidth={2.5} />
            </motion.span>
          </motion.a>

          {/* Hamburger — mobile */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg
              text-slate-600 dark:text-slate-400
              hover:bg-slate-100 dark:hover:bg-slate-800
              hover:text-slate-900 dark:hover:text-slate-100
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[#c8522a]/50
              transition-colors duration-200"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "x" : "menu"}
                initial={{ opacity: 0, rotate: -80, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 80, scale: 0.5 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* ══════════════════════ MOBILE MENU ══════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-16 inset-x-0 z-40
              bg-white/95 dark:bg-slate-950/95
              backdrop-blur-xl
              border-b border-slate-200 dark:border-slate-800
              md:hidden"
          >
            <ul className="flex flex-col py-2 px-3">
              {links.map(({ href, label }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.06,
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className={`
                      flex items-center h-11 px-3 text-sm rounded-lg
                      transition-colors duration-150
                      focus-visible:outline-none focus-visible:ring-2
                      focus-visible:ring-[#c8522a]/50 focus-visible:ring-inset
                      ${
                        active === href
                          ? "text-slate-900 dark:text-slate-50 font-medium bg-slate-900/[0.06] dark:bg-slate-100/[0.07]"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-900/[0.04] dark:hover:bg-slate-100/[0.05]"
                      }
                    `}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}

              <motion.li
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: links.length * 0.06,
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="pt-2 pb-2"
              >
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="relative overflow-hidden
                    flex items-center justify-center gap-2
                    text-sm font-medium px-4 py-2.5 rounded-lg
                    bg-slate-900 dark:bg-slate-50
                    text-slate-50 dark:text-slate-900
                    transition-all duration-300 group"
                >
                  <span
                    className="pointer-events-none absolute inset-0
                    -translate-x-full group-hover:translate-x-full
                    transition-transform duration-500 ease-in-out
                    bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                  <span className="relative z-10">Hire me</span>
                  <ArrowRight
                    size={13}
                    strokeWidth={2.5}
                    className="relative z-10 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
                  />
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
