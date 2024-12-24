"use client";
import { HTMLAttributes, ReactNode } from "react";

import cn from "classnames";
import styles from "./styles.module.css";

export interface Tab {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  onClick: (tab: Tab, index: number) => void;
}

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  variant?: "underline" | "pill";
  selectedIndex: number;
  tabs: Tab[];
}

const TabSelect = ({ variant, tabs, selectedIndex, ...rest }: Props) => {
  return (
    <div
      {...rest}
      className={cn(
        styles.container,
        variant === "underline" ? styles.underline : styles.pill
      )}
    >
      {tabs.map((tab, i) => (
        <button
          key={tab.id}
          className={cn(styles.tab, selectedIndex === i && styles.selected)}
          onClick={(e) => tab.onClick(tab, i)}
        >
          <div className={styles.label}>
            {tab.icon && <div className={styles.icon}>{tab.icon}</div>}
            {tab.label}
          </div>
        </button>
      ))}
    </div>
  );
};

export default TabSelect;
