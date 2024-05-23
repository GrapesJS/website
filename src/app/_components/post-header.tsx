import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
};

export function PostHeader({ title, coverImage, date, author }: Props) {
  return (
    <>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
        {title}
      </h1>
      <div className="flex gap-5 items-center mb-7 md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
        <DateFormatter className="text-xl" dateString={date} />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
    </>
  );
}
