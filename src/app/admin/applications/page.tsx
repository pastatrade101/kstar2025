'use client';

import { useFirestore, useCollection, deleteDocumentNonBlocking, updateDocumentNonBlocking, useUser, useDoc } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { useMemoFirebase } from '@/firebase/provider';
import { Loader2, Trash2, Users, Download, Briefcase, ExternalLink, FileText, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';
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
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type ApplicationStatus = 'Pending' | 'Received' | 'Whitelisted' | 'Not Selected';

type UserProfile = {
    role: 'admin' | 'user';
};

type JobApplication = {
  id: string;
  jobId: string;
  jobTitle: string;
  userName: string;
  userEmail: string;
  phone?: string;
  coverLetter: string;
  submittedAt: {
    seconds: number;
    nanoseconds: number;
  } | null;
  status: ApplicationStatus;
};

const statusColors: Record<ApplicationStatus, string> = {
    Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    Received: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    Whitelisted: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    'Not Selected': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  };

export default function JobApplicationsPage() {
  const firestore = useFirestore();
  const { user } = useUser();
  
  const userProfileRef = useMemoFirebase(
    () => (firestore && user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  const isAdmin = userProfile?.role === 'admin';

  const applicationsCollectionRef = useMemoFirebase(
    () => (firestore && isAdmin ? collection(firestore, 'job_applications') : null),
    [firestore, isAdmin]
  );

  const applicationsQuery = useMemoFirebase(
    () =>
      applicationsCollectionRef
        ? query(applicationsCollectionRef, orderBy('submittedAt', 'desc'))
        : null,
    [applicationsCollectionRef]
  );

  const { data: applications, isLoading: isLoadingApplications, error } = useCollection<JobApplication>(applicationsQuery);

  const handleDelete = (id: string) => {
    if (!firestore) return;
    const itemRef = doc(firestore, 'job_applications', id);
    deleteDocumentNonBlocking(itemRef);
  };
  
  const handleStatusChange = (id: string, status: ApplicationStatus) => {
    if (!firestore) return;
    const itemRef = doc(firestore, 'job_applications', id);
    updateDocumentNonBlocking(itemRef, { status });
  };

  const isLoading = isProfileLoading || (isAdmin && isLoadingApplications);

  return (
    <Card className='dark:bg-slate-900 dark:border-slate-800'>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Briefcase />
                Job Applications
            </CardTitle>
            <CardDescription>A list of all submitted job applications.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow className='dark:border-slate-800'>
                        <TableHead>Applicant Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Applied For</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Cover Letter</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading && (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center h-48">
                                <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                            </TableCell>
                        </TableRow>
                    )}
                    {error && (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-red-500">
                                Error loading applications: {error.message}
                            </TableCell>
                        </TableRow>
                    )}
                    {!isLoading && (!applications || applications.length === 0) && (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-muted-foreground h-48">
                                No applications found.
                            </TableCell>
                        </TableRow>
                    )}
                    {applications?.map((item) => (
                        <TableRow key={item.id} className='dark:border-slate-800'>
                            <TableCell className="font-medium">{item.userName}</TableCell>
                            <TableCell>
                                <div>{item.userEmail}</div>
                                {item.phone && <div className="text-muted-foreground text-xs">{item.phone}</div>}
                            </TableCell>
                            <TableCell>
                                <Link href={`/careers/${item.jobId}`} target="_blank" className="hover:underline flex items-center gap-1">
                                    {item.jobTitle}
                                    <ExternalLink className="h-3 w-3" />
                                </Link>
                            </TableCell>
                            <TableCell>
                                {item.submittedAt ? format(new Date(item.submittedAt.seconds * 1000), 'PPP') : 'N/A'}
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className={`text-xs h-7 px-2 font-semibold ${statusColors[item.status]}`}>
                                        {item.status}
                                        <ChevronDown className="h-3 w-3 ml-1" />
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                    {Object.keys(statusColors).map((status) => (
                                        <DropdownMenuItem
                                        key={status}
                                        onSelect={() => handleStatusChange(item.id, status as ApplicationStatus)}
                                        >
                                        <Badge className={`mr-2 ${statusColors[status as ApplicationStatus]}`}>{status}</Badge>
                                        </DropdownMenuItem>
                                    ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm">
                                            <FileText className="mr-2 h-4 w-4" />
                                            View Letter
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[625px]">
                                        <DialogHeader>
                                        <DialogTitle>Cover Letter from {item.userName}</DialogTitle>
                                        <DialogDescription>
                                            Application for {item.jobTitle}
                                        </DialogDescription>
                                        </DialogHeader>
                                        <div className="prose dark:prose-invert prose-sm max-h-[60vh] overflow-y-auto whitespace-pre-wrap p-1">
                                            <p>{item.coverLetter}</p>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                            <TableCell className="text-right">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                            <span className="sr-only">Delete</span>
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will permanently delete this application. This action cannot be undone.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(item.id)} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  );
}