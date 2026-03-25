import { getAllPosts } from "../../lib/posts";
import LogsClient from "./LogsClient";

export default function LogsPage() {
  const articles  = getAllPosts("articles");
  const posts     = getAllPosts("posts");
  const writeups  = getAllPosts("writeups");

  return <LogsClient articles={articles} posts={posts} writeups={writeups} />;
}