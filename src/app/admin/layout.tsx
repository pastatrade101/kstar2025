
'use client';
import { useState, useEffect } from 'react';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { DashboardSidebar } from '@/components/admin/DashboardSidebar';
import { DashboardHeader } from '@/components/admin/DashboardHeader';
import { Loader2 } from 'lucide-react';
import { doc } from 'firebase/firestore';
import { useMemoFirebase } from '@/firebase/provider';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type UserProfile = {
  role: 'admin' | 'user';
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const firestore = useFirestore();

  useEffect(() => {
    setSidebarOpen(isMobile === undefined ? false : !isMobile);
  }, [isMobile]);

  const userProfileRef = useMemoFirebase(
    () => (firestore && user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  const isLoading = isUserLoading || (user && isProfileLoading);

  useEffect(() => {
    // Wait until all loading is complete before making routing decisions
    if (isLoading) {
      return;
    }

    // If a user is logged in
    if (user) {
      // If they are NOT an admin, redirect them away from any admin page
      if (userProfile?.role !== 'admin') {
        router.push('/');
        return;
      }
      // If they are an admin and are on the login page, send them to the dashboard
      if (pathname === '/admin') {
        router.push('/admin/dashboard');
        return;
      }
    } else {
      // If loading is done, and there is no user, redirect to the login page (unless they are already there)
      if (pathname !== '/admin') {
        router.push('/admin');
        return;
      }
    }
  }, [user, userProfile, isLoading, router, pathname]);
  
  // Render the login page immediately without the layout if the user is not logged in and on the login page
  if (!isLoading && !user && pathname === '/admin') {
    return <>{children}</>;
  }
  
  // Show a loading screen while we verify the user's role or redirect
  if (isLoading || (user && userProfile?.role !== 'admin') || (!user && pathname !== '/admin')) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  // Only render the full admin layout if user is a confirmed admin
  if (user && userProfile?.role === 'admin') {
    return (
      <div className="flex h-screen overflow-hidden bg-slate-100 dark:bg-slate-900/40">
          <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className={cn(
              "relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden transition-all duration-300",
              sidebarOpen && !isMobile ? "lg:ml-64" : "ml-0"
          )}>
              <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
              <main className="flex-1 p-4 sm:p-6 lg:p-8">
                  {children}
              </main>
          </div>
      </div>
    );
  }

  // Fallback for any edge cases, render login page
  return <>{children}</>;
}
