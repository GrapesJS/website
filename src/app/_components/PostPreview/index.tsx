import { Post } from "@/interfaces/post";
import urls from "@/lib/urls";
import { mdiArrowTopRightThick } from "@mdi/js";
import Icon from "@mdi/react";
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
        <CoverImage
          className={styles.backgroundImage}
          title={title}
          src={post.coverImage}
        />
        <CoverImage title={title} src={post.coverImage} slug={slug} />
        <div className={styles.imageCaption}>
          <Avatar
            className={styles.author}
            name={author.name}
            picture={author.picture}
          />
          <p className={styles.dateAndReadTime}>
            <DateFormatter dateString={post.date} /> •{" "}
            <PostReadTime post={post} />
          </p>
        </div>
      </div>
      <div className={styles.titleAndExcerpt}>
        <h3 className={styles.title}>
          <Link href={urls.getPathBlog(slug)}>{title}</Link>
        </h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
      </div>
      <Link className={styles.readPostLink} href={urls.getPathBlog(slug)}>
        Read post <Icon path={mdiArrowTopRightThick} size={1} />
      </Link>
    </section>
  );
}
