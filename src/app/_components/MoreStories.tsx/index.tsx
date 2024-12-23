import { Post } from "@/interfaces/post";
import { PostPreview } from "../PostPreview";
type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  return (
    <section className="pt-[32px]">
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.concat(...posts).map((post) => (
          <PostPreview key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}