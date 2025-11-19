'use client';

import { useState, useEffect } from 'react';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { useMemoFirebase } from '@/firebase/provider';
import { Loader2, Inbox, Mail, User, Search } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: {
    seconds: number;
    nanoseconds: number;
  } | null;
};

export default function ContactsPage() {
  const firestore = useFirestore();
  const submissionsCollectionRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'contact_submissions') : null),
    [firestore]
  );
  const submissionsQuery = useMemoFirebase(
    () =>
      submissionsCollectionRef
        ? query(submissionsCollectionRef, orderBy('submittedAt', 'desc'))
        : null,
    [submissionsCollectionRef]
  );

  const { data: submissions, isLoading: isLoadingSubmissions, error } = useCollection<ContactSubmission>(submissionsQuery);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    if (submissions && submissions.length > 0 && !selectedSubmission) {
      setSelectedSubmission(submissions[0]);
    }
  }, [submissions, selectedSubmission]);

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name[0]?.toUpperCase() || '?';
  }

  const formatDate = (timestamp: ContactSubmission['submittedAt']) => {
    if (!timestamp) return 'No date';
    const date = new Date(timestamp.seconds * 1000);
    return formatDistanceToNow(date, { addSuffix: true });
  }

  return (
    <div className="h-screen flex flex-col bg-muted/20 antialiased">
      <div className="flex-1 grid grid-cols-[320px_1fr] overflow-hidden">
        {/* Sidebar */}
        <aside className="border-r bg-background flex flex-col">
           <div className="p-4 border-b">
            <h1 className="font-headline text-2xl font-bold flex items-center gap-2 mb-4">
              Messages
            </h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-9" />
            </div>
          </div>
           <div className="flex gap-2 p-2 border-b">
            <Button variant="default" size="sm" className="flex-1">
              All
            </Button>
            <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground">
              Groups
            </Button>
          </div>

          <ScrollArea className="flex-1">
            {isLoadingSubmissions && (
              <div className="p-4 text-center grid place-content-center h-full">
                <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
              </div>
            )}
            {error && <div className="p-4 text-destructive">Error: {error.message}</div>}
            {!isLoadingSubmissions && submissions?.length === 0 && (
              <div className="p-4 text-center text-muted-foreground grid place-content-center h-full">
                <p>No submissions yet.</p>
              </div>
            )}
            <ul className='p-2'>
              {submissions?.map((submission) => (
                <li key={submission.id}>
                  <button
                    className={cn(
                      'w-full text-left p-3 hover:bg-accent transition-colors rounded-lg',
                      selectedSubmission?.id === submission.id && 'bg-accent'
                    )}
                    onClick={() => setSelectedSubmission(submission)}
                  >
                   <div className="flex items-start gap-3">
                     <Avatar className="size-12">
                        <AvatarFallback>{getInitials(submission.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold truncate">{submission.name}</span>
                          <span className="text-xs text-muted-foreground ml-2 shrink-0">{formatDate(submission.submittedAt)}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {submission.subject}
                        </p>
                      </div>
                   </div>
                  </button>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="overflow-y-auto bg-white flex flex-col">
          {selectedSubmission ? (
            <>
               <header className="p-4 border-b flex items-center justify-between bg-background">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="size-11">
                      <AvatarFallback>{getInitials(selectedSubmission.name)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-background" />
                  </div>
                  <div>
                    <h3 className='font-semibold'>{selectedSubmission.name}</h3>
                    <p className="text-sm text-muted-foreground">Online</p>
                  </div>
                </div>
              </header>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4 max-w-4xl mx-auto">
                    <div className="flex gap-3 flex-row">
                      <Avatar className="size-8 shrink-0">
                        <AvatarFallback>{getInitials(selectedSubmission.name)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex flex-col items-start max-w-[70%]">
                        <div className="rounded-2xl px-4 py-2 bg-accent">
                          <p className='font-semibold mb-2'>{selectedSubmission.subject}</p>
                          <p>{selectedSubmission.message}</p>
                        </div>
                         {selectedSubmission.submittedAt && (
                           <span className="text-xs text-muted-foreground mt-1">{format(new Date(selectedSubmission.submittedAt.seconds * 1000), "p")}</span>
                         )}
                      </div>
                    </div>
                </div>
              </ScrollArea>
            </>
          ) : (
             <div className="flex-1 flex items-center justify-center bg-muted/50">
              <div className="text-center text-muted-foreground">
                <Inbox className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Select a message</h3>
                <p>Choose a conversation from the left to start viewing messages.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}