"use client";
import cn from "classnames";
import { ReactNode, useEffect, useState } from "react";
import TabSelect from "../TabSelect";
import styles from "./styles.module.css";

export type Tab = {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  content: ReactNode;
};

export type Props = {
  tabs: Tab[];
};
export const Tabs = (props: Props) => {
  const { tabs } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(selectedIndex);
  const inTransition = prevIndex !== selectedIndex;

  useEffect(() => {
    if (!inTransition) {
      return;
    }
    const fun = () => {
      setPrevIndex(selectedIndex);
    };
    const timeout = setTimeout(
      fun,
      250 // animation duration
    );
    return () => {
      clearTimeout(timeout);
    };
  }, [selectedIndex]);
  return (
    <div className={styles.container}>
      <TabSelect
        variant="underline"
        selectedIndex={selectedIndex}
        tabs={tabs.map((t, i) => ({
          ...t,
          onClick: () => setSelectedIndex(i),
        }))}
      />
      <div className={styles.panels}>
        {tabs.map((t, i) => (
          <div
            key={t.id}
            className={cn(styles.panel, i === selectedIndex && styles.selected)}
          >
            {t.content}
          </div>
        ))}
      </div>
    </div>
  );
};
