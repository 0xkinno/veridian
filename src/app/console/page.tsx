import { ConsoleApp, ConsoleTab } from "@/components/ConsoleApp";

interface PageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function ConsolePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialTab = (params?.tab as ConsoleTab) || "overview";

  return <ConsoleApp initialTab={initialTab} />;
}
