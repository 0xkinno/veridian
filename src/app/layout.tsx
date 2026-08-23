import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VERIDIAN — Requirements that prove themselves",
  description: "VERIDIAN turns product requirements into Kane-verified browser evidence and bounded repair contracts.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
