
'use client';

import { useFirestore, useCollection, deleteDocumentNonBlocking } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { useMemoFirebase } from '@/firebase/provider';
import { Loader2, Trash2, Users } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

type VolunteerRegistration = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: 'Volunteer' | 'Partner' | 'Supporter';
  skills?: string;
  availability?: string;
  registeredAt: {
    seconds: number;
    nanoseconds: number;
  } | null;
};

export default function VolunteersPage() {
  const firestore = useFirestore();
  const registrationsCollectionRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'volunteer_registrations') : null),
    [firestore]
  );
  const registrationsQuery = useMemoFirebase(
    () =>
      registrationsCollectionRef
        ? query(registrationsCollectionRef, orderBy('registeredAt', 'desc'))
        : null,
    [registrationsCollectionRef]
  );

  const { data: registrations, isLoading: isLoadingRegistrations, error } = useCollection<VolunteerRegistration>(registrationsQuery);

  const handleDelete = (id: string) => {
    if (!firestore) return;
    const itemRef = doc(firestore, 'volunteer_registrations', id);
    deleteDocumentNonBlocking(itemRef);
  };

  const getTypeBadgeVariant = (type: VolunteerRegistration['type']) => {
    switch (type) {
        case 'Volunteer':
            return 'default';
        case 'Partner':
            return 'secondary';
        case 'Supporter':
            return 'outline';
        default:
            return 'secondary';
    }
  }

  return (
    <Card className='dark:bg-slate-900 dark:border-slate-800'>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Users />
                Volunteer & Partner Registrations
            </CardTitle>
            <CardDescription>A list of everyone who has registered to get involved.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow className='dark:border-slate-800'>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Registered On</TableHead>
                        <TableHead>Skills</TableHead>
                        <TableHead>Availability</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoadingRegistrations && (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center h-48">
                                <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                            </TableCell>
                        </TableRow>
                    )}
                    {error && (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-red-500">
                                Error loading registrations: {error.message}
                            </TableCell>
                        </TableRow>
                    )}
                    {!isLoadingRegistrations && registrations && registrations.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-muted-foreground h-48">
                                No registrations found.
                            </TableCell>
                        </TableRow>
                    )}
                    {registrations?.map((item) => (
                        <TableRow key={item.id} className='dark:border-slate-800'>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>
                                <div>{item.email}</div>
                                {item.phone && <div className="text-muted-foreground text-xs">{item.phone}</div>}
                            </TableCell>
                            <TableCell>
                                <Badge variant={getTypeBadgeVariant(item.type)}>{item.type}</Badge>
                            </TableCell>
                            <TableCell>
                                {item.registeredAt ? format(new Date(item.registeredAt.seconds * 1000), 'PPP') : 'N/A'}
                            </TableCell>
                            <TableCell className="max-w-xs whitespace-pre-wrap">{item.skills || '-'}</TableCell>
                            <TableCell className="max-w-xs whitespace-pre-wrap">{item.availability || '-'}</TableCell>
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
                                            This will permanently delete this registration. This action cannot be undone.
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
