'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import { useAuth, useUser } from '@/firebase';
  import { useRouter } from 'next/navigation';
  import { useEffect } from 'react';
  import { Button } from '@/components/ui/button';
  import { Loader2, LogOut, ArrowRight, Inbox } from 'lucide-react';
  import Link from 'next/link';
  
  export default function AdminDashboardPage() {
    const { user, isUserLoading } = useUser();
    const auth = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (!isUserLoading && !user) {
        router.push('/admin');
      }
    }, [user, isUserLoading, router]);
  
    if (isUserLoading || !user) {
      return (
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin" />
        </div>
      );
    }
  
    const handleSignOut = () => {
      auth.signOut();
    };
  
    return (
      <div className="min-h-screen bg-muted/40 p-4 md:p-8">
        <header className="flex items-center justify-between mb-8">
            <div>
                <h1 className="font-headline text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Welcome, {user.email}</p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
            </Button>
        </header>

        <main className='grid md:grid-cols-2 gap-8'>
          <Card>
            <CardHeader>
              <CardTitle>Manage News & Events</CardTitle>
              <CardDescription>
                Create, edit, and delete news and events.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/admin/news">
                    Manage News & Events
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>View Contact Submissions</CardTitle>
              <CardDescription>
                Read and manage messages from your website visitors.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/admin/contacts">
                    View Submissions
                    <Inbox className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }