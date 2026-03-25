"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
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

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

// ─── Card de Article ──────────────────────────────────────────────────────────
function ArticleCard({ post, index }) {
  return (
    <Reveal delay={index * 0.06}>
      <Link
        href={`/logs/${post.type}/${post.slug}`}
        className="group block rounded-sm overflow-hidden transition-all duration-300"
        style={{ border: "1px solid #141414", backgroundColor: "rgba(255,255,255,0.02)" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)"; e.currentTarget.style.backgroundColor = "rgba(139,92,246,0.03)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "#141414"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)"; }}
      >
        <div className="w-full overflow-hidden relative" style={{ height: 180, backgroundColor: "#0a0a0a" }}>
          {post.image ? (
            <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="w-full h-full flex items-center justify-center relative" style={{ backgroundColor: "#0d0d0d" }}>
              <div className="font-mono text-4xl font-black" style={{ color: "#1a1a1a" }}>{post.title.charAt(0)}</div>
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(139,92,246,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.07) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            </div>
          )}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,5,5,0.8) 0%, transparent 60%)" }} />
        </div>
        <div className="p-5">
          <div className="font-mono text-xs mb-3" style={{ color: "#2a2a2a" }}>{formatDate(post.date)}</div>
          <h2 className="font-mono font-semibold text-base leading-snug mb-2 transition-colors duration-200 group-hover:text-white" style={{ color: "#bbb" }}>{post.title}</h2>
          {post.description && <p className="font-mono text-xs leading-relaxed mb-4" style={{ color: "#555" }}>{post.description}</p>}
          {post.topics?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.topics.map(t => (
                <span key={t} className="font-mono text-[10px] px-2 py-1 rounded-sm" style={{ backgroundColor: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)", color: "#7c3aed" }}>{t}</span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </Reveal>
  );
}

// ─── Card de Post ─────────────────────────────────────────────────────────────
function PostCard({ post, index }) {
  return (
    <Reveal delay={index * 0.05}>
      <Link
        href={`/logs/${post.type}/${post.slug}`}
        className="group flex items-start gap-5 px-5 py-4 rounded-sm transition-all duration-300"
        style={{ border: "1px solid #141414", backgroundColor: "rgba(255,255,255,0.02)" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)"; e.currentTarget.style.backgroundColor = "rgba(139,92,246,0.03)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "#141414"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)"; }}
      >
        <div className="flex-shrink-0 pt-0.5 w-16">
          <div className="font-mono text-[10px] leading-relaxed" style={{ color: "#2a2a2a" }}>{formatDate(post.date)}</div>
        </div>
        <div className="w-px self-stretch" style={{ backgroundColor: "#141414" }} />
        <div className="flex-1 min-w-0">
          <h2 className="font-mono font-semibold text-sm leading-snug mb-1.5 transition-colors duration-200 group-hover:text-white" style={{ color: "#bbb" }}>{post.title}</h2>
          {post.description && <p className="font-mono text-xs leading-relaxed mb-2" style={{ color: "#555" }}>{post.description}</p>}
          {post.topics?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.topics.map(t => (
                <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded-sm" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid #1c1c1c", color: "#444" }}>{t}</span>
              ))}
            </div>
          )}
        </div>
        <span className="flex-shrink-0 font-mono text-sm opacity-0 group-hover:opacity-100 transition-all duration-200 self-center" style={{ color: "#8b5cf6" }}>→</span>
      </Link>
    </Reveal>
  );
}

// ─── Card de Writeup ──────────────────────────────────────────────────────────
function WriteupsCard({ post, index }) {
  return (
    <Reveal delay={index * 0.06}>
      <div
        className="group rounded-sm overflow-hidden transition-all duration-300"
        style={{ border: "1px solid #141414", backgroundColor: "rgba(255,255,255,0.02)" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)"; e.currentTarget.style.backgroundColor = "rgba(139,92,246,0.03)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "#141414"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)"; }}
      >
        {/* Imagem */}
        <div className="w-full overflow-hidden relative" style={{ height: 160, backgroundColor: "#0a0a0a" }}>
          {post.image ? (
            <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="w-full h-full flex items-center justify-center relative" style={{ backgroundColor: "#0d0d0d" }}>
              {/* Ícone de report */}
              <div className="flex flex-col items-center gap-1 opacity-20">
                <div className="font-mono text-3xl" style={{ color: "#8b5cf6" }}>⬡</div>
                <div className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "#8b5cf6" }}>writeup</div>
              </div>
              <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
            </div>
          )}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 60%)" }} />
          {/* Badge de writeup */}
          <div className="absolute top-3 left-3">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase px-2 py-1 rounded-sm" style={{ backgroundColor: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.3)", color: "#a78bfa" }}>
              writeup
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="font-mono text-xs mb-2" style={{ color: "#2a2a2a" }}>{formatDate(post.date)}</div>

          <h2 className="font-mono font-semibold text-base leading-snug mb-2" style={{ color: "#bbb" }}>{post.title}</h2>

          {post.description && (
            <p className="font-mono text-xs leading-relaxed mb-4" style={{ color: "#555" }}>{post.description}</p>
          )}

          {post.topics?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {post.topics.map(t => (
                <span key={t} className="font-mono text-[10px] px-2 py-1 rounded-sm" style={{ backgroundColor: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)", color: "#7c3aed" }}>{t}</span>
              ))}
            </div>
          )}

          {/* Botões: ler online + baixar PDF */}
          <div className="flex gap-2 mt-auto">
            <Link
              href={`/logs/${post.type}/${post.slug}`}
              className="flex-1 flex items-center justify-center gap-2 font-mono text-xs py-2 rounded-sm transition-all duration-200"
              style={{ border: "1px solid #1c1c1c", color: "#666", backgroundColor: "rgba(255,255,255,0.02)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.color = "#aaa"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#1c1c1c"; e.currentTarget.style.color = "#666"; }}
            >
              ler online
            </Link>

            {post.pdf && (
              <a
                href={post.pdf}
                download
                className="flex-1 flex items-center justify-center gap-2 font-mono text-xs py-2 rounded-sm transition-all duration-200"
                style={{ border: "1px solid rgba(139,92,246,0.25)", color: "#a78bfa", backgroundColor: "rgba(139,92,246,0.08)" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(139,92,246,0.15)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "rgba(139,92,246,0.08)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.25)"; }}
              >
                ↓ baixar PDF
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LogsClient({ articles, posts, writeups }) {
  const [tab, setTab] = useState("articles");

  const tabs = [
    { key: "articles", label: "Articles", count: articles.length },
    { key: "posts",    label: "Posts",    count: posts.length    },
    { key: "writeups", label: "Writeups", count: writeups.length },
  ];

  return (
    <main className="min-h-screen relative" style={{ backgroundColor: "#050505" }}>
      <AmbientBackground />

      {/* Nav */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.95), transparent)" }}
      >
        <Link href="/" className="group flex items-center">
          <span className="font-mono text-xs px-3 py-1.5 rounded-sm transition-all duration-300 group-hover:text-white" style={{ border: "1px solid #2a2a2a", color: "#666", backgroundColor: "rgba(255,255,255,0.03)" }}>
            ← home
          </span>
        </Link>
        <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: "#2a2a2a" }}>/logs</span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#8b5cf6" }} />
          <span className="font-mono text-xs" style={{ color: "#2a2a2a" }}>online</span>
        </div>
      </div>

      <div className="relative z-10 max-w-[780px] mx-auto px-6 pt-36 pb-40">

        {/* Header */}
        <Reveal className="mb-14">
          <div className="font-mono text-xs tracking-[0.4em] uppercase mb-5" style={{ color: "#252525" }}>transmission log</div>
          <h1
            className="font-mono font-black tracking-tight leading-none mb-4"
            style={{ fontSize: "clamp(2.8rem, 8vw, 4.5rem)", background: "linear-gradient(135deg, #e8e8e8 0%, #aaa 60%, #444 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", letterSpacing: "-0.03em" }}
          >
            logs
          </h1>
          <p className="font-mono text-sm" style={{ color: "#555" }}>Writeups, estudos, conceitos e reflexões.</p>
        </Reveal>

        {/* Tabs */}
        <Reveal className="mb-10">
          <div className="flex gap-1 p-1 rounded-sm w-fit" style={{ backgroundColor: "#0a0a0a", border: "1px solid #141414" }}>
            {tabs.map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className="font-mono text-xs px-4 py-2 rounded-sm transition-all duration-200"
                style={{
                  color: tab === key ? "#fff" : "#444",
                  backgroundColor: tab === key ? "rgba(139,92,246,0.15)" : "transparent",
                  border: tab === key ? "1px solid rgba(139,92,246,0.3)" : "1px solid transparent",
                }}
              >
                {label}
                <span className="ml-2 font-mono text-[10px]" style={{ color: tab === key ? "#8b5cf6" : "#2a2a2a" }}>{count}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Conteúdo das tabs */}
        <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          {tab === "articles" && (
            articles.length === 0
              ? <Empty text="Nenhum artigo publicado ainda." />
              : <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{articles.map((p, i) => <ArticleCard key={p.slug} post={p} index={i} />)}</div>
          )}
          {tab === "posts" && (
            posts.length === 0
              ? <Empty text="Nenhum post publicado ainda." />
              : <div className="flex flex-col gap-3">{posts.map((p, i) => <PostCard key={p.slug} post={p} index={i} />)}</div>
          )}
          {tab === "writeups" && (
            writeups.length === 0
              ? <Empty text="Nenhum writeup publicado ainda." />
              : <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{writeups.map((p, i) => <WriteupsCard key={p.slug} post={p} index={i} />)}</div>
          )}
        </motion.div>

      </div>
    </main>
  );
}

function Empty({ text }) {
  return (
    <div className="font-mono text-sm py-20 text-center" style={{ color: "#2a2a2a" }}>{text}</div>
  );
}