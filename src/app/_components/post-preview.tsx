import { Post } from "@/interfaces/post";
import { getPathBlog } from "@/lib/utils";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import PostReadTime from "./postReadTime";

export function PostPreview({ post }: { post: Post }) {
  const { title, author, slug } = post;
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={post.coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={getPathBlog(slug)} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="mb-4 flex gap-5 opacity-60">
        <DateFormatter dateString={post.date} />
        <PostReadTime post={post}/>
      </div>
      <p className="text-lg leading-relaxed mb-4">{post.excerpt}</p>
      <Avatar name={author.name} picture={author.picture} />
    </div>
  );
}
