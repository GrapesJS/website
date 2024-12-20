import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import { Post } from "@/interfaces/post";
import { getPathBlog } from "@/lib/utils";
import Link from "next/link";
import DateFormatter from "../date-formatter";
import PostReadTime from "../postReadTime";
import styles from "./styles.module.css";

export function HeroPost({ post }: { post: Post }) {
  const { title, author, slug, date, minRead } = post;
  return (
    <section className={styles.heroPost}>
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
