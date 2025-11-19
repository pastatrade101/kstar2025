'use client';

import { useState } from 'react';
import { useFirestore, useCollection, useUser } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { useMemoFirebase } from '@/firebase/provider';
import { Loader2, Inbox, Mail, User, Clock, ChevronRight } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

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
  const { isUserLoading } = useUser();
  const firestore = useFirestore();
  const submissionsCollectionRef = useMemoFirebase(
    () => collection(firestore, 'contact_submissions'),
    [firestore]
  );
  const submissionsQuery = useMemoFirebase(
    () => query(submissionsCollectionRef, orderBy('submittedAt', 'desc')),
    [submissionsCollectionRef]
  );

  const { data: submissions, isLoading: isLoadingSubmissions, error } = useCollection<ContactSubmission>(submissionsQuery);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  if (isUserLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

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
    <div className="min-h-screen bg-muted/40">
      <div className="h-screen flex flex-col">
        <header className="p-4 border-b bg-background">
          <h1 className="font-headline text-2xl font-bold flex items-center gap-2">
            <Inbox /> Contact Submissions
          </h1>
        </header>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 overflow-hidden">
          <aside className="md:col-span-1 lg:col-span-1 border-r overflow-y-auto">
            <ScrollArea className="h-full">
              {isLoadingSubmissions && (
                <div className="p-4 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                </div>
              )}
              {error && <div className="p-4 text-destructive">Error: {error.message}</div>}
              {!isLoadingSubmissions && submissions?.length === 0 && (
                <div className="p-4 text-center text-muted-foreground">No submissions yet.</div>
              )}
              <ul>
                {submissions?.map((submission, index) => (
                  <li key={submission.id}>
                    <button
                      className={cn(
                        'w-full text-left p-4 hover:bg-accent transition-colors',
                        selectedSubmission?.id === submission.id && 'bg-accent'
                      )}
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      <div className='flex justify-between items-start'>
                        <p className="font-semibold text-sm">{submission.name}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(submission.submittedAt)}</p>
                      </div>
                      <p className="text-sm font-medium truncate">{submission.subject}</p>
                      <p className="text-xs text-muted-foreground truncate">{submission.email}</p>
                    </button>
                    {index < submissions.length - 1 && <Separator />}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </aside>

          <main className="md:col-span-2 lg:col-span-3 overflow-y-auto">
            <ScrollArea className="h-full">
              {selectedSubmission ? (
                <div className="p-4 md:p-8">
                  <header className="flex items-start gap-4 mb-8">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{getInitials(selectedSubmission.name)}</AvatarFallback>
                    </Avatar>
                    <div className='flex-1'>
                      <h2 className="font-bold text-2xl">{selectedSubmission.subject}</h2>
                      <div className='text-sm text-muted-foreground flex items-center gap-4'>
                          <div className='flex items-center gap-1.5'>
                              <User className='h-4 w-4'/>
                              <span>{selectedSubmission.name}</span>
                          </div>
                           <a href={`mailto:${selectedSubmission.email}`} className='flex items-center gap-1.5 hover:underline'>
                              <Mail className='h-4 w-4'/>
                              <span>{selectedSubmission.email}</span>
                          </a>
                      </div>
                    </div>
                     <div className='text-right text-sm text-muted-foreground'>
                         {selectedSubmission.submittedAt && (
                          <>
                            <div>{format(new Date(selectedSubmission.submittedAt.seconds * 1000), "PPP")}</div>
                            <div>{format(new Date(selectedSubmission.submittedAt.seconds * 1000), "p")}</div>
                          </>
                         )}
                     </div>
                  </header>
                  <Separator className='my-6' />
                  <div className="prose dark:prose-invert max-w-none text-foreground/90 whitespace-pre-wrap leading-relaxed">
                    {selectedSubmission.message}
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <div className='text-center'>
                    <Inbox className="h-16 w-16 mx-auto mb-4" />
                    <p>Select a submission to read</p>
                  </div>
                </div>
              )}
            </ScrollArea>
          </main>
        </div>
      </div>
    </div>
  );
}