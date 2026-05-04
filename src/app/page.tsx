import { Suspense } from "react";
import AiPage from "./ai/ai";

export default function RootPage() {
  return (
    <Suspense>
      <AiPage />
    </Suspense>
  );
}
