import { AuthProvider } from "./AuthProvider";

export default function AiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthProvider>{children}</AuthProvider>;
}
