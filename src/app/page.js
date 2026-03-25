"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import AmbientBackground from "../components/AmbientBackground";

const phrases = [
  "cybersecurity professional",
  "building real systems",
  "learning and evolving",
];

const purpleGradient =
  "linear-gradient(90deg, transparent 0%, rgba(147,51,234,0.4) 30%, rgba(216,180,254,1) 50%, rgba(147,51,234,0.4) 70%, transparent 100%)";

function Typewriter() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    const i = loopNum % phrases.length;
    const fullText = phrases[i];
    const timer = setTimeout(() => {
      if (isDeleting) setText(fullText.substring(0, text.length - 1));
      else setText(fullText.substring(0, text.length + 1));
      if (!isDeleting && text === fullText) setTimeout(() => setIsDeleting(true), 2000);
      else if (isDeleting && text === "") { setIsDeleting(false); setLoopNum(n => n + 1); }
    }, isDeleting ? 45 : 95);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  return (
    <p className="font-mono text-sm md:text-base" style={{ color: "#888" }}>
      <span style={{ color: "#8b5cf6" }}>{">"}</span> {text}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[2px] h-4 ml-1 align-middle"
        style={{ backgroundColor: "#8b5cf6" }}
      />
    </p>
  );
}

export default function Home() {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);

  const navigate = (href) => {
    setLeaving(true);
    setTimeout(() => router.push(href), 400);
  };

  const navItems = [
    { label: "portfolio", href: "/portfolio" },
    { label: "logs",      href: "/logs"      },
    { label: "whoami",    href: "/whoami"     },
    { label: "contact",   href: "/contact"    },
  ];

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.main
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="flex min-h-screen flex-col items-center justify-center relative px-6"
          style={{ backgroundColor: "#050505" }}
        >
          <AmbientBackground />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-center z-10 flex flex-col items-center w-full max-w-lg"
          >
            {/* TÍTULO */}
            <div className="relative mb-4 flex items-center justify-center">
              <h1
                className="font-mono font-medium tracking-tighter select-none pointer-events-none relative z-0"
                style={{ fontSize: "clamp(3rem, 15vw, 5rem)", color: "rgba(224,224,224,0.8)" }}
              >
                P3g4su
              </h1>
              <motion.h1
                className="absolute font-mono font-medium tracking-tighter select-none pointer-events-none z-10"
                style={{
                  fontSize: "clamp(3rem, 15vw, 5rem)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  backgroundImage: purpleGradient,
                  backgroundSize: "200% 100%",
                  mixBlendMode: "screen",
                  filter: "drop-shadow(0px 0px 10px rgba(168,85,247,0.6))",
                }}
                animate={{ backgroundPosition: ["200% 50%", "0% 50%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                P3g4su
              </motion.h1>
            </div>

            {/* SUBTEXTO */}
            <div className="h-8 mb-6 flex items-center justify-center">
              <Typewriter />
            </div>

            {/* LINHA */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1, backgroundPosition: ["200% 50%", "0% 50%"] }}
              transition={{
                scaleX: { duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] },
                backgroundPosition: { duration: 4, repeat: Infinity, ease: "linear" },
              }}
              className="w-full max-w-xs h-[2px] mb-10"
              style={{
                backgroundImage: "linear-gradient(90deg, #4c1d95, #a855f7, #e9d5ff, #a855f7, #4c1d95)",
                backgroundSize: "200% 100%",
                WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)",
                maskImage: "linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)",
                boxShadow: "0 0 15px rgba(168,85,247,0.8)",
                transformOrigin: "center",
              }}
            />

            {/* NAV — 2x2 em mobile, linha em desktop */}
            <nav className="grid grid-cols-2 sm:flex sm:flex-row gap-4 sm:gap-8 justify-center relative z-20 w-full sm:w-auto">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.08 }}
                  onClick={() => navigate(item.href)}
                  className="group flex items-center justify-center sm:justify-start gap-1 font-mono text-xs tracking-[0.2em] transition-colors duration-300 cursor-pointer bg-transparent border-0 p-0"
                  style={{ color: "#555" }}
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#8b5cf6" }}>/</span>
                  <span className="group-hover:text-white transition-colors duration-200 uppercase">{item.label}</span>
                </motion.button>
              ))}
            </nav>
          </motion.div>

          {/* Status — escondido em mobile pequeno */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="absolute bottom-8 right-6 md:right-10 hidden sm:flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#8b5cf6" }} />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "#383838" }}>online</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-6 md:left-10 hidden sm:block"
          >
            <span className="font-mono text-[10px] tracking-[0.15em]" style={{ color: "#383838" }}>
              P3g4su_v2.0 // 2026
            </span>
          </motion.div>
        </motion.main>
      )}
    </AnimatePresence>
  );
}