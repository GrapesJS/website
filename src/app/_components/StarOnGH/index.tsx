"use client";
import GitHubButton from "react-github-btn";
import styles from "./styles.module.css";

type Props = {};

const StarOnGH = (props: Props) => {
  return (
    <div className={styles.container}>
      Join the thousands of happy developers
      <GitHubButton
        href="https://github.com/GrapesJS/grapesjs"
        data-color-scheme="no-preference: light; light: light; dark: dark;"
        data-size="large"
        data-show-count="true"
        aria-label="Star GrapesJS/grapesjs on GitHub"
      >
        Star
      </GitHubButton>
    </div>
  );
};

export default StarOnGH;
