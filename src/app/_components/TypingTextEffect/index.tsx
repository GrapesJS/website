"use client";
import cn from "classnames";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export type Props = {
  items: string[];
  /**
   * fixed container width, required to prevent jumping as word is being typed
   */
  width?: number;
  className?: string;
  typingDelayMs?: number;
  rotateItemDelayMs?: number;
  startTypingDelayMs?: number;
};
const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(min, v), max);

export const TypingTextEffect = (props: Props) => {
  const {
    items,
    width = 480,
    className,
    typingDelayMs = 100,
    rotateItemDelayMs = 3000,
    startTypingDelayMs = 500,
  } = props;
  const [index, setIndex] = useState(0);
  const [charLimit, setCharLimit] = useState(10);
  const [charLimitChange, setCharLimitChange] = useState(+1);
  const item = items[index];
  const rotateIndex = () => {
    setIndex((i) => (i + 1) % items.length);
    setCharLimit(0);
  };

  useEffect(() => {
    type Timeout = ReturnType<typeof setTimeout>;
    let timeout1: Timeout, timeout2: Timeout, timeout3: Timeout;
    timeout1 = setTimeout(() => {
      setCharLimitChange(-1);
      timeout2 = setTimeout(() => {
        setCharLimitChange(0);
        timeout3 = setTimeout(() => {
          rotateIndex();
          setCharLimitChange(+1);
        }, startTypingDelayMs);
      }, typingDelayMs * (item.length + 1));
    }, rotateItemDelayMs);

    return () => {
      timeout1 && clearTimeout(timeout1);
      timeout2 && clearTimeout(timeout2);
      timeout3 && clearTimeout(timeout3);
    };
  }, [item]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCharLimit((l) => clamp(l + charLimitChange, 0, item.length));
    }, typingDelayMs);
    return () => {
      clearInterval(interval);
    };
  }, [item, charLimitChange]);

  const text = item.substring(0, charLimit);
  return (
    <span className={styles.container} style={{ width }}>
      <span
        className={cn(className, styles.text, text === item && styles.finished)}
      >
        <span>{text}</span>
      </span>
    </span>
  );
};
