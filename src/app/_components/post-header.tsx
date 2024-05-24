import { Post } from "@/interfaces/post";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import PostReadTime from "./postReadTime";

export function PostHeader({ post }: { post: Post }) {
  const { title, coverImage, date, author, minRead } = post;
  return (
    <>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-6 text-center md:text-left">
        {title}
      </h1>
      <div className="flex gap-5 items-center mb-7 md:mb-12 flex-wrap">
        <Avatar name={author.name} picture={author.picture} className="basis-full md:basis-auto"/>
        <DateFormatter dateString={date} />
        <PostReadTime post={post}/>
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
    </>
  );
}
