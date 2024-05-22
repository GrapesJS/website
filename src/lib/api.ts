import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const blogPostsDir = join(process.cwd(), 'src/content/blog');

export function getPostSlugs() {
  return fs.readdirSync(blogPostsDir);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const fullPath = join(blogPostsDir, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    ...data,
    slug: realSlug,
    content,
  } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
