
'use client';

import { useState, useEffect } from 'react';
import { useFirestore, useCollection, deleteDocumentNonBlocking, updateDocumentNonBlocking, useUser, useDoc } from '@/firebase';
import { collection, query, orderBy, doc, writeBatch } from 'firebase/firestore';
import { useMemoFirebase } from '@/firebase/provider';
import { Loader2, Trash2, Briefcase, ExternalLink, FileText, ChevronDown, Link as LinkIcon, FileJson, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
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
import { Checkbox } from '@/components/ui/checkbox';

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
  linkedinUrl?: string;
  cvUrl?: string;
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

const ITEMS_PER_PAGE = 10;

export default function JobApplicationsPage() {
  const firestore = useFirestore();
  const { user } = useUser();

  // State for pagination and selection
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  
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

  // Pagination logic
  const paginatedApplications = applications?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = applications ? Math.ceil(applications.length / ITEMS_PER_PAGE) : 0;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const handleStatusChange = (id: string, status: ApplicationStatus) => {
    if (!firestore) return;
    const itemRef = doc(firestore, 'job_applications', id);
    updateDocumentNonBlocking(itemRef, { status });
  };

  // Bulk actions
  const handleBulkDelete = () => {
    if (!firestore || selectedRows.length === 0) return;
    const batch = writeBatch(firestore);
    selectedRows.forEach(id => {
        const itemRef = doc(firestore, 'job_applications', id);
        batch.delete(itemRef);
    });
    batch.commit().then(() => setSelectedRows([]));
  };
  
  const handleBulkStatusChange = (status: ApplicationStatus) => {
    if (!firestore || selectedRows.length === 0) return;
    const batch = writeBatch(firestore);
    selectedRows.forEach(id => {
        const itemRef = doc(firestore, 'job_applications', id);
        batch.update(itemRef, { status });
    });
    batch.commit().then(() => setSelectedRows([]));
  };
  
  // Selection logic
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(paginatedApplications?.map(app => app.id) || []);
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    setSelectedRows([]); // Clear selection when page changes
  }, [currentPage]);


  const isLoading = isProfileLoading || (isAdmin && isLoadingApplications);

  return (
    <Card className='dark:bg-slate-900 dark:border-slate-800'>
        <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <CardTitle className="flex items-center gap-2">
                        <Briefcase />
                        Job Applications
                    </CardTitle>
                    <CardDescription>A list of all submitted job applications.</CardDescription>
                </div>
                {selectedRows.length > 0 && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Bulk Actions ({selectedRows.length})
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                        {Object.keys(statusColors).map((status) => (
                            <DropdownMenuItem key={status} onSelect={() => handleBulkStatusChange(status as ApplicationStatus)}>
                            Set to {status}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/40 dark:focus:text-red-500">
                                    Delete Selected
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently delete {selectedRows.length} application(s). This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleBulkDelete} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </CardHeader>
        <CardContent>
            <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow className='dark:border-slate-800'>
                        <TableHead className="w-[80px]">
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    checked={selectedRows.length > 0 && paginatedApplications?.length > 0 && selectedRows.length === paginatedApplications?.length}
                                    onCheckedChange={handleSelectAll}
                                />
                                #
                            </div>
                        </TableHead>
                        <TableHead>Applicant</TableHead>
                        <TableHead>Applied For</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Documents</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading && (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center h-48">
                                <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                            </TableCell>
                        </TableRow>
                    )}
                    {error && (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center text-red-500">
                                Error loading applications: {error.message}
                            </TableCell>
                        </TableRow>
                    )}
                    {!isLoading && (!paginatedApplications || paginatedApplications.length === 0) && (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center text-muted-foreground h-48">
                                No applications found.
                            </TableCell>
                        </TableRow>
                    )}
                    {paginatedApplications?.map((item, index) => (
                        <TableRow key={item.id} className='dark:border-slate-800' data-state={selectedRows.includes(item.id) && 'selected'}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                <Checkbox
                                    checked={selectedRows.includes(item.id)}
                                    onCheckedChange={() => handleRowSelect(item.id)}
                                />
                                {startIndex + index + 1}
                                </div>
                            </TableCell>
                            <TableCell className="font-medium align-top">
                                <div>{item.userName}</div>
                                <div className="text-muted-foreground text-xs">{item.userEmail}</div>
                                {item.phone && <div className="text-muted-foreground text-xs">{item.phone}</div>}
                            </TableCell>
                            <TableCell className="align-top">
                                <Link href={`/careers/${item.jobId}`} target="_blank" className="hover:underline flex items-center gap-1">
                                    {item.jobTitle}
                                    <ExternalLink className="h-3 w-3" />
                                </Link>
                            </TableCell>
                            <TableCell className="align-top">
                                {item.submittedAt ? format(new Date(item.submittedAt.seconds * 1000), 'PPP') : 'N/A'}
                            </TableCell>
                            <TableCell className="align-top">
                               <Badge className={statusColors[item.status]}>{item.status}</Badge>
                            </TableCell>
                            <TableCell className="space-y-2 align-top">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" className='w-full justify-start text-xs h-7'>
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
                                {item.linkedinUrl && (
                                    <Button variant="outline" size="sm" asChild className='w-full justify-start text-xs h-7'>
                                        <a href={item.linkedinUrl} target="_blank" rel="noopener noreferrer">
                                            <LinkIcon className="mr-2 h-4 w-4" />
                                            LinkedIn
                                        </a>
                                    </Button>
                                )}
                                {item.cvUrl && (
                                    <Button variant="outline" size="sm" asChild className='w-full justify-start text-xs h-7'>
                                        <a href={item.cvUrl} target="_blank" rel="noopener noreferrer">
                                            <FileJson className="mr-2 h-4 w-4" />
                                            CV
                                        </a>
                                    </Button>
                                )}
                            </TableCell>
                            <TableCell className="text-right align-top">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel className="font-normal text-xs">Change Status</DropdownMenuLabel>
                                         {Object.keys(statusColors).map((status) => (
                                            <DropdownMenuItem
                                            key={status}
                                            onSelect={() => handleStatusChange(item.id, status as ApplicationStatus)}
                                            >
                                                <Badge className={`mr-2 ${statusColors[status as ApplicationStatus]}`}>{status}</Badge>
                                            </DropdownMenuItem>
                                        ))}
                                        <DropdownMenuSeparator />
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/40 dark:focus:text-red-500">
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
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
                                                <AlertDialogAction onClick={() => deleteDocumentNonBlocking(doc(firestore, 'job_applications', item.id))} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </div>
            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-4 text-sm">
                <div className="text-muted-foreground">
                    {selectedRows.length} of {applications?.length} row(s) selected.
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages || totalPages === 0}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </CardContent>
    </Card>
  );
}
