import { useState } from "react";
import cn from "classnames";
import Link from "next/link";
import styles from "./styles.module.css";
import { mdiChevronDown } from "@mdi/js";
import Icon from "@mdi/react";

const Dropdown = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { content: "Website Builder", href: "#1" },
    { content: "Newsletter Builder", href: "#2" },
  ];

  return (
    <div className={styles.dropdown}>
      <button
        className={styles.toggle}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        Free Tools
        <Icon path={mdiChevronDown} size={0.8} />
      </button>
      <div className={cn(styles.menu, { [styles.open]: open })}>
        {links.map(({ href, content }) => (
          <Link key={href} href={href} className={styles.link}>
            {content}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
