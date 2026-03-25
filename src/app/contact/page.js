"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import AmbientBackground from "../../components/AmbientBackground";

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const CONTACTS = [
  { key: "email",    label: "Email",    value: "panmachado301@gmail.com", href: "mailto:panmachado301@gmail.com", description: "resposta em até 24h",           external: false },
  { key: "github",   label: "GitHub",   value: "/P3g4su",                 href: "https://github.com/P3g4su",     description: "código, ferramentas, projetos",  external: true  },
  { key: "linkedin", label: "LinkedIn", value: "/in/p3g4su",              href: "https://linkedin.com/in/p3g4su",description: "oportunidades e networking",     external: true  },
  //{ key: "discord", label: "Discord", value: "404.461637",              href: "https://linkedin.com/in/p3g4su",description: "oportunidades e networking",     external: true  },
];

export default function Contact() {
  return (
    <main className="min-h-screen flex flex-col relative" style={{ backgroundColor: "#050505" }}>
      <AmbientBackground />

      {/* Nav */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-5"
        style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.95), transparent)" }}>
        <Link href="/" className="group flex items-center">
          <span className="font-mono text-xs px-3 py-1.5 rounded-sm transition-all duration-300 group-hover:text-white"
            style={{ border: "1px solid #2a2a2a", color: "#666", backgroundColor: "rgba(255,255,255,0.03)" }}>
            ← home
          </span>
        </Link>
        <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: "#2a2a2a" }}>/contact</span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#8b5cf6" }} />
          <span className="font-mono text-xs hidden sm:block" style={{ color: "#2a2a2a" }}>online</span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 pt-24 pb-20">
        <div className="w-full max-w-[520px]">

          {/* Header */}
          <Reveal className="mb-14">
            <div className="font-mono text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "#252525" }}>establish connection</div>
            <h1 className="font-mono font-black tracking-tight leading-none mb-4"
              style={{ fontSize: "clamp(2.8rem, 8vw, 4.5rem)", background: "linear-gradient(135deg, #e8e8e8 0%, #aaa 60%, #444 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", letterSpacing: "-0.03em" }}>
              contato
            </h1>
            <p className="font-mono text-sm leading-relaxed" style={{ color: "#555" }}>
              Se você tem algo interessante a dizer —{" "}
              <span style={{ color: "#c4b5fd" }}>pode falar diretamente.</span>
            </p>
          </Reveal>

          {/* Links */}
          <div className="flex flex-col gap-3 mb-6">
            {CONTACTS.map(({ key, label, value, href, description, external }, i) => (
              <Reveal key={key} delay={0.05 + i * 0.07}>
                <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between px-5 py-4 rounded-sm transition-all duration-300"
                  style={{ border: "1px solid #141414", backgroundColor: "rgba(255,255,255,0.02)" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.35)"; e.currentTarget.style.backgroundColor = "rgba(139,92,246,0.04)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#141414"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)"; }}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs tracking-widest uppercase w-16 flex-shrink-0" style={{ color: "#2a2a2a" }}>{label}</span>
                    <span className="font-mono text-sm transition-colors duration-200 group-hover:text-white truncate" style={{ color: "#888" }}>{value}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="font-mono text-xs hidden md:block" style={{ color: "#2a2a2a" }}>{description}</span>
                    <span className="font-mono text-sm transition-all duration-200 opacity-0 group-hover:opacity-100" style={{ color: "#8b5cf6" }}>→</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          {/* Botão CV */}
          <Reveal delay={0.25} className="mb-10">
            <a
              href="/curriculo/pedro-augusto-cv.pdf"
              download
              className="group flex items-center justify-between w-full px-5 py-4 rounded-sm transition-all duration-300"
              style={{ border: "1px solid rgba(139,92,246,0.2)", backgroundColor: "rgba(139,92,246,0.05)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)"; e.currentTarget.style.backgroundColor = "rgba(139,92,246,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.2)"; e.currentTarget.style.backgroundColor = "rgba(139,92,246,0.05)"; }}
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs tracking-widest uppercase w-16 flex-shrink-0" style={{ color: "#8b5cf6" }}>curriculo</span>
              </div>
              <span className="font-mono text-sm flex-shrink-0" style={{ color: "#8b5cf6" }}>↓ baixar</span>
            </a>
           
          </Reveal>

          {/* Nota */}
          <Reveal delay={0.35}>
            <div className="flex items-start gap-3 px-4 py-3 rounded-sm"
              style={{ border: "1px solid #0f0f0f", borderLeft: "2px solid rgba(139,92,246,0.2)" }}>
              <span style={{ color: "#8b5cf6", fontSize: 10, marginTop: 2, flexShrink: 0 }}>◆</span>
              <p className="font-mono text-xs leading-relaxed" style={{ color: "#333" }}>
                Prefiro contato direto. Sem formulário, sem intermediário. Se a conversa for técnica, melhor ainda.
              </p>
            </div>
          </Reveal>

        </div>
      </div>

      {/* Rodapé */}
      <Reveal className="relative z-10 pb-8 px-6 md:px-8">
        <div className="max-w-[520px] mx-auto flex justify-between items-center font-mono text-xs pt-6"
          style={{ borderTop: "1px solid #0d0d0d", color: "#1e1e1e" }}>
          <span>P3g4su · 2026</span>
          <Link href="/whoami" className="transition-colors duration-200 hover:text-purple-500" style={{ color: "#2a2a2a" }}>← whoami</Link>
        </div>
      </Reveal>
    </main>
  );
}