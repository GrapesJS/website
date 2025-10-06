import { Suspense } from "react";
import "../ai/ai-globals.css";
import AiPage from "./ai";

export default function RootPage() {
  return (
    <Suspense>
      <AiPage />
    </Suspense>
  );
}
