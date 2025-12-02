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
    
    // If no user is logged in AND they are trying to access a protected admin page
    if (!user && pathname !== '/admin') {
      router.push('/admin'); // Redirect to the admin login page specifically
      return;
    }

    // If a user is logged in but is not an admin, redirect them away from any admin page
    if (user && userProfile?.role !== 'admin' && pathname.startsWith('/admin')) {
      router.push('/');
    }

    // If an admin user is logged in and on the /admin page, redirect to dashboard
    if (user && userProfile?.role === 'admin' && pathname === '/admin') {
        router.push('/admin/dashboard');
    }

  }, [user, userProfile, isUserLoading, isProfileLoading, router, pathname]);

  const isLoading = isUserLoading || (user && isProfileLoading);
  
  // If we're on a protected admin page, and we're still loading or the user isn't an admin, show a spinner.
  if (pathname !== '/admin' && (isLoading || !user || userProfile?.role !== 'admin')) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }
  
  // Render the children (which will be the admin login page for `/admin`, or the dashboard etc. for other routes)
  return <>{children}</>;
}
