"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, Clock } from "lucide-react";

type EaseTuple = [number, number, number, number];
const EASE: EaseTuple = [0.22, 1, 0.36, 1];

/* ─── Types ─────────────────────────────────────────────── */
interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  stack: { name: string; icon: string; color: string }[];
  live: string | null;
  github: string;
  status: "live" | "wip";
  featured: boolean;
  svg: React.ReactNode;
  accent: string;
  accentBg: string;
  accentBorder: string;
}

/* ─── Tech Icons ─────────────────────────────────────────── */
const TechIcon = ({ icon, color }: { icon: string; color: string }) => {
  const icons: Record<string, React.ReactNode> = {
    react: (
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill={color}>
        <path d="M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C9.94 2 8.2 5.27 7.27 9.97 5.23 10.57 3 11.6 3 13.5s2.23 2.93 4.27 3.53C8.2 21.73 9.94 25 12 25s3.8-3.27 4.73-7.97c2.04-.6 4.27-1.63 4.27-3.53s-2.23-2.93-4.27-3.53C15.8 5.27 14.06 2 12 2Z"
        />
      </svg>
    ),
    nextjs: (
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill={color}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.85 0 3.58-.51 5.07-1.39L9.07 9.9v7.1H7V6.84l9.3 12.54A9.96 9.96 0 0 0 22 12c0-5.52-4.48-10-10-10Zm2.93 14.43L13 14.07V9h2v7.43Z" />
      </svg>
    ),
    typescript: (
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill={color}>
        <path d="M3 3h18v18H3V3Zm10 9h3v1.5h-1.5V18H13v-4.5H11.5V12H13Zm-3.5 0H11v6H9.5v-2.5H8V18H6.5v-2.5H5V12h1.5v1.5H8V12h1.5Z" />
      </svg>
    ),
    tailwind: (
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill={color}>
        <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.5 6 12 6Zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.39 17.85 9.5 19 12 19c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.61 13.15 9.5 12 7 12Z" />
      </svg>
    ),
    framer: (
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill={color}>
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    ),
    reactquery: (
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill={color}>
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Zm0 2c1.85 0 3.56.63 4.93 1.67L5.67 16.93A7.97 7.97 0 0 1 4 12c0-4.41 3.59-8 8-8Zm0 16c-1.85 0-3.56-.63-4.93-1.67L18.33 7.07A7.97 7.97 0 0 1 20 12c0 4.41-3.59 8-8 8Z" />
      </svg>
    ),
    axios: (
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill={color}>
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18 7.5 3.75v7.14L12 18.82l-7.5-3.75V7.93L12 4.18z" />
      </svg>
    ),
    zod: (
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill={color}>
        <path d="M20 4H4L4 9l10 0L4 20h16v-5H10L20 4Z" />
      </svg>
    ),
    redux: (
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill={color}>
        <path d="M16.63 16.63c.39-1.54.1-3.22-.93-4.5l.93-1.86c1.34 1.81 1.76 4.17 1.06 6.4l-1.06-.04ZM12.5 19.5c-1.08 0-2.12-.28-3.03-.8l-1.5 1.1c1.35.78 2.88 1.2 4.53 1.2 2.26 0 4.32-.83 5.9-2.2l-1.07-.94c-1.28 1.08-2.93 1.64-4.83 1.64Zm-6-7.5c0-1.47.5-2.83 1.34-3.91L6.77 6.94A8.49 8.49 0 0 0 4.5 12c0 2.1.76 4.03 2.02 5.52l1.08-.93A6.5 6.5 0 0 1 6.5 12Zm5.5-6.5c1.5 0 2.88.5 3.99 1.34l1.07-.93A8.5 8.5 0 0 0 12 4.5c-1.5 0-2.93.4-4.16 1.1l.94 1.5A6.5 6.5 0 0 1 12 5.5Z" />
      </svg>
    ),
    jwt: (
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill={color}>
        <path d="M12 1 9 9H1l6.5 4.5L5 22l7-5 7 5-2.5-8.5L22 9h-8L12 1Z" />
      </svg>
    ),
    vanilla: (
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill={color}>
        <path d="M3 3h18v18H3V3Zm16 16V5H5v14h14ZM7 7h2v10H7V7Zm4 4h2v6h-2v-6Zm4-2h2v8h-2V9Z" />
      </svg>
    ),
    html: (
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill={color}>
        <path d="M4 3l1.5 17L12 22l6.5-2L20 3H4Zm13 3H7.5l.2 2h9.1l-.6 6.5-4.2 1.2-4.2-1.2-.3-3.1H9.4l.2 1.7 2.4.7 2.4-.7.3-2.9H7.1L6.6 6H17Z" />
      </svg>
    ),
    api: (
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill={color}>
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Zm0 2a8 8 0 1 1 0 16A8 8 0 0 1 12 4Zm-1 3v2H9v2h2v6h2v-6h2V9h-2V7h-2Z" />
      </svg>
    ),
    localstorage: (
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill={color}>
        <path d="M20 6H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2Zm-9 9H5v-2h6v2Zm8-4H5V9h14v2Z" />
      </svg>
    ),
    oop: (
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill={color}>
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2Zm0 2.18 7.5 3.75-7.5 3.75-7.5-3.75L12 4.18ZM4 15.46V9.17l7 3.5v6.29l-7-3.5Zm9 3.5v-6.29l7-3.5v6.29l-7 3.5Z" />
      </svg>
    ),
  };
  return (
    <>
      {icons[icon] ?? (
        <span style={{ color }} className="text-[8px] font-mono font-bold">
          {icon.slice(0, 2).toUpperCase()}
        </span>
      )}
    </>
  );
};

/* ─── SVG Illustrations ─────────────────────────────────── */
function SocialSVG() {
  return (
    <svg
      viewBox="0 0 280 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line
          key={`h${i}`}
          x1="0"
          y1={i * 30}
          x2="280"
          y2={i * 30}
          stroke="#1e293b"
          strokeWidth="0.5"
        />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <line
          key={`v${i}`}
          x1={i * 32}
          y1="0"
          x2={i * 32}
          y2="180"
          stroke="#1e293b"
          strokeWidth="0.5"
        />
      ))}
      <circle
        cx="140"
        cy="90"
        r="28"
        fill="#0f172a"
        stroke="#c8522a"
        strokeWidth="1.5"
      />
      <circle cx="140" cy="83" r="10" fill="#c8522a" opacity="0.9" />
      <path
        d="M116 108 Q140 98 164 108"
        stroke="#c8522a"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {[
        { cx: 48, cy: 45, color: "#38bdf8" },
        { cx: 232, cy: 45, color: "#a78bfa" },
        { cx: 38, cy: 140, color: "#34d399" },
        { cx: 242, cy: 140, color: "#fb923c" },
      ].map((u, i) => (
        <g key={i}>
          <line
            x1="140"
            y1="90"
            x2={u.cx}
            y2={u.cy}
            stroke={u.color}
            strokeWidth="0.8"
            strokeDasharray="4 3"
            opacity="0.5"
          />
          <circle
            cx={u.cx}
            cy={u.cy}
            r="18"
            fill="#0f172a"
            stroke={u.color}
            strokeWidth="1"
          />
          <circle cx={u.cx} cy={u.cy - 4} r="6" fill={u.color} opacity="0.8" />
          <path
            d={`M${u.cx - 10} ${u.cy + 8} Q${u.cx} ${u.cy + 3} ${u.cx + 10} ${u.cy + 8}`}
            stroke={u.color}
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      ))}
      <circle cx="162" cy="66" r="5" fill="#c8522a" />
      <text
        x="162"
        y="70"
        textAnchor="middle"
        fontSize="6"
        fill="white"
        fontWeight="bold"
      >
        3
      </text>
      <rect
        x="94"
        y="152"
        width="44"
        height="16"
        rx="8"
        fill="#c8522a"
        opacity="0.15"
        stroke="#c8522a"
        strokeWidth="0.8"
      />
      <text
        x="116"
        y="163"
        textAnchor="middle"
        fontSize="7"
        fill="#c8522a"
        fontFamily="monospace"
      >
        JWT Auth
      </text>
      <rect
        x="142"
        y="152"
        width="52"
        height="16"
        rx="8"
        fill="#FF4154"
        opacity="0.1"
        stroke="#FF4154"
        strokeWidth="0.8"
      />
      <text
        x="168"
        y="163"
        textAnchor="middle"
        fontSize="7"
        fill="#FF4154"
        fontFamily="monospace"
      >
        React Query
      </text>
    </svg>
  );
}

function NutritionSVG() {
  return (
    <svg
      viewBox="0 0 280 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line
          key={`h${i}`}
          x1="0"
          y1={i * 30}
          x2="280"
          y2={i * 30}
          stroke="#1e293b"
          strokeWidth="0.4"
        />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <line
          key={`v${i}`}
          x1={i * 32}
          y1="0"
          x2={i * 32}
          y2="180"
          stroke="#1e293b"
          strokeWidth="0.4"
        />
      ))}
      <ellipse cx="140" cy="155" rx="58" ry="8" fill="#000" opacity="0.18" />
      <circle
        cx="140"
        cy="100"
        r="64"
        fill="#0d1b2a"
        stroke="#1e3a5f"
        strokeWidth="1.5"
      />
      <circle
        cx="140"
        cy="100"
        r="55"
        fill="#0a1628"
        stroke="#1e293b"
        strokeWidth="0.8"
      />
      <path
        d="M140 100 L140 45 A55 55 0 0 1 188 72 Z"
        fill="#34d399"
        opacity="0.22"
        stroke="#34d399"
        strokeWidth="1"
      />
      <path
        d="M140 100 L188 72 A55 55 0 0 1 188 128 Z"
        fill="#fb923c"
        opacity="0.2"
        stroke="#fb923c"
        strokeWidth="1"
      />
      <path
        d="M140 100 L188 128 A55 55 0 0 1 92 128 Z"
        fill="#38bdf8"
        opacity="0.18"
        stroke="#38bdf8"
        strokeWidth="1"
      />
      <path
        d="M140 100 L92 128 A55 55 0 0 1 92 72 Z"
        fill="#a78bfa"
        opacity="0.18"
        stroke="#a78bfa"
        strokeWidth="1"
      />
      <path
        d="M140 100 L92 72 A55 55 0 0 1 140 45 Z"
        fill="#fbbf24"
        opacity="0.2"
        stroke="#fbbf24"
        strokeWidth="1"
      />
      <line
        x1="140"
        y1="100"
        x2="140"
        y2="45"
        stroke="#1e293b"
        strokeWidth="0.8"
      />
      <line
        x1="140"
        y1="100"
        x2="188"
        y2="72"
        stroke="#1e293b"
        strokeWidth="0.8"
      />
      <line
        x1="140"
        y1="100"
        x2="188"
        y2="128"
        stroke="#1e293b"
        strokeWidth="0.8"
      />
      <line
        x1="140"
        y1="100"
        x2="92"
        y2="128"
        stroke="#1e293b"
        strokeWidth="0.8"
      />
      <line
        x1="140"
        y1="100"
        x2="92"
        y2="72"
        stroke="#1e293b"
        strokeWidth="0.8"
      />
      <circle
        cx="140"
        cy="100"
        r="20"
        fill="#0f172a"
        stroke="#c8522a"
        strokeWidth="1.5"
      />
      <circle cx="140" cy="100" r="12" fill="#c8522a" opacity="0.15" />
      <text
        x="140"
        y="104"
        textAnchor="middle"
        fontSize="8"
        fill="#c8522a"
        fontFamily="monospace"
        fontWeight="bold"
      >
        FOOD
      </text>
      <line
        x1="165"
        y1="68"
        x2="195"
        y2="50"
        stroke="#34d399"
        strokeWidth="0.6"
        strokeDasharray="3 2"
      />
      <circle cx="165" cy="68" r="2" fill="#34d399" />
      <rect
        x="196"
        y="42"
        width="44"
        height="14"
        rx="4"
        fill="#0f172a"
        stroke="#34d399"
        strokeWidth="0.7"
      />
      <text
        x="218"
        y="52"
        textAnchor="middle"
        fontSize="7"
        fill="#34d399"
        fontFamily="monospace"
      >
        Protein
      </text>
      <line
        x1="192"
        y1="100"
        x2="215"
        y2="100"
        stroke="#fb923c"
        strokeWidth="0.6"
        strokeDasharray="3 2"
      />
      <circle cx="192" cy="100" r="2" fill="#fb923c" />
      <rect
        x="216"
        y="93"
        width="36"
        height="14"
        rx="4"
        fill="#0f172a"
        stroke="#fb923c"
        strokeWidth="0.7"
      />
      <text
        x="234"
        y="103"
        textAnchor="middle"
        fontSize="7"
        fill="#fb923c"
        fontFamily="monospace"
      >
        Carbs
      </text>
      <line
        x1="150"
        y1="148"
        x2="150"
        y2="165"
        stroke="#38bdf8"
        strokeWidth="0.6"
        strokeDasharray="3 2"
      />
      <circle cx="150" cy="148" r="2" fill="#38bdf8" />
      <rect
        x="123"
        y="166"
        width="32"
        height="14"
        rx="4"
        fill="#0f172a"
        stroke="#38bdf8"
        strokeWidth="0.7"
      />
      <text
        x="139"
        y="176"
        textAnchor="middle"
        fontSize="7"
        fill="#38bdf8"
        fontFamily="monospace"
      >
        Fats
      </text>
      <line
        x1="88"
        y1="100"
        x2="65"
        y2="100"
        stroke="#a78bfa"
        strokeWidth="0.6"
        strokeDasharray="3 2"
      />
      <circle cx="88" cy="100" r="2" fill="#a78bfa" />
      <rect
        x="28"
        y="93"
        width="36"
        height="14"
        rx="4"
        fill="#0f172a"
        stroke="#a78bfa"
        strokeWidth="0.7"
      />
      <text
        x="46"
        y="103"
        textAnchor="middle"
        fontSize="7"
        fill="#a78bfa"
        fontFamily="monospace"
      >
        Fiber
      </text>
      <line
        x1="113"
        y1="68"
        x2="92"
        y2="50"
        stroke="#fbbf24"
        strokeWidth="0.6"
        strokeDasharray="3 2"
      />
      <circle cx="113" cy="68" r="2" fill="#fbbf24" />
      <rect
        x="40"
        y="42"
        width="36"
        height="14"
        rx="4"
        fill="#0f172a"
        stroke="#fbbf24"
        strokeWidth="0.7"
      />
      <text
        x="58"
        y="52"
        textAnchor="middle"
        fontSize="7"
        fill="#fbbf24"
        fontFamily="monospace"
      >
        Sugar
      </text>
      <rect
        x="8"
        y="8"
        width="56"
        height="16"
        rx="4"
        fill="#0f172a"
        stroke="#c8522a"
        strokeWidth="0.8"
      />
      <text
        x="36"
        y="19"
        textAnchor="middle"
        fontSize="7"
        fill="#c8522a"
        fontFamily="monospace"
      >
        OOP + SPA
      </text>
      <rect
        x="214"
        y="8"
        width="60"
        height="16"
        rx="4"
        fill="#0f172a"
        stroke="#34d399"
        strokeWidth="0.8"
      />
      <text
        x="244"
        y="19"
        textAnchor="middle"
        fontSize="7"
        fill="#34d399"
        fontFamily="monospace"
      >
        LocalStorage
      </text>
    </svg>
  );
}

function QuizSVG() {
  return (
    <svg
      viewBox="0 0 280 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect
        x="40"
        y="20"
        width="200"
        height="100"
        rx="12"
        fill="#0f172a"
        stroke="#1e293b"
        strokeWidth="1.5"
      />
      <rect x="40" y="20" width="200" height="30" rx="12" fill="#1e293b" />
      <rect x="40" y="38" width="200" height="12" fill="#1e293b" />
      <text
        x="140"
        y="41"
        textAnchor="middle"
        fontSize="9"
        fill="#94a3b8"
        fontFamily="monospace"
      >
        Question 7 / 15
      </text>
      <rect x="52" y="52" width="176" height="6" rx="3" fill="#1e293b" />
      <rect x="52" y="52" width="82" height="6" rx="3" fill="#c8522a" />
      {[
        { y: 68, text: "A. React", correct: false },
        { y: 84, text: "B. Next.js", correct: true },
        { y: 100, text: "C. Vue", correct: false },
      ].map((opt, i) => (
        <g key={i}>
          <rect
            x="52"
            y={opt.y}
            width="176"
            height="12"
            rx="4"
            fill={opt.correct ? "rgba(52,211,153,0.15)" : "#0f172a"}
            stroke={opt.correct ? "#34d399" : "#1e293b"}
            strokeWidth="0.8"
          />
          <text
            x="62"
            y={opt.y + 9}
            fontSize="7"
            fill={opt.correct ? "#34d399" : "#94a3b8"}
            fontFamily="monospace"
          >
            {opt.text}
          </text>
          {opt.correct && (
            <text x="214" y={opt.y + 9} fontSize="8" fill="#34d399">
              ✓
            </text>
          )}
        </g>
      ))}
      <circle
        cx="220"
        cy="148"
        r="22"
        fill="#0f172a"
        stroke="#1e293b"
        strokeWidth="1.5"
      />
      <circle
        cx="220"
        cy="148"
        r="18"
        fill="none"
        stroke="#c8522a"
        strokeWidth="2"
        strokeDasharray="70 43"
        strokeLinecap="round"
        transform="rotate(-90 220 148)"
      />
      <text
        x="220"
        y="153"
        textAnchor="middle"
        fontSize="10"
        fill="#c8522a"
        fontFamily="monospace"
        fontWeight="bold"
      >
        12s
      </text>
      <rect
        x="40"
        y="138"
        width="82"
        height="18"
        rx="4"
        fill="#0f172a"
        stroke="#38bdf8"
        strokeWidth="0.8"
      />
      <text
        x="81"
        y="150"
        textAnchor="middle"
        fontSize="7.5"
        fill="#38bdf8"
        fontFamily="monospace"
      >
        Open Trivia API
      </text>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={130 + i * 8}
          y={148 - [4, 8, 12, 8, 4][i]}
          width="4"
          height={[8, 16, 24, 16, 8][i]}
          rx="2"
          fill="#a78bfa"
          opacity="0.6"
        />
      ))}
    </svg>
  );
}

function EcommerceSVG() {
  return (
    <svg
      viewBox="0 0 280 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {[40, 80, 120, 160, 200, 240].map((x) =>
        [30, 70, 110, 150].map((y) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="1" fill="#1e293b" />
        )),
      )}
      <rect
        x="20"
        y="15"
        width="240"
        height="150"
        rx="10"
        fill="#0f172a"
        stroke="#1e293b"
        strokeWidth="1.5"
      />
      <rect x="20" y="15" width="240" height="24" rx="10" fill="#1e293b" />
      <rect x="20" y="27" width="240" height="12" fill="#1e293b" />
      {[36, 48, 60].map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy={27}
          r="4"
          fill={["#ef4444", "#fbbf24", "#34d399"][i]}
          opacity="0.7"
        />
      ))}
      {[
        { x: 30, label: "Shoes", price: "$89", color: "#c8522a" },
        { x: 110, label: "Watch", price: "$199", color: "#38bdf8" },
        { x: 190, label: "Bag", price: "$129", color: "#a78bfa" },
      ].map((p, i) => (
        <g key={i}>
          <rect
            x={p.x}
            y="50"
            width="60"
            height="70"
            rx="6"
            fill="#0a0f1a"
            stroke="#1e293b"
            strokeWidth="1"
          />
          <rect
            x={p.x + 8}
            y="57"
            width="44"
            height="32"
            rx="4"
            fill={p.color}
            opacity="0.12"
            stroke={p.color}
            strokeWidth="0.6"
          />
          <text
            x={p.x + 30}
            y="78"
            textAnchor="middle"
            fontSize="14"
            fill={p.color}
          >
            ◈
          </text>
          <text
            x={p.x + 30}
            y="100"
            textAnchor="middle"
            fontSize="7"
            fill="#94a3b8"
            fontFamily="monospace"
          >
            {p.label}
          </text>
          <text
            x={p.x + 30}
            y="111"
            textAnchor="middle"
            fontSize="8"
            fill={p.color}
            fontFamily="monospace"
            fontWeight="bold"
          >
            {p.price}
          </text>
        </g>
      ))}
      <rect
        x="30"
        y="128"
        width="100"
        height="28"
        rx="6"
        fill="#c8522a"
        opacity="0.15"
        stroke="#c8522a"
        strokeWidth="0.8"
      />
      <text
        x="80"
        y="146"
        textAnchor="middle"
        fontSize="8"
        fill="#c8522a"
        fontFamily="monospace"
      >
        Cart (3 items)
      </text>
      <rect
        x="152"
        y="128"
        width="108"
        height="28"
        rx="6"
        fill="#fbbf24"
        opacity="0.1"
        stroke="#fbbf24"
        strokeWidth="0.8"
      />
      <text
        x="206"
        y="140"
        textAnchor="middle"
        fontSize="7.5"
        fill="#fbbf24"
        fontFamily="monospace"
      >
        In Progress
      </text>
      <text
        x="206"
        y="152"
        textAnchor="middle"
        fontSize="6.5"
        fill="#fbbf24"
        opacity="0.7"
        fontFamily="monospace"
      >
        Next.js + Redux
      </text>
    </svg>
  );
}

/* ─── Projects Data ─────────────────────────────────────── */
const projects: Project[] = [
  {
    id: 1,
    title: "Social Media App",
    subtitle: "React · Full Frontend",
    description:
      "A full-featured social media platform with JWT-based authentication, dynamic feeds, real-time interactions, and a polished UI — all built and handled on the frontend with React and Tailwind.",
    stack: [
      { name: "React", icon: "react", color: "#61DAFB" },
      { name: "TypeScript", icon: "typescript", color: "#3178C6" },
      { name: "Tailwind", icon: "tailwind", color: "#38BDF8" },
      { name: "JWT", icon: "jwt", color: "#c8522a" },
      { name: "Axios", icon: "axios", color: "#5A29E4" },
      { name: "React Query", icon: "reactquery", color: "#FF4154" },
    ],
    live: "https://social-media-web-self.vercel.app/login",
    github: "https://github.com/abdelrahmangalal200101-cpu/Social-Media-Web",
    status: "live",
    featured: true,
    svg: <SocialSVG />,
    accent: "#c8522a",
    accentBg: "rgba(200,82,42,0.08)",
    accentBorder: "rgba(200,82,42,0.2)",
  },
  {
    id: 2,
    title: "Nutrition Food SPA",
    subtitle: "Vanilla JS + OOP",
    description:
      "A single-page application for managing food items and tracking nutrition, built with a complete object-oriented JS architecture, dynamic UI updates, and local data persistence.",
    stack: [
      { name: "Vanilla JS", icon: "vanilla", color: "#F7DF1E" },
      { name: "OOP", icon: "oop", color: "#34d399" },
      { name: "Tailwind", icon: "tailwind", color: "#38BDF8" },
      { name: "LocalStorage", icon: "localstorage", color: "#a78bfa" },
      { name: "HTML", icon: "html", color: "#E34F26" },
    ],
    live: "https://abdelrahmangalal200101-cpu.github.io/Quiz-Full-Js-Route/",
    github: "https://github.com/abdelrahmangalal200101-cpu/Quiz-Full-Js-Route",
    status: "live",
    featured: true,
    svg: <NutritionSVG />,
    accent: "#34d399",
    accentBg: "rgba(52,211,153,0.08)",
    accentBorder: "rgba(52,211,153,0.2)",
  },
  {
    id: 3,
    title: "Advanced Quiz App",
    subtitle: "Vanilla JS + API",
    description:
      "An advanced quiz application with dynamic question loading from Open Trivia API, countdown timer, sound feedback, difficulty levels, and persistent score history via LocalStorage.",
    stack: [
      { name: "Vanilla JS", icon: "vanilla", color: "#F7DF1E" },
      { name: "Trivia API", icon: "api", color: "#38bdf8" },
      { name: "Tailwind", icon: "tailwind", color: "#38BDF8" },
      { name: "LocalStorage", icon: "localstorage", color: "#a78bfa" },
    ],
    live: "https://abdelrahmangalal200101-cpu.github.io/Quiz-App/",
    github: "https://github.com/abdelrahmangalal200101-cpu/Quiz-App",
    status: "live",
    featured: true,
    svg: <QuizSVG />,
    accent: "#38bdf8",
    accentBg: "rgba(56,189,248,0.08)",
    accentBorder: "rgba(56,189,248,0.2)",
  },
  {
    id: 4,
    title: "E-commerce Platform",
    subtitle: "Frontend · In Progress",
    description:
      "A fully functional e-commerce frontend with JWT auth, product catalog, wishlist, advanced cart powered by Redux, reviews, order management UI, Zod form validation, and full REST API integration.",
    stack: [
      { name: "Next.js", icon: "nextjs", color: "#e2e8f0" },
      { name: "React", icon: "react", color: "#61DAFB" },
      { name: "TypeScript", icon: "typescript", color: "#3178C6" },
      { name: "Redux", icon: "redux", color: "#764ABC" },
      { name: "React Query", icon: "reactquery", color: "#FF4154" },
      { name: "Zod", icon: "zod", color: "#3068b7" },
      { name: "JWT", icon: "jwt", color: "#c8522a" },
      { name: "Tailwind", icon: "tailwind", color: "#38BDF8" },
    ],
    live: null,
    github: "#",
    status: "wip",
    featured: false,
    svg: <EcommerceSVG />,
    accent: "#fbbf24",
    accentBg: "rgba(251,191,36,0.08)",
    accentBorder: "rgba(251,191,36,0.2)",
  },
];

/* ─── Stack Pills ────────────────────────────────────────── */
function StackPills({ stack }: { stack: Project["stack"] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {stack.map((tech) => (
        <span
          key={tech.name}
          className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-md
            bg-slate-100 dark:bg-slate-800/80
            text-slate-500 dark:text-slate-400
            border border-slate-200/70 dark:border-slate-700/70
            hover:border-slate-300 dark:hover:border-slate-600
            transition-colors duration-150"
        >
          <TechIcon icon={tech.icon} color={tech.color} />
          {tech.name}
        </span>
      ))}
    </div>
  );
}

/* ─── Project Card ──────────────────────────────────────── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      className="group relative flex flex-col rounded-2xl overflow-hidden
        bg-white dark:bg-slate-900
        border border-slate-200/70 dark:border-slate-800/70
        hover:border-slate-300 dark:hover:border-slate-700
        transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/40
        dark:hover:shadow-slate-950/60"
    >
      {project.status === "wip" && (
        <div
          className="absolute top-4 right-4 z-10 flex items-center gap-1.5
          px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold
          bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400
          border border-amber-200 dark:border-amber-800/60"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
          </span>
          In Progress
        </div>
      )}

      <div
        className="relative w-full overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${project.accentBg}, rgba(15,23,42,0.03))`,
          borderBottom: `1px solid ${project.accentBorder}`,
          height: "200px",
        }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, ${project.accent}20 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10 w-full h-full p-4">{project.svg}</div>
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${project.accent}10, transparent 70%)`,
          }}
        />
      </div>

      <div className="flex flex-col flex-1 p-6">
        <div className="mb-3">
          <h3
            className="font-extrabold text-lg text-slate-900 dark:text-slate-50 leading-tight mb-1"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {project.title}
          </h3>
          <span
            className="inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md"
            style={{
              color: project.accent,
              background: project.accentBg,
              border: `1px solid ${project.accentBorder}`,
            }}
          >
            {project.subtitle}
          </span>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        <div className="mb-5">
          <StackPills stack={project.stack} />
        </div>

        <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
          {project.live ? (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium font-mono text-slate-50"
              style={{ background: project.accent }}
            >
              <ExternalLink size={11} strokeWidth={2.5} />
              Live Demo
            </motion.a>
          ) : (
            <span
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium font-mono opacity-50 cursor-not-allowed"
              style={{
                color: project.accent,
                background: project.accentBg,
                border: `1px solid ${project.accentBorder}`,
              }}
            >
              <Clock size={11} strokeWidth={2.5} />
              Soon
            </span>
          )}
          {project.github !== "#" ? (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full
                text-xs font-medium font-mono
                text-slate-600 dark:text-slate-300
                border border-slate-200 dark:border-slate-700
                hover:bg-slate-50 dark:hover:bg-slate-800
                transition-all duration-200"
            >
              <Github size={11} strokeWidth={2.5} />
              GitHub
            </motion.a>
          ) : (
            <span
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full
              text-xs font-medium font-mono opacity-40 cursor-not-allowed
              text-slate-500 border border-slate-200 dark:border-slate-700"
            >
              <Github size={11} strokeWidth={2.5} />
              Private
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   WORK SECTION
═══════════════════════════════════════════════════════════ */
export default function Work() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section
      id="work"
      className="relative py-28 bg-white dark:bg-slate-950 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full
          bg-[#c8522a]/[0.03] dark:bg-[#c8522a]/[0.06] blur-[140px]"
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full
          bg-blue-500/[0.03] dark:bg-blue-500/[0.06] blur-[130px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#c8522a]/60" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-mono">
              Selected Work
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2
              className="font-extrabold text-[2.2rem] sm:text-[2.8rem] leading-[1.05]
              text-slate-900 dark:text-slate-50 tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Projects
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#c8522a] via-orange-400 to-amber-400">
                I&apos;ve Built
              </span>
            </h2>
            <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400 leading-relaxed sm:text-right">
              A selection of real-world projects — from Next.js apps to vanilla
              JS SPAs.
            </p>
          </div>
        </motion.div>

        {/* Featured 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {projects
            .filter((p) => p.featured)
            .map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
        </div>

        {/* E-commerce — full width */}
        {projects
          .filter((p) => !p.featured)
          .map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="group relative flex flex-col md:flex-row rounded-2xl overflow-hidden
              bg-white dark:bg-slate-900
              border border-slate-200/70 dark:border-slate-800/70
              hover:border-slate-300 dark:hover:border-slate-700
              transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/40
              dark:hover:shadow-slate-950/60"
            >
              <div
                className="absolute top-4 right-4 z-10 flex items-center gap-1.5
              px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold
              bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400
              border border-amber-200 dark:border-amber-800/60"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
                </span>
                In Progress
              </div>

              <div
                className="relative md:w-2/5 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${project.accentBg}, rgba(15,23,42,0.03))`,
                  borderRight: `1px solid ${project.accentBorder}`,
                  minHeight: "240px",
                }}
              >
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `radial-gradient(circle, ${project.accent}20 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="relative z-10 w-full h-full p-6 flex items-center">
                  {project.svg}
                </div>
              </div>

              <div className="flex flex-col flex-1 p-8">
                <div className="mb-3">
                  <h3
                    className="font-extrabold text-xl text-slate-900 dark:text-slate-50 mb-1"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {project.title}
                  </h3>
                  <span
                    className="inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md"
                    style={{
                      color: project.accent,
                      background: project.accentBg,
                      border: `1px solid ${project.accentBorder}`,
                    }}
                  >
                    {project.subtitle}
                  </span>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 mb-5">
                  {[
                    "JWT Auth + Protected Routes",
                    "Cart + Coupon System",
                    "Wishlist & Reviews UI",
                    "Orders & Checkout Flow",
                    "Redux State Management",
                    "Zod Form Validation",
                  ].map((feat) => (
                    <div
                      key={feat}
                      className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"
                    >
                      <span
                        style={{ color: project.accent }}
                        className="text-[10px]"
                      >
                        ▸
                      </span>
                      {feat}
                    </div>
                  ))}
                </div>

                <div className="mb-5">
                  <StackPills stack={project.stack} />
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full
                    text-xs font-medium font-mono opacity-50 cursor-not-allowed"
                    style={{
                      color: project.accent,
                      background: project.accentBg,
                      border: `1px solid ${project.accentBorder}`,
                    }}
                  >
                    <Clock size={11} strokeWidth={2.5} />
                    Live Soon
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full
                  text-xs font-medium font-mono opacity-40 cursor-not-allowed
                  text-slate-500 border border-slate-200 dark:border-slate-700"
                  >
                    <Github size={11} strokeWidth={2.5} />
                    Private
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </section>
  );
}
