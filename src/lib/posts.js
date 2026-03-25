import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src", "content");

export function getAllPosts(type) {
  const dir = path.join(contentDir, type);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(".mdx", "");
    const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      type,
      title:       data.title       || "Sem título",
      description: data.description || "",
      date:        data.date        || "",
      topics:      data.topics      || [],
      image:       data.image       || null,
      pdf:         data.pdf         || null,   // ← novo: caminho do PDF para writeups
      draft:       data.draft       || false,
      content,
    };
  });

  return posts
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(type, slug) {
  const filePath = path.join(contentDir, type, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    type,
    title:       data.title       || "Sem título",
    description: data.description || "",
    date:        data.date        || "",
    topics:      data.topics      || [],
    image:       data.image       || null,
    pdf:         data.pdf         || null,
    draft:       data.draft       || false,
    content,
  };
}