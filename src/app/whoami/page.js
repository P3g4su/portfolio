"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import AmbientBackground from "../../components/AmbientBackground";

// ─── Scroll progress ──────────────────────────────────────────────────────────
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

// ─── Reveal ao entrar no viewport ────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Label de seção ───────────────────────────────────────────────────────────
function SectionLabel({ n, title }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="font-mono text-xs tabular-nums" style={{ color: "#8b5cf6" }}>
        {String(n).padStart(2, "0")}
      </span>
      <div style={{ flex: 1, height: 1, backgroundColor: "#1c1c1c" }} />
      <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: "#444" }}>
        {title}
      </span>
    </div>
  );
}

// ─── Parágrafo com destaque inline ────────────────────────────────────────────
function P({ children, dim = false }) {
  return (
    <p
      className="font-mono text-sm leading-[2] mb-5 last:mb-0"
      style={{ color: dim ? "#555" : "#999" }}
    >
      {children}
    </p>
  );
}

function Hi({ children }) {
  return <span style={{ color: "#c4b5fd" }}>{children}</span>;
}

// ─── Badge de skill ───────────────────────────────────────────────────────────
function Badge({ label, core = false }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-sm"
      style={{
        backgroundColor: core ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${core ? "rgba(139,92,246,0.3)" : "rgba(255,255,255,0.07)"}`,
        color: core ? "#c4b5fd" : "#666",
      }}
    >
      {core && <span style={{ color: "#8b5cf6", fontSize: 8 }}>◆</span>}
      {label}
    </span>
  );
}

// ─── Entry de timeline ────────────────────────────────────────────────────────
function Entry({ period, role, where, bullets, current = false }) {
  return (
    <div className="relative pl-7 pb-9 last:pb-0">
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, backgroundColor: "#141414" }} />
      <div
        style={{
          position: "absolute", left: -3, top: 8,
          width: 7, height: 7, borderRadius: "50%",
          backgroundColor: current ? "#8b5cf6" : "#1c1c1c",
          border: current ? "none" : "1px solid #2a2a2a",
          boxShadow: current ? "0 0 10px rgba(139,92,246,0.6)" : "none",
        }}
      />
      <div className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: "#2d2d2d" }}>{period}</div>
      <div className="font-mono text-sm font-semibold mb-0.5" style={{ color: "#d4d4d4" }}>{role}</div>
      <div className="font-mono text-xs mb-3" style={{ color: "#444" }}>{where}</div>
      {bullets && (
        <ul className="space-y-2">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-3 font-mono text-sm" style={{ color: "#666" }}>
              <span style={{ color: "#8b5cf6", flexShrink: 0 }}>›</span>
              <span style={{ lineHeight: 1.7 }}>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function WhoAmI() {
  return (
    <main className="min-h-screen relative" style={{ backgroundColor: "#050505" }}>
      <ScrollBar />
      <AmbientBackground />

      {/* ─ Barra de navegação superior ─ */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.95), transparent)" }}
      >
        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <span
            className="font-mono text-xs px-3 py-1.5 rounded-sm transition-all duration-300 group-hover:text-white"
            style={{
              border: "1px solid #2a2a2a",
              color: "#666",
              backgroundColor: "rgba(255,255,255,0.03)",
            }}
          >
            ← home
          </span>
        </Link>

        <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: "#2a2a2a" }}>
          /whoami
        </span>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#8b5cf6" }} />
          <span className="font-mono text-xs" style={{ color: "#2a2a2a" }}>online</span>
        </div>
      </div>

      {/* ─ Conteúdo ─ */}
      <div className="relative z-10 max-w-[660px] mx-auto px-6 pt-36 pb-40">

        {/* ══ HEADER ══════════════════════════════════════════════════════════ */}
        <Reveal className="mb-20">
          <div className="font-mono text-xs tracking-[0.4em] uppercase mb-6" style={{ color: "#252525" }}>
            identity scan — complete
          </div>
          <h1
            className="font-mono font-black tracking-tight leading-none mb-4"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 6rem)",
              background: "linear-gradient(135deg, #e8e8e8 0%, #aaa 60%, #444 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "-0.03em",
            }}
          >
            P3g4su
          </h1>
          <p className="font-mono text-base" style={{ color: "#666" }}>
            Pedro Augusto — Security Engineer · AppSec · Offensive Security
          </p>
          <p className="font-mono text-sm mt-1" style={{ color: "#333" }}>
            São Paulo, BR
          </p>
        </Reveal>

        {/* ══ 01 — QUEM EU SOU (de verdade) ═══════════════════════════════════ */}
        <Reveal>
          <SectionLabel n={1} title="quem eu sou" />
        </Reveal>

        <Reveal delay={0.05} className="mb-16">
          <P>
            Sou um profissional de segurança formado pela FIAP que passou os últimos anos tentando entender como sistemas falham — e usando esse entendimento para construir sistemas que não falhem.
          </P>
          <P>
            Não entrei na área por acidente. Antes fiz técnico em <Hi>automação industrial</Hi> no IFSP — aprendi que sistemas físicos têm estados, timing e modos de falha muito reais. Essa lógica não some quando você migra para o mundo digital. Ela fica. E é útil.
          </P>
          <P>
            Hoje atuo como <Hi>Security Engineer na AlaskaBlue</Hi>, onde minha postura é híbrida por necessidade: quem refatora um portal corporativo com olhos de segurança precisa entender tanto de arquitetura quanto de exploração. Não existe meio-termo nessa posição.
          </P>
          <P>
            Tenho cidadania brasileira e italiana. Sou guiado por princípios cristãos — não como frase bonita de currículo, mas como a razão pela qual a linha ética da área não é negociável pra mim.
          </P>
        </Reveal>

        {/* ══ 02 — MENTALIDADE ════════════════════════════════════════════════ */}
        <Reveal>
          <SectionLabel n={2} title="mentalidade" />
        </Reveal>

        <Reveal delay={0.05} className="mb-16">
          <P>
            Existe uma separação artificial entre ataque e defesa que a maioria da indústria aceita sem questionar. Eu não aceito. <Hi>Quem constrói sistemas seguros sem entender como quebrá-los está apenas atrasando o problema</Hi> — não resolvendo.
          </P>
          <P>
            Quando escrevo código ou projeto uma arquitetura, carrego uma pergunta implícita: <Hi>"como eu exploraria isso?"</Hi> Não é paranoia. É o único método que faz sentido quando você sabe o que está do outro lado.
          </P>
          <P>
            Aprendo construindo coisas que me forçam a dominar o que ainda não sei. Ministrei 12 aulas práticas de Python com foco em segurança — keyloggers, C2, ARP scanner — e cada aula me exigiu ir mais fundo do que eu precisaria ir sozinho. <Hi>Ensinar é o teste mais honesto de conhecimento real.</Hi> Se você não consegue explicar, você não entendeu.
          </P>
          <P dim>
            Não tenho interesse em exploração ilícita. Isso não tem graça intelectual, só consequência legal. O que me fascina é o processo de entender sistemas em profundidade suficiente para encontrar o que o criador não viu.
          </P>
        </Reveal>

        {/* ══ 03 — STACK ══════════════════════════════════════════════════════ */}
        <Reveal>
          <SectionLabel n={3} title="stack real" />
        </Reveal>

        <Reveal delay={0.05} className="space-y-7 mb-16">
          {[
            {
              label: "ofensivo",
              items: [
                { name: "Pentest Web / OWASP Top 10", core: true },
                { name: "Burp Suite", core: true },
                { name: "Recon / Nmap", core: true },
                { name: "C2 (Discord)", core: true },
                { name: "MitM / Wireshark", core: false },
                { name: "Lockpicking", core: false },
                { name: "Tcpdump", core: false },
              ],
            },
            {
              label: "appsec & dev",
              items: [
                { name: "Python", core: true },
                { name: "Bash / Scripting", core: true },
                { name: "JWT / Auth Flows", core: true },
                { name: "IDOR / Priv. Escalation", core: true },
                { name: "PHP", core: false },
                { name: "HTML / CSS / JS", core: false },
              ],
            },
            {
              label: "infra",
              items: [
                { name: "Linux Hardening", core: true },
                { name: "Kali / Parrot", core: true },
                { name: "TCP/IP", core: true },
                { name: "Docker", core: false },
                { name: "Git / GitHub", core: false },
                { name: "Grep / Regex", core: false },
              ],
            },
          ].map(({ label, items }) => (
            <div key={label}>
              <div className="font-mono text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#383838" }}>
                {label}
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map(({ name, core }) => (
                  <Badge key={name} label={name} core={core} />
                ))}
              </div>
            </div>
          ))}
        </Reveal>

        {/* ══ 04 — O QUE EU CONSTRUÍ ══════════════════════════════════════════ */}
        <Reveal>
          <SectionLabel n={4} title="o que eu construí" />
        </Reveal>

        <Reveal delay={0.05} className="mb-16">
          <Entry
            current
            period="Nov 2025 — hoje"
            role="Security Engineer"
            where="AlaskaBlue"
            bullets={[
              "Refatoração segura de portal corporativo com postura DevSecOps — desenvolvimento e segurança no mesmo fluxo",
              "Autenticação JWT + controles server-side para eliminar IDOR e quebra de controle de acesso",
              "Encontrei e corrigi exposição de PII em produção — hardening imediato do ambiente",
              "Reescrevi código legado com foco em performance, segurança e usabilidade",
            ]}
          />
          <Entry
            period="2025"
            role="Instrutor — Python para Segurança"
            where="Grupo Utah"
            bullets={[
              "12 aulas práticas de Python aplicado a hacking ofensivo",
              "Labs reais: Keyloggers, Stealers, ARP Scanner e C2 integrado ao Discord",
              "Demonstrações de MitM para conscientização sobre criptografia",
            ]}
          />
          <Entry
            period="2024 — 2025"
            role="Instrutor — Python & Lógica"
            where="Projeto WRIT (Parceria Cisco)"
            bullets={[
              "Formação técnica de base para iniciantes em programação",
              "Material didático e exercícios práticos — do zero ao funcional",
            ]}
          />
          <Entry
            period="Contínuo"
            role="Ferramentas próprias"
            where="Pesquisa & Automação"
            bullets={[
              "Script de recon em Python: enumeração massiva de diretórios, arquivos e subdomínios",
              "Identificação automática de servidores web expostos (ex: IIS)",
            ]}
          />
        </Reveal>

        {/* ══ 05 — COMUNIDADE ══════════════════════════════════════════════════ */}
        <Reveal>
          <SectionLabel n={5} title="comunidade" />
        </Reveal>

        <Reveal delay={0.05} className="mb-6">
          <P>
            Fui ao H2HC e à GambiConf como staff antes de palestrar na GambiConf. Não é estratégia — é como eu aprendo. <Hi>Você vai a eventos de segurança para absorver cultura</Hi>, não para posar com badge. E carregando caixa ou na cabine de transmissão, você aprende coisas que o palco não mostra.
          </P>
        </Reveal>

        <Reveal delay={0.05} className="mb-16">
          <Entry
            current
            period="2025"
            role="Palestrante"
            where="GambiConf — Esquenta"
            bullets={["Apresentação técnica sobre Lockpicking e segurança física"]}
          />
          <Entry
            period="2025"
            role="Voluntário — Village"
            where="BSides SP"
            bullets={["Apoio técnico em Village temática com atividades práticas"]}
          />
          <Entry
            period="2025"
            role="Apoio — Cabine de Transmissão"
            where="GambiConf"
          />
          <Entry
            period="2024"
            role="Staff"
            where="H2HC — Hackers to Hackers Conference"
            bullets={["Organização e infraestrutura de um dos maiores eventos de segurança da América Latina"]}
          />
          <Entry
            period="2024"
            role="Staff"
            where="GambiConf"
          />
        </Reveal>

        {/* ══ 06 — ONDE QUERO CHEGAR ═══════════════════════════════════════════ */}
        <Reveal>
          <SectionLabel n={6} title="onde quero chegar" />
        </Reveal>

        <Reveal delay={0.05} className="mb-16">
          <P>
            Quero trabalhar com Pentest ou AppSec de verdade — não como checklist de compliance, mas como investigação real com impacto mensurável.
          </P>
          <P>
            Quero escrever ferramentas que economizem tempo de analistas. Quero eventualmente <Hi>contribuir para a comunidade com conteúdo técnico que valha o tempo de quem lê</Hi> — writeups, ferramentas open source, aulas.
          </P>
          <P dim>
            Não busco sênioridade rápida. Busco profundidade real. A diferença importa.
          </P>
        </Reveal>

        {/* ══ 07 — CONTATO ═════════════════════════════════════════════════════ */}
        <Reveal>
          <SectionLabel n={7} title="contato" />
        </Reveal>

        <Reveal delay={0.05} className="mb-16">
          <P dim>Se você chegou até aqui, provavelmente tem algo interessante a dizer.</P>
          <div className="flex flex-col gap-4 mt-6">
            {[
              { label: "GitHub",    sub: "github.com/P3g4su",              href: "https://github.com/P3g4su"           },
              { label: "LinkedIn",  sub: "linkedin.com/in/p3g4su",         href: "https://linkedin.com/in/p3g4su"      },
              { label: "Email",     sub: "panmachado301@gmail.com",         href: "mailto:panmachado301@gmail.com"       },
            ].map(({ label, sub, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between font-mono px-4 py-3 rounded-sm transition-all duration-300"
                style={{
                  border: "1px solid #141414",
                  backgroundColor: "rgba(255,255,255,0.02)",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#141414"}
              >
                <span className="text-sm font-semibold transition-colors duration-200 group-hover:text-white" style={{ color: "#888" }}>
                  {label}
                </span>
                <span className="text-xs transition-colors duration-200" style={{ color: "#383838" }}>
                  {sub} →
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        {/* Rodapé */}
        <div
          className="flex justify-between items-center font-mono text-xs pt-8"
          style={{ borderTop: "1px solid #0d0d0d", color: "#1e1e1e" }}
        >
          <span>P3g4su · 2026</span>
          <Link
            href="/portfolio"
            className="transition-colors duration-200 hover:text-purple-500"
            style={{ color: "#2a2a2a" }}
          >
            portfolio →
          </Link>
        </div>

      </div>
    </main>
  );
}