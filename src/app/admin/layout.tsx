'use client';
import { useState, useEffect } from 'react';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { DashboardSidebar } from '@/components/admin/DashboardSidebar';
import { DashboardHeader } from '@/components/admin/DashboardHeader';
import { Loader2 } from 'lucide-react';
import { doc } from 'firebase/firestore';
import { useMemoFirebase } from '@/firebase/provider';

type UserProfile = {
  role: 'admin' | 'user';
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const firestore = useFirestore();

  const userProfileRef = useMemoFirebase(
    () => (firestore && user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  useEffect(() => {
    const isLoading = isUserLoading || isProfileLoading;
    
    // Wait until we have user and profile info
    if (isLoading) {
      return;
    }
    
    // If no user is logged in, redirect to the main login page
    if (!user && pathname.startsWith('/admin')) {
      router.push('/login');
      return;
    }

    // If user is logged in but is not an admin, redirect them away from admin pages
    if (user && userProfile?.role !== 'admin' && pathname.startsWith('/admin')) {
      router.push('/');
    }

  }, [user, userProfile, isUserLoading, isProfileLoading, router, pathname]);

  const isLoading = isUserLoading || (user && isProfileLoading);
  // While loading, or if no user, or if user is not an admin (and on an admin page), show spinner.
  if (pathname.startsWith('/admin') && (isLoading || !user || userProfile?.role !== 'admin')) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  // This handles the specific case for `/admin` login page.
  // If the user is somehow already logged in and an admin, redirect them to the dashboard.
  if (pathname === '/admin' && user && userProfile?.role === 'admin') {
    router.push('/admin/dashboard');
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }
  
  // Render the admin login form if the path is exactly /admin and user is not an admin
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
