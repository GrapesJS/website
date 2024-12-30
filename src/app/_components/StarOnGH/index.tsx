"use client";
import GitHubButton from "react-github-btn";

const StarOnGH = () => {
  return (
    <div className="flex gap-3 items-center font-normal">
      <span>Join the thousands of happy developers</span>
      <div className="h-[27px]">
        <GitHubButton
          href="https://github.com/GrapesJS/grapesjs"
          data-color-scheme="dark"
          data-size="large"
          data-show-count="true"
          aria-label="Star GrapesJS/grapesjs on GitHub"
        >
          Star
        </GitHubButton>
      </div>
    </div>
  );
};

export default StarOnGH;
