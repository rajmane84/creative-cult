import { Navbar } from '@/components/navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full pt-16 flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 w-full flex flex-col">{children}</div>
    </div>
  );
}
