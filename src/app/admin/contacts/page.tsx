'use client';

import { useState, useEffect } from 'react';
import { useFirestore, useCollection, deleteDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { useMemoFirebase } from '@/firebase/provider';
import { Loader2, Inbox, Mail, User, Search, File, Archive, Trash2, Star, Edit, ChevronDown, Clock, CheckCircle2, Send, X } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';


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
  starred?: boolean;
  isRead?: boolean;
};

export default function ContactsPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
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
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  
  const handleSelectSubmission = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    if (!submission.isRead && firestore) {
        const itemRef = doc(firestore, 'contact_submissions', submission.id);
        updateDocumentNonBlocking(itemRef, { isRead: true });
    }
  };

  useEffect(() => {
    if (submissions && submissions.length > 0 && !selectedSubmission) {
      handleSelectSubmission(submissions[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissions, selectedSubmission]);

  const handleDelete = () => {
    if (!firestore || !selectedSubmission) return;

    const itemRef = doc(firestore, 'contact_submissions', selectedSubmission.id);
    deleteDocumentNonBlocking(itemRef);

    // After deleting, select the next submission or clear the view
    if (submissions) {
        const currentIndex = submissions.findIndex(s => s.id === selectedSubmission.id);
        if (submissions.length > 1) {
            // Select next or previous
            const nextIndex = currentIndex === 0 ? 1 : currentIndex -1;
            setSelectedSubmission(submissions[nextIndex]);
        } else {
            // Last one was deleted
            setSelectedSubmission(null);
        }
    }
  };

  const handleCompose = () => {
    setComposeTo('');
    setComposeSubject('');
    setIsComposeOpen(true);
  };
  
  const handleReply = () => {
    if (!selectedSubmission) return;
    setComposeTo(selectedSubmission.email);
    setComposeSubject(`Re: ${selectedSubmission.subject}`);
    setIsComposeOpen(true);
  };

  const handleSendEmail = () => {
    // This is a simulation. In a real app, you'd use an email service.
    toast({
      title: 'Message Sent!',
      description: 'Your reply has been sent successfully.',
    });
    setIsComposeOpen(false);
  };
  
  const handleToggleStar = (e: React.MouseEvent, submission: ContactSubmission) => {
    e.stopPropagation();
    if (!firestore) return;
    const itemRef = doc(firestore, 'contact_submissions', submission.id);
    const newStarredStatus = !submission.starred;
    updateDocumentNonBlocking(itemRef, { starred: newStarredStatus });

    // Update local state immediately for better UX
    if (selectedSubmission?.id === submission.id) {
        setSelectedSubmission(prev => prev ? { ...prev, starred: newStarredStatus } : null);
    }
  };


  const getInitials = (name: string) => {
    if (!name) return '?';
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
  const unreadCount = submissions?.filter(s => !s.isRead).length ?? 0;
  const repliedCount = 0; 
  const pendingCount = totalSubmissions;


  return (
    <>
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
              <Button variant="outline" className='w-full' onClick={handleCompose}>
                <Edit className="h-4 w-4 mr-2"/>
                Compose
              </Button>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-2">
                <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-2 text-accent-foreground bg-accent">
                  <Inbox className="h-4 w-4" />
                  <span>Inbox</span>
                  {unreadCount > 0 && <Badge variant="default" className="ml-auto">{unreadCount}</Badge>}
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
                      onClick={() => handleSelectSubmission(submission)}
                      className={cn(
                        'w-full text-left p-4 border-b hover:bg-accent transition-colors cursor-pointer',
                        selectedSubmission?.id === submission.id && 'bg-accent text-accent-foreground'
                      )}
                    >
                    <div className="flex items-start gap-4">
                      <div className='flex items-center gap-2 mt-1'>
                        <Checkbox checked={selectedSubmission?.id === submission.id} />
                        <button onClick={(e) => handleToggleStar(e, submission)}>
                            <Star className={cn('size-4', submission.starred ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground hover:text-foreground')} />
                        </button>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <span className={cn("font-semibold truncate", !submission.isRead && "text-foreground")}>{submission.name}</span>
                            {!submission.isRead && <div className={cn('size-2 rounded-full shrink-0', selectedSubmission?.id === submission.id ? 'bg-accent-foreground' : 'bg-primary')} />}
                            <span className={cn('text-xs ml-auto shrink-0', selectedSubmission?.id === submission.id ? 'text-accent-foreground/80' : 'text-muted-foreground')}>{formatDate(submission.submittedAt)}</span>
                          </div>

                          <div className={cn("text-sm font-medium mb-2 truncate", !submission.isRead && "text-foreground")}>
                            {submission.subject}
                          </div>
                          
                          <p className={cn('text-sm line-clamp-2', selectedSubmission?.id === submission.id ? 'text-accent-foreground/80' : 'text-muted-foreground', !submission.isRead && 'text-foreground/80')}>
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
                  <Button size="icon" variant="ghost" onClick={(e) => handleToggleStar(e, selectedSubmission)}> 
                    <Star className={cn('size-4', selectedSubmission.starred ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground')} />
                  </Button>
                  <Button size="icon" variant="ghost"> <Archive className="h-4 w-4"/> </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete this message
                          and remove the data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
                          <p className='font-semibold text-foreground'>{selectedSubmission.name}</p>
                          <p className="text-sm text-muted-foreground">to <span className="font-medium text-foreground">me</span> &lt;{selectedSubmission.email}&gt;</p>
                        </div>
                        <div className="text-sm text-foreground">
                          {selectedSubmission.submittedAt && format(new Date(selectedSubmission.submittedAt.seconds * 1000), "MMM d, yyyy, h:mm a")}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="prose-lg max-w-none">
                    <p className="whitespace-pre-wrap text-foreground">{selectedSubmission.message}</p>
                  </div>

                </div>
              </ScrollArea>
              <div className="p-4 border-t bg-background/80">
                <div className="max-w-4xl mx-auto flex items-center gap-2">
                  <Button variant="outline" onClick={handleReply}>Reply</Button>
                  <Button variant="outline">Forward</Button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>Compose Message</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="to" className="text-right">
                To
              </Label>
              <Input id="to" value={composeTo} onChange={(e) => setComposeTo(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input id="subject" value={composeSubject} onChange={(e) => setComposeSubject(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <Textarea placeholder="Type your message here." className="min-h-[200px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsComposeOpen(false)}>Cancel</Button>
            <Button onClick={handleSendEmail}>Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
