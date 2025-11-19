'use client';

import { useState, useEffect } from 'react';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { useMemoFirebase } from '@/firebase/provider';
import { Loader2, Inbox, Mail, User, Search, File, Archive, Trash2, Star, Edit, ChevronDown, Clock, CheckCircle2, Send } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';


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
  
  const totalSubmissions = submissions?.length ?? 0;
  // These would be calculated fields in a real app
  const repliedCount = 0; 
  const pendingCount = totalSubmissions;


  return (
    <div className="h-screen flex flex-row bg-muted/20 antialiased">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-background flex flex-col h-full">
         <div className="p-4 border-b">
           <div className='flex items-center justify-between'>
            <h2 className="font-headline text-xl font-bold flex items-center gap-2">
              Inbox
            </h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <ChevronDown className="h-4 w-4" />
            </Button>
           </div>
          </div>

          <div className="p-2 border-b">
            <Button variant="outline" className='w-full'>
              <Edit className="h-4 w-4 mr-2"/>
              Compose
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-2">
              <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-2 text-primary bg-primary/10">
                <Inbox className="h-4 w-4" />
                <span>Inbox</span>
                {totalSubmissions > 0 && <Badge variant="default" className="ml-auto">{totalSubmissions}</Badge>}
              </Button>
               <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-2">
                <Star className="h-4 w-4" />
                <span>Starred</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-2">
                <Send className="h-4 w-4" />
                <span>Sent</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-2">
                <File className="h-4 w-4" />
                <span>Drafts</span>
              </Button>
               <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-2">
                <Archive className="h-4 w-4" />
                <span>Archive</span>
              </Button>
               <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-2">
                <Trash2 className="h-4 w-4" />
                <span>Trash</span>
              </Button>
            </div>
             <div className="p-4 pt-2">
              <div className="text-xs text-muted-foreground mb-2 font-semibold tracking-wider">STATS</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="size-3" />
                    <span>Total</span>
                  </div>
                  <span className="font-medium">{totalSubmissions}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="size-3" />
                    <span>Replied</span>
                  </div>
                  <span className="font-medium">{repliedCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="size-3" />
                    <span>Pending</span>
                  </div>
                  <span className="font-medium">{pendingCount}</span>
                </div>
              </div>
            </div>
          </ScrollArea>
        </aside>

      {/* Message List */}
      <div className="w-96 border-r bg-background/80 flex flex-col h-full">
         <div className="p-4 border-b">
            <h1 className="font-headline text-lg font-bold flex items-center justify-between mb-4">
              <span>All Messages</span>
              <span className='text-sm font-medium text-muted-foreground'>{totalSubmissions} messages</span>
            </h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-9" />
            </div>
             <div className="flex gap-2 mt-3">
              <Badge variant="secondary" className="cursor-pointer">All</Badge>
              <Badge variant="outline" className="cursor-pointer">Unread</Badge>
              <Badge variant="outline" className="cursor-pointer">Starred</Badge>
            </div>
          </div>
          <ScrollArea className="flex-1">
              {isLoadingSubmissions && (
                <div className="p-4 text-center grid place-content-center h-full">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                </div>
              )}
              {error && <div className="p-4 text-destructive">Error: {error.message}</div>}
              {!isLoadingSubmissions && totalSubmissions === 0 && (
                <div className="p-4 text-center text-muted-foreground grid place-content-center h-full">
                  <p>No submissions yet.</p>
                </div>
              )}
              <div>
                {submissions?.map((submission) => (
                  <div
                    key={submission.id}
                    onClick={() => setSelectedSubmission(submission)}
                    className={cn(
                      'w-full text-left p-4 border-b hover:bg-accent transition-colors cursor-pointer',
                      selectedSubmission?.id === submission.id && 'bg-accent text-accent-foreground'
                    )}
                  >
                  <div className="flex items-start gap-4">
                    <Checkbox checked={selectedSubmission?.id === submission.id} className="mt-1" />
                    <div className="flex-1 min-w-0">
                       <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold truncate">{submission.name}</span>
                          <div className={cn('size-2 rounded-full shrink-0', selectedSubmission?.id === submission.id ? 'bg-accent-foreground' : 'bg-primary')} />
                          <span className={cn('text-xs ml-auto shrink-0', selectedSubmission?.id === submission.id ? 'text-accent-foreground/80' : 'text-muted-foreground')}>{formatDate(submission.submittedAt)}</span>
                        </div>

                        <div className="text-sm font-medium mb-2 truncate">
                          {submission.subject}
                        </div>
                        
                        <p className={cn('text-sm line-clamp-2', selectedSubmission?.id === submission.id ? 'text-accent-foreground/80' : 'text-muted-foreground')}>
                          {submission.message}
                        </p>
                    </div>
                  </div>
                  </div>
                ))}
              </div>
          </ScrollArea>
      </div>

      {/* Main Content */}
      <main className="overflow-y-auto bg-white flex flex-col flex-1">
        {isLoadingSubmissions && !selectedSubmission && (
           <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
        {!isLoadingSubmissions && !selectedSubmission ? (
            <div className="flex-1 flex items-center justify-center bg-muted/50">
            <div className="text-center text-muted-foreground">
              <Inbox className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Select a message</h3>
              <p>Choose a conversation from the list to view its content.</p>
            </div>
          </div>
        ) : selectedSubmission && (
          <>
            <header className="p-4 border-b flex items-center justify-between bg-background/80">
              <h3 className='font-semibold text-lg truncate'>{selectedSubmission.subject}</h3>
               <div className="flex items-center gap-1">
                <Button size="icon" variant="ghost"> <Star className="h-4 w-4"/> </Button>
                <Button size="icon" variant="ghost"> <Archive className="h-4 w-4"/> </Button>
                <Button size="icon" variant="ghost"> <Trash2 className="h-4 w-4"/> </Button>
               </div>
            </header>

            <ScrollArea className="flex-1 p-6">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-start gap-4">
                  <Avatar className="size-12">
                    <AvatarFallback>{getInitials(selectedSubmission.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className='font-semibold'>{selectedSubmission.name}</p>
                        <p className="text-sm text-muted-foreground">to <span className="font-medium text-foreground">me</span></p>
                      </div>
                      <div className="text-sm text-foreground">
                        {selectedSubmission.submittedAt && format(new Date(selectedSubmission.submittedAt.seconds * 1000), "MMM d, yyyy, h:mm a")}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="prose max-w-none text-foreground text-base">
                  <p className="whitespace-pre-wrap">{selectedSubmission.message}</p>
                </div>

              </div>
            </ScrollArea>
             <div className="p-4 border-t bg-background/80">
              <div className="max-w-4xl mx-auto flex items-center gap-2">
                <Button variant="outline">Reply</Button>
                <Button variant="outline">Forward</Button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
