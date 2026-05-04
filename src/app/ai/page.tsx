import { Suspense } from "react";
import AiPage from "./ai";

export default function Page() {
  return (
    <Suspense>
      <AiPage />
    </Suspense>
  );
}
