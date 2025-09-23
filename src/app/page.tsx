import { Suspense } from "react";
import AiPage from "./ai/ai";
import "./ai/ai-globals.css";

export default function RootPage() {
  return (
    <Suspense>
      <AiPage />
    </Suspense>
  );
}
