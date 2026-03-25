import { getPostBySlug, getAllPosts } from "../../../../lib/posts";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import PostClient from "./PostClient";
import Image from "next/image";

// Componente de imagem inline — com borda, caption e lightbox simples
function MdxImage({ src, alt }) {
  return (
    <figure style={{ margin: "2rem 0" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          borderRadius: "2px",
          overflow: "hidden",
          border: "1px solid #1c1c1c",
          backgroundColor: "#0a0a0a",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || ""}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            maxHeight: "520px",
            objectFit: "contain",
          }}
        />
        {/* Overlay sutil nas bordas */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          boxShadow: "inset 0 0 0 1px rgba(139,92,246,0.08)",
        }} />
      </div>
      {/* Caption = texto alt, se existir */}
      {alt && (
        <figcaption style={{
          fontFamily: "monospace",
          fontSize: "0.7rem",
          color: "#333",
          textAlign: "center",
          marginTop: "0.6rem",
          letterSpacing: "0.05em",
        }}>
          {alt}
        </figcaption>
      )}
    </figure>
  );
}

const mdxComponents = {
  h1: (p) => <h1 style={{ color: "#e0e0e0", fontFamily: "monospace", fontSize: "1.5rem", fontWeight: 900, marginTop: "2.5rem", marginBottom: "1rem", letterSpacing: "-0.02em" }} {...p} />,
  h2: (p) => <h2 style={{ color: "#d0d0d0", fontFamily: "monospace", fontSize: "1.25rem", fontWeight: 700, marginTop: "2rem", marginBottom: "0.75rem" }} {...p} />,
  h3: (p) => <h3 style={{ color: "#bbb", fontFamily: "monospace", fontSize: "1rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.5rem" }} {...p} />,
  p:  (p) => <p  style={{ color: "#888", fontFamily: "monospace", fontSize: "0.875rem", lineHeight: 2, marginBottom: "1.25rem" }} {...p} />,
  a:  (p) => <a  style={{ color: "#a78bfa", textDecoration: "underline", textUnderlineOffset: "4px" }} target="_blank" rel="noopener noreferrer" {...p} />,
  ul: (p) => <ul style={{ marginBottom: "1.25rem", paddingLeft: 0 }} {...p} />,
  ol: (p) => <ol style={{ color: "#888", marginBottom: "1.25rem", paddingLeft: "1rem" }} {...p} />,
  li: ({ children }) => (
    <li style={{ display: "flex", gap: "0.75rem", color: "#777", fontFamily: "monospace", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "0.5rem" }}>
      <span style={{ color: "#8b5cf6", flexShrink: 0 }}>›</span>
      <span>{children}</span>
    </li>
  ),
  blockquote: (p) => <blockquote style={{ borderLeft: "2px solid rgba(139,92,246,0.4)", paddingLeft: "1rem", margin: "1.5rem 0", color: "#666", fontFamily: "monospace", fontSize: "0.875rem", fontStyle: "italic" }} {...p} />,
  code: (p) => <code style={{ backgroundColor: "rgba(139,92,246,0.1)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.15)", borderRadius: "2px", padding: "2px 6px", fontFamily: "monospace", fontSize: "0.75rem" }} {...p} />,
  pre: (p) => <pre style={{ backgroundColor: "#0a0a0a", border: "1px solid #1c1c1c", borderRadius: "2px", padding: "1.25rem", overflowX: "auto", margin: "1.5rem 0", color: "#aaa", fontFamily: "monospace", fontSize: "0.75rem", lineHeight: 1.7 }} {...p} />,
  hr: () => <hr style={{ borderTop: "1px solid #141414", border: "none", margin: "2.5rem 0" }} />,
  strong: (p) => <strong style={{ color: "#c4b5fd", fontWeight: 600 }} {...p} />,
  em: (p) => <em style={{ color: "#999" }} {...p} />,
  img: MdxImage,  // ← imagens inline estilizadas
};

export async function generateStaticParams() {
  const types = ["articles", "posts", "writeups"];
  return types.flatMap((type) =>
    getAllPosts(type).map((p) => ({ type, slug: p.slug }))
  );
}

export default async function PostPage({ params }) {
  const { type, slug } = await params;
  const post = getPostBySlug(type, slug);
  if (!post) notFound();

  const mdx = <MDXRemote source={post.content} components={mdxComponents} />;

  return (
    <PostClient post={post}>
      {mdx}
    </PostClient>
  );
}