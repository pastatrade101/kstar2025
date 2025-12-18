
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

  const isLoading = isUserLoading || isProfileLoading;
  const isAdmin = userProfile?.role === 'admin';

  useEffect(() => {
    // Wait until all loading is complete before making routing decisions
    if (isLoading) {
      return;
    }

    if (!user) {
      // Not logged in, redirect to login page if not already there
      if (pathname !== '/admin') {
        router.push('/admin');
      }
    } else {
      // User is logged in
      if (!isAdmin) {
        // Logged in but not an admin, redirect to home page
        router.push('/');
      } else {
        // User is an admin, if they are on the base /admin route, move them to dashboard
        if (pathname === '/admin') {
          router.push('/admin/dashboard');
        }
      }
    }
  }, [user, isAdmin, isLoading, router, pathname]);

  // Render the login page immediately if the path is /admin and the user isn't loaded yet
  // or if they are definitively not an admin (prevents flashing the layout)
  if (pathname === '/admin' && (!user || !isAdmin)) {
    // If we're on the login page and still loading, or the user is not an admin,
    // show the login page content.
    if (isLoading && !user) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
                <Loader2 className="h-12 w-12 animate-spin" />
            </div>
        );
    }
    return <>{children}</>;
  }
  
  // Show a global loading screen while we verify auth, to prevent layout flicker
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  // If all checks pass and user is an admin, render the full admin layout
  if (user && isAdmin) {
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

  // Fallback for edge cases, might show loader or redirect will trigger
  return (
    <div className="flex h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
      <Loader2 className="h-12 w-12 animate-spin" />
    </div>
  );
}
