"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import AmbientBackground from "../../components/AmbientBackground";

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Modal de projeto ─────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)" }} />

        {/* Card */}
        <motion.div
          className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-sm"
          style={{ backgroundColor: "#080808", border: "1px solid #1c1c1c", zIndex: 1 }}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Imagem */}
          <div className="relative w-full" style={{ height: 220, backgroundColor: "#0a0a0a" }}>
            {project.image ? (
              <Image src={project.image} alt={project.title} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "#0d0d0d" }}>
                <div className="font-mono text-5xl font-black" style={{ color: "#1a1a1a" }}>{project.title.charAt(0)}</div>
                <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
              </div>
            )}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 50%)" }} />

            {/* Fechar */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 font-mono text-xs px-2 py-1 rounded-sm transition-all duration-200"
              style={{ backgroundColor: "rgba(0,0,0,0.6)", border: "1px solid #2a2a2a", color: "#666" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#555"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#666"; e.currentTarget.style.borderColor = "#2a2a2a"; }}
            >
              ✕ fechar
            </button>
          </div>

          {/* Conteúdo */}
          <div className="p-7">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h2 className="font-mono font-black text-xl" style={{ color: "#e0e0e0", letterSpacing: "-0.02em" }}>
                {project.title}
              </h2>
              <span className="font-mono text-xs flex-shrink-0 mt-1" style={{ color: "#2a2a2a" }}>
                {project.year}
              </span>
            </div>

            <p className="font-mono text-sm leading-relaxed mb-6" style={{ color: "#777" }}>
              {project.fullDescription}
            </p>

            {/* Tags */}
            {project.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(t => (
                  <span key={t} className="font-mono text-[10px] px-2.5 py-1 rounded-sm" style={{ backgroundColor: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)", color: "#7c3aed" }}>
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Links */}
            <div className="flex gap-3">
              {project.links?.site && (
                <a
                  href={project.links.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 font-mono text-xs py-2.5 rounded-sm transition-all duration-200"
                  style={{ border: "1px solid rgba(139,92,246,0.25)", color: "#a78bfa", backgroundColor: "rgba(139,92,246,0.08)" }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(139,92,246,0.15)"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "rgba(139,92,246,0.08)"; }}
                >
                  ↗ ver site
                </a>
              )}
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 font-mono text-xs py-2.5 rounded-sm transition-all duration-200"
                  style={{ border: "1px solid #1c1c1c", color: "#666", backgroundColor: "rgba(255,255,255,0.02)" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.color = "#aaa"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1c1c1c"; e.currentTarget.style.color = "#666"; }}
                >
                  ⌥ github
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Card de projeto ──────────────────────────────────────────────────────────
function ProjectCard({ project, index, onClick }) {
  return (
    <Reveal delay={index * 0.07}>
      <button
        onClick={() => onClick(project)}
        className="group w-full text-left rounded-sm overflow-hidden transition-all duration-300"
        style={{ border: "1px solid #141414", backgroundColor: "rgba(255,255,255,0.02)" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)"; e.currentTarget.style.backgroundColor = "rgba(139,92,246,0.03)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "#141414"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)"; }}
      >
        {/* Imagem */}
        <div className="relative w-full overflow-hidden" style={{ height: 180, backgroundColor: "#0a0a0a" }}>
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center relative" style={{ backgroundColor: "#0d0d0d" }}>
              <div className="font-mono text-5xl font-black" style={{ color: "#1a1a1a" }}>{project.title.charAt(0)}</div>
              <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
            </div>
          )}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,5,5,0.8) 0%, transparent 60%)" }} />

          {/* Ano */}
          <div className="absolute top-3 right-3">
            <span className="font-mono text-[10px]" style={{ color: "#2a2a2a" }}>{project.year}</span>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 left-3">
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase px-2 py-1 rounded-sm" style={{ backgroundColor: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.3)", color: "#a78bfa" }}>
                featured
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-mono font-semibold text-base transition-colors duration-200 group-hover:text-white" style={{ color: "#bbb" }}>
              {project.title}
            </h2>
            <span className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-all duration-200" style={{ color: "#8b5cf6" }}>
              ver mais →
            </span>
          </div>

          <p className="font-mono text-xs leading-relaxed mb-4" style={{ color: "#555" }}>
            {project.shortDescription}
          </p>

          {project.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 4).map(t => (
                <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded-sm" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid #1c1c1c", color: "#444" }}>
                  {t}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="font-mono text-[10px] px-2 py-0.5" style={{ color: "#2a2a2a" }}>
                  +{project.tags.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </button>
    </Reveal>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PortfolioClient({ projects }) {
  const [selected, setSelected] = useState(null);

  return (
    <main className="min-h-screen relative" style={{ backgroundColor: "#050505" }}>
      <AmbientBackground />

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>

      {/* Nav */}
      <div
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-5"
        style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.95), transparent)" }}
      >
        <Link href="/" className="group flex items-center">
          <span
            className="font-mono text-xs px-3 py-1.5 rounded-sm transition-all duration-300 group-hover:text-white"
            style={{ border: "1px solid #2a2a2a", color: "#666", backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            ← home
          </span>
        </Link>
        <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: "#2a2a2a" }}>/portfolio</span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#8b5cf6" }} />
          <span className="font-mono text-xs" style={{ color: "#2a2a2a" }}>online</span>
        </div>
      </div>

      <div className="relative z-10 max-w-[780px] mx-auto px-6 pt-36 pb-40">

        {/* Header */}
        <Reveal className="mb-14">
          <div className="font-mono text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "#252525" }}>
            system.build
          </div>
          <h1
            className="font-mono font-black tracking-tight leading-none mb-4"
            style={{ fontSize: "clamp(2.8rem, 8vw, 4.5rem)", background: "linear-gradient(135deg, #e8e8e8 0%, #aaa 60%, #444 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", letterSpacing: "-0.03em" }}
          >
            portfolio
          </h1>
          <p className="font-mono text-sm" style={{ color: "#555" }}>
            Coisas que eu construí, corrigi ou quebrei de propósito.
          </p>
        </Reveal>

        {/* Grid */}
        {projects.length === 0 ? (
          <div className="font-mono text-sm py-20 text-center" style={{ color: "#2a2a2a" }}>
            Nenhum projeto publicado ainda.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i}
                onClick={setSelected}
              />
            ))}
          </div>
        )}

        {/* Rodapé */}
        <div
          className="mt-20 pt-8 flex justify-between items-center font-mono text-xs"
          style={{ borderTop: "1px solid #0d0d0d", color: "#1e1e1e" }}
        >
          <span>P3g4su · 2025</span>
          <Link href="/logs" className="hover:text-purple-500 transition-colors" style={{ color: "#2a2a2a" }}>
            logs →
          </Link>
        </div>

      </div>
    </main>
  );
}