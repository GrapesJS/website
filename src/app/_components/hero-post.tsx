import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import Link from "next/link";
import DateFormatter from "./date-formatter";
import { getPathBlog } from "@/lib/utils";
import PostReadTime from "./postReadTime";
import { Post } from "@/interfaces/post";

export function HeroPost({ post }: { post: Post }) {
  const { title, author, slug } = post;
  return (
    <section className="flex flex-col md:flex-row md:gap-10">
      <div className="mb-8 md:mb-16 md:order-1 md:basis-1/2">
        <CoverImage title={title} src={post.coverImage} slug={slug} />
      </div>
      <div className="md:grid md:grid-cols-1 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28 md:basis-1/2">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link href={getPathBlog(slug)} className="hover:underline font-semibold">
              {title}
            </Link>
          </h3>
          <div className="mb-4 flex gap-5 opacity-60">
            <DateFormatter dateString={post.date} />
            <PostReadTime post={post}/>
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{post.excerpt}</p>
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </section>
  );
}
