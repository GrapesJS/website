import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import { Post } from "@/interfaces/post";
import urls from "@/lib/urls";
import { mdiArrowTopRightThick } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { ReactNode } from "react";
import DateFormatter from "../date-formatter";
import PostReadTime from "../postReadTime";
import styles from "./styles.module.css";

const Label = ({ label, children }: { label: string; children: ReactNode }) => {
  return (
    <div className={styles.labelContainer}>
      <p className={styles.label}>{label}</p>
      {children}
    </div>
  );
};

export function HeroPost({ post }: { post: Post }) {
  const { title, author, slug } = post;
  const titleAndExcerpt = (
    <div className={styles.titleAndExcerpt}>
      <h3 className={styles.title}>
        <Link href={urls.getPathBlog(slug)}>{title}</Link>
      </h3>
      <p className={styles.excerpt}>{post.excerpt}</p>
    </div>
  );

  const metadata = (
    <div className={styles.metadataContainer}>
      <Label label="Written by">
        <Avatar
          className={styles.metadata}
          name={author.name}
          picture={author.picture}
        />
      </Label>
      <Label label="Published on">
        <DateFormatter className={styles.metadata} dateString={post.date} />
      </Label>
      <Label label="Read time">
        <PostReadTime className={styles.metadata} post={post} />
      </Label>
    </div>
  );

  return (
    <section className={styles.postPreview}>
      <div className={styles.imageContainer}>
        <CoverImage
          className={styles.backgroundImage}
          title={title}
          src={post.coverImage}
        />
        <CoverImage
          className={styles.coverImage}
          title={title}
          src={post.coverImage}
          slug={slug}
        />
        <div className={styles.mobileCaption}>
          {titleAndExcerpt}
          {metadata}
        </div>
      </div>
      <div className={styles.desktopContent}>
        {titleAndExcerpt}
        {metadata}
      </div>
    </section>
  );
}
