import Container from "@/app/_components/container";
import { getPathBlog } from "@/lib/utils";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>HOME!</h1>
      <Container>
        <Link className="px-2" href={getPathBlog()}>Blog</Link>
      </Container>
    </main>
  );
}
