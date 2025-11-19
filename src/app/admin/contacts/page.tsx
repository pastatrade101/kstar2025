'use client';

import { useState } from 'react';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { useMemoFirebase } from '@/firebase/provider';
import { Loader2, Inbox, Mail, User } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
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

  // Effect to select the first submission once data loads
  useState(() => {
    if (submissions && submissions.length > 0 && !selectedSubmission) {
      setSelectedSubmission(submissions[0]);
    }
  });

  return (
    <div className="h-screen flex flex-col bg-muted/20 antialiased">
      <div className="flex-1 grid grid-cols-[320px_1fr] overflow-hidden">
        {/* Sidebar */}
        <aside className="border-r bg-background flex flex-col">
          <div className="p-4 border-b">
            <h1 className="font-headline text-2xl font-bold flex items-center gap-2">
              <Inbox /> Inbox
            </h1>
            <p className='text-muted-foreground text-sm'>{submissions?.length ?? 0} messages</p>
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
                    <div className='flex justify-between items-start mb-1'>
                      <p className="font-semibold text-sm truncate">{submission.name}</p>
                      <p className="text-xs text-muted-foreground shrink-0">{formatDate(submission.submittedAt)}</p>
                    </div>
                    <p className="text-sm font-medium truncate">{submission.subject}</p>
                    <p className="text-xs text-muted-foreground truncate">{submission.email}</p>
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
              <header className="p-4 border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
                <div className='flex items-start gap-4'>
                    <Avatar className="h-11 w-11">
                      <AvatarFallback>{getInitials(selectedSubmission.name)}</AvatarFallback>
                    </Avatar>
                    <div className='flex-1'>
                      <h2 className="font-bold text-lg">{selectedSubmission.subject}</h2>
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
                     <div className='text-right text-xs text-muted-foreground shrink-0'>
                         {selectedSubmission.submittedAt && (
                          <>
                            <div>{format(new Date(selectedSubmission.submittedAt.seconds * 1000), "PPP")}</div>
                            <div>{format(new Date(selectedSubmission.submittedAt.seconds * 1000), "p")}</div>
                          </>
                         )}
                     </div>
                </div>
              </header>
              <ScrollArea className="flex-1">
                <div className="p-8">
                  <Card>
                    <CardContent className="p-6">
                      <div className="prose dark:prose-invert max-w-none text-foreground/90 whitespace-pre-wrap leading-relaxed">
                        {selectedSubmission.message}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <div className='text-center'>
                <Inbox className="h-16 w-16 mx-auto mb-4" />
                <p>Select a submission to read</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
