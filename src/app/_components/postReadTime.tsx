import { Post } from "@/interfaces/post";

interface Props extends React.HTMLProps<HTMLTimeElement> {
  post: Post
};

export default function PostReadTime({ post, ...rest }: Props) {
  return <span {...rest}>{post.minRead} min read</span>;
};
