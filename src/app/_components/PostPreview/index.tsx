import { Post } from "@/interfaces/post";
import { getPathBlog } from "@/lib/utils";
import Link from "next/link";
import Avatar from "../avatar";
import CoverImage from "../cover-image";
import DateFormatter from "../date-formatter";
import PostReadTime from "../postReadTime";
import styles from "./styles.module.css";
export function PostPreview({ post }: { post: Post }) {
  const { title, author, slug } = post;
  return (
    <section className={styles.postPreview}>
      <div className={styles.imageContainer}>
        <CoverImage title={title} src={post.coverImage} slug={slug} />
        <div className={styles.imageOverlay}>
          <Avatar
            className={styles.author}
            name={author.name}
            picture={author.picture}
          />
          <p className={styles.dateAndReatTime}>
            <DateFormatter dateString={post.date} /> •{" "}
            <PostReadTime post={post} />
          </p>
        </div>
      </div>
      <div className={styles.titleAndExcerpt}>
        <h3 className={styles.title}>
          <Link href={getPathBlog(slug)}>{title}</Link>
        </h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
      </div>
    </section>
  );
}
