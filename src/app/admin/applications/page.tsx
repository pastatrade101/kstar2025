'use client';

import { useFirestore, useCollection, deleteDocumentNonBlocking } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { useMemoFirebase } from '@/firebase/provider';
import { Loader2, Trash2, Users, Download, Briefcase, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
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

type JobApplication = {
  id: string;
  jobId: string;
  jobTitle: string;
  userName: string;
  userEmail: string;
  phone?: string;
  resumeUrl: string;
  submittedAt: {
    seconds: number;
    nanoseconds: number;
  } | null;
};

export default function JobApplicationsPage() {
  const firestore = useFirestore();
  const applicationsCollectionRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'job_applications') : null),
    [firestore]
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
                        <TableHead>Submitted On</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoadingApplications && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center h-48">
                                <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                            </TableCell>
                        </TableRow>
                    )}
                    {error && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-red-500">
                                Error loading applications: {error.message}
                            </TableCell>
                        </TableRow>
                    )}
                    {!isLoadingApplications && applications && applications.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-muted-foreground h-48">
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
                                <Button asChild variant="outline" size="sm">
                                    <a href={item.resumeUrl} target="_blank" rel="noopener noreferrer">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download
                                    </a>
                                </Button>
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

    