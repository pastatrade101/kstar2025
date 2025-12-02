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

  useEffect(() => {
    const isLoading = isUserLoading || isProfileLoading;
    
    if (isLoading) {
      return;
    }
    
    if (!user && pathname !== '/admin') {
      router.push('/admin');
      return;
    }

    if (user && userProfile?.role !== 'admin') {
      router.push('/');
    }

    if (user && userProfile?.role === 'admin' && pathname === '/admin') {
        router.push('/admin/dashboard');
    }

  }, [user, userProfile, isUserLoading, isProfileLoading, router, pathname]);

  const isLoading = isUserLoading || (user && isProfileLoading);
  
  if (pathname === '/admin') {
    return <>{children}</>;
  }
  
  if (isLoading || !user || userProfile?.role !== 'admin') {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }
  
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
