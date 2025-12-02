'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { DashboardSidebar } from '@/components/admin/DashboardSidebar';
import { DashboardHeader } from '@/components/admin/DashboardHeader';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If still checking for user, don't do anything yet.
    if (isUserLoading) {
      return;
    }
    
    // If loading is finished and there's no user, redirect to the new login page,
    // but only if we are not already on a public-facing page that might lead here.
    if (!user && pathname.startsWith('/admin')) {
      router.push('/login');
    }
  }, [user, isUserLoading, router, pathname]);

  // If we are on a protected route and still loading or have no user, show a spinner.
  if (pathname.startsWith('/admin') && (isUserLoading || !user)) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }
  
  // If we're on the dedicated admin login page, and somehow a user is already logged in, redirect them.
  if (pathname === '/admin' && user) {
    router.push('/admin/dashboard');
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  // This handles showing the admin login form if the path is /admin
  if (pathname === '/admin') {
    return <>{children}</>;
  }


  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200">
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="lg:pl-64">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
