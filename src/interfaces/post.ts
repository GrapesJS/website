import { type Author } from "./author";

export interface Post {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  minRead: number;
  preview?: boolean;
};
