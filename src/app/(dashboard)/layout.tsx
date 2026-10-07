import { Sidebar } from '@/components/layout/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto flex min-h-[calc(100vh-4rem)]">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 lg:p-10 max-w-5xl">{children}</div>
    </div>
  );
}
