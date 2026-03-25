"use client";

import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import AmbientBackground from "../../../../components/AmbientBackground";

function ScrollBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        position: "fixed", top: 0, left: 0,
        width: "100%", height: "2px",
        background: "linear-gradient(to right, #4c1d95, #8b5cf6, #c4b5fd)",
        transformOrigin: "left",
        zIndex: 100,
      }}
    />
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit", month: "long", year: "numeric",
  });
}

export default function PostClient({ post, children }) {
  const typeLabel = { articles: "article", posts: "post", writeups: "writeup" }[post.type] || post.type;

  return (
    <main className="min-h-screen relative" style={{ backgroundColor: "#050505" }}>
      <ScrollBar />
      <AmbientBackground />

      {/* Nav */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.97), transparent)" }}
      >
        <Link href="/logs" className="group flex items-center">
          <span
            className="font-mono text-xs px-3 py-1.5 rounded-sm transition-all duration-300 group-hover:text-white"
            style={{ border: "1px solid #2a2a2a", color: "#666", backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            ← logs
          </span>
        </Link>
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "#2a2a2a" }}>
          {typeLabel}
        </span>
        <div className="w-20" />
      </div>

      <div className="relative z-10 max-w-[680px] mx-auto px-6 pt-36 pb-40">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-5 flex-wrap">
            <span
              className="font-mono text-[10px] tracking-[0.3em] uppercase px-2 py-1 rounded-sm"
              style={{ backgroundColor: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", color: "#8b5cf6" }}
            >
              {typeLabel}
            </span>
            <span className="font-mono text-xs" style={{ color: "#2a2a2a" }}>{formatDate(post.date)}</span>

            {/* Botão de PDF — só aparece em writeups com pdf */}
            {post.type === "writeups" && post.pdf && (
              <a
                href={post.pdf}
                download
                className="flex items-center gap-2 font-mono text-xs px-3 py-1 rounded-sm transition-all duration-200 ml-auto"
                style={{ backgroundColor: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)", color: "#a78bfa" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(139,92,246,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "rgba(139,92,246,0.1)"; }}
              >
                ↓ baixar report PDF
              </a>
            )}
          </div>

          <h1
            className="font-mono font-black tracking-tight leading-tight mb-5"
            style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", color: "#e8e8e8", letterSpacing: "-0.02em" }}
          >
            {post.title}
          </h1>

          {post.description && (
            <p className="font-mono text-sm leading-relaxed mb-6" style={{ color: "#666" }}>{post.description}</p>
          )}

          {post.topics?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.topics.map(t => (
                <span key={t} className="font-mono text-[10px] px-2.5 py-1 rounded-sm" style={{ backgroundColor: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)", color: "#7c3aed" }}>{t}</span>
              ))}
            </div>
          )}

          {/* Linha animada */}
          <div className="relative h-px overflow-hidden">
            <div className="absolute inset-0" style={{ backgroundColor: "#111" }} />
            <motion.div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, transparent, #8b5cf6, transparent)" }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Imagem de capa */}
        {post.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative w-full rounded-sm overflow-hidden mb-12"
            style={{ height: 300, border: "1px solid #141414" }}
          >
            <Image src={post.image} alt={post.title} fill className="object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,5,5,0.5) 0%, transparent 60%)" }} />
          </motion.div>
        )}

        {/* Conteúdo MDX — passado como children do servidor */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {children}
        </motion.article>

        {/* Rodapé */}
        <div
          className="mt-16 pt-8 flex justify-between items-center font-mono text-xs"
          style={{ borderTop: "1px solid #0d0d0d", color: "#1e1e1e" }}
        >
          <Link href="/logs" className="hover:text-purple-500 transition-colors" style={{ color: "#2a2a2a" }}>
            ← voltar para logs
          </Link>
          <span>P3g4su · {post.date?.split("-")[0]}</span>
        </div>

      </div>
    </main>
  );
}