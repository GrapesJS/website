"use client";
import { HTMLAttributes } from "react";

import { cx } from "@/lib/makeCls";
import styles from "./styles.module.css";

export interface Tab {
  id: string;
  label: string;
  onClick: (tab: Tab, index: number) => void;
}

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  selectedIndex: number;
  tabs: Tab[];
}

const PillTabs = ({ tabs, selectedIndex, ...rest }: Props) => {
  return (
    <div {...rest} className={styles.container}>
      {tabs.map((tab, i) => (
        <button
          key={tab.id}
          className={cx(styles.tab, selectedIndex === i && styles.selected)}
          onClick={(e) => tab.onClick(tab, i)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default PillTabs;
