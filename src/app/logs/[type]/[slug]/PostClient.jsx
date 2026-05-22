"use client";

import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import AmbientBackground from "../../../../components/AmbientBackground";
import ShareButton from "../../../../components/ShareButton";

function ScrollBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        position: "fixed", top: 0, left: 0,
        width: "100%", height: "2px",
        background: "linear-gradient(to right, #4c1d95, #8b5cf6, #c4b5fd)",
        transformOrigin: "left", zIndex: 100,
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
  const hasHero = !!post.image;

  return (
    <main className="min-h-screen relative" style={{ backgroundColor: "#050505" }}>
      <ScrollBar />
      <AmbientBackground />

      {/* ── Nav fixa ── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-5"
        style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.9), transparent)" }}
      >
        <Link href="/logs" className="group flex items-center">
          <span
            className="font-mono text-xs px-3 py-1.5 rounded-sm transition-all duration-300 group-hover:text-white"
            style={{ border: "1px solid #333", color: "#888", backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
          >
            ← logs
          </span>
        </Link>
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "#555" }}>
          {typeLabel}
        </span>
        <div className="w-20" />
      </div>

      {/* ══ HERO — imagem fullwidth com título sobreposto ══════════════════════ */}
      {hasHero ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full"
          style={{ height: "clamp(340px, 55vh, 560px)" }}
        >
          {/* Imagem */}
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center top" }}
          />

          {/* Gradientes — escurece topo (pra nav) e fundo (pra título) */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom, rgba(5,5,5,0.6) 0%, transparent 30%, transparent 40%, rgba(5,5,5,0.85) 75%, rgba(5,5,5,1) 100%)"
          }} />

          {/* Grain sobre a imagem */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04, mixBlendMode: "screen" }}>
            <filter id="hero-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#hero-grain)" />
          </svg>

          {/* Título sobreposto na parte de baixo da imagem */}
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-0">
            <div className="max-w-[680px] mx-auto pb-8">

              {/* Meta linha */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span
                  className="font-mono text-[10px] tracking-[0.3em] uppercase px-2 py-1 rounded-sm"
                  style={{ backgroundColor: "rgba(139,92,246,0.25)", border: "1px solid rgba(139,92,246,0.5)", color: "#c4b5fd" }}
                >
                  {typeLabel}
                </span>
                <span className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {formatDate(post.date)}
                </span>
                {post.readingTime && (
                  <>
                    <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
                    <span className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {post.readingTime} min de leitura
                    </span>
                  </>
                )}
                {post.type === "writeups" && post.pdf && (
                  <a href={post.pdf} download
                    className="flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-sm transition-all duration-200 ml-auto"
                    style={{ backgroundColor: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.4)", color: "#c4b5fd" }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(139,92,246,0.35)"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "rgba(139,92,246,0.2)"}
                  >
                    ↓ PDF
                  </a>
                )}
              </div>

              {/* Título grande */}
              <h1
                className="font-mono font-black tracking-tight leading-tight"
                style={{
                  fontSize: "clamp(1.8rem, 5vw, 3rem)",
                  color: "#f0f0f0",
                  letterSpacing: "-0.02em",
                  textShadow: "0 2px 20px rgba(0,0,0,0.8)",
                }}
              >
                {post.title}
              </h1>
            </div>
          </div>
        </motion.div>

      ) : (
        /* Sem imagem — header simples com padding de topo */
        <div className="pt-36" />
      )}

      {/* ══ CONTEÚDO ═══════════════════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-[680px] mx-auto px-6 pb-40" style={{ marginTop: hasHero ? 0 : undefined }}>

        {/* Descrição + tópicos + share — abaixo do hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="pt-8 mb-10"
        >
          {/* Sem imagem: mostra meta aqui */}
          {!hasHero && (
            <>
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase px-2 py-1 rounded-sm"
                  style={{ backgroundColor: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)", color: "#a78bfa" }}>
                  {typeLabel}
                </span>
                <span className="font-mono text-xs" style={{ color: "#777" }}>{formatDate(post.date)}</span>
                {post.readingTime && (
                  <>
                    <span style={{ color: "#333" }}>·</span>
                    <span className="font-mono text-xs" style={{ color: "#777" }}>{post.readingTime} min de leitura</span>
                  </>
                )}
              </div>
              <h1 className="font-mono font-black tracking-tight leading-tight mb-5"
                style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", color: "#e8e8e8", letterSpacing: "-0.02em" }}>
                {post.title}
              </h1>
            </>
          )}

          {post.description && (
            <p className="font-mono text-sm leading-relaxed mb-5" style={{ color: "#888" }}>
              {post.description}
            </p>
          )}

          {post.topics?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.topics.map(t => (
                <span key={t} className="font-mono text-[10px] px-2.5 py-1 rounded-sm"
                  style={{ backgroundColor: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)", color: "#a78bfa" }}>
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Linha + share */}
          <div className="flex items-center gap-4">
            <div className="relative h-px flex-1 overflow-hidden">
              <div className="absolute inset-0" style={{ backgroundColor: "#1a1a1a" }} />
              <motion.div className="absolute inset-0"
                style={{ background: "linear-gradient(to right, transparent, #8b5cf6, transparent)" }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <ShareButton title={post.title} description={post.description} />
          </div>
        </motion.div>

        {/* MDX */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          {children}
        </motion.article>

        {/* Rodapé */}
        <div className="mt-16 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-xs"
          style={{ borderTop: "1px solid #1a1a1a" }}>
          <Link href="/logs" className="hover:text-purple-400 transition-colors" style={{ color: "#666" }}>
            ← voltar para logs
          </Link>
          <div className="flex items-center gap-4">
            <span style={{ color: "#444" }}>P3g4su · {post.date?.split("-")[0]}</span>
            <ShareButton title={post.title} description={post.description} />
          </div>
        </div>

      </div>
    </main>
  );
}