"use client";
import { ReactNode, useState } from "react";
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
      {/* TODO: transition when selected panel changes */}
      <div className={styles.panels}>{tabs[selectedIndex].content}</div>
    </div>
  );
};
