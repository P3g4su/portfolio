"use client";

import { useState } from "react";

export default function ShareButton({ title, description, url }) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const fullUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url: fullUrl });
      } catch (_) {}
      return;
    }
    setOpen((v) => !v);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => { setCopied(false); setOpen(false); }, 2000);
  };

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`;
  const twitterUrl  = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`;

  return (
    <div className="relative">
      {/* Botão principal */}
      <button
        onClick={handleNativeShare}
        className="flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-sm transition-all duration-200"
        style={{
          border: "1px solid #2a2a2a",
          color: "#777",
          backgroundColor: "rgba(255,255,255,0.03)",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)";
          e.currentTarget.style.color = "#c4b5fd";
          e.currentTarget.style.backgroundColor = "rgba(139,92,246,0.08)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = "#2a2a2a";
          e.currentTarget.style.color = "#777";
          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)";
        }}
      >
        {/* Ícone share */}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
        compartilhar
      </button>

      {/* Dropdown — aparece quando não tem Web Share API (desktop) */}
      {open && (
        <div
          className="absolute bottom-full mb-2 left-0 rounded-sm overflow-hidden"
          style={{
            border: "1px solid #1c1c1c",
            backgroundColor: "#0a0a0a",
            minWidth: 180,
            zIndex: 50,
          }}
        >
          {/* Copiar link */}
          <button
            onClick={handleCopy}
            className="w-full flex items-center gap-3 px-4 py-3 font-mono text-xs transition-colors duration-150 text-left"
            style={{ color: copied ? "#a78bfa" : "#777", borderBottom: "1px solid #141414" }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
          >
            {copied ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                link copiado!
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                copiar link
              </>
            )}
          </button>

          {/* LinkedIn */}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-4 py-3 font-mono text-xs transition-colors duration-150"
            style={{ color: "#777", borderBottom: "1px solid #141414", display: "flex" }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = "#aaa"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#777"; }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
            </svg>
            LinkedIn
          </a>

          {/* X / Twitter */}
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-4 py-3 font-mono text-xs transition-colors duration-150"
            style={{ color: "#777", display: "flex" }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = "#aaa"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#777"; }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            X (Twitter)
          </a>
        </div>
      )}

      {/* Fechar dropdown ao clicar fora */}
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
    </div>
  );
}