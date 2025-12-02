
'use client';

import { useFirestore, useCollection, deleteDocumentNonBlocking, updateDocumentNonBlocking, useUser } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { useMemoFirebase } from '@/firebase/provider';
import { Loader2, Trash2, Users, ChevronDown, CheckCircle, Shield } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type UserRole = 'admin' | 'user';

type UserProfile = {
  id: string;
  displayName: string;
  email: string;
  role: UserRole;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  } | null;
  uid: string;
};

const roleColors: Record<UserRole, string> = {
    user: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
    admin: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
};

const roleIcons: Record<UserRole, React.ElementType> = {
    user: CheckCircle,
    admin: Shield,
};

export default function UsersPage() {
  const firestore = useFirestore();
  const { user: currentUser } = useUser();
  
  const usersCollectionRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'users') : null),
    [firestore]
  );

  const usersQuery = useMemoFirebase(
    () =>
      usersCollectionRef
        ? query(usersCollectionRef, orderBy('createdAt', 'desc'))
        : null,
    [usersCollectionRef]
  );

  const { data: users, isLoading: isLoadingUsers, error } = useCollection<UserProfile>(usersQuery);

  const handleDelete = (id: string) => {
    if (!firestore) return;
    const userRef = doc(firestore, 'users', id);
    deleteDocumentNonBlocking(userRef);
  };
  
  const handleRoleChange = (id: string, role: UserRole) => {
    if (!firestore) return;
    const userRef = doc(firestore, 'users', id);
    updateDocumentNonBlocking(userRef, { role });
  };

  const getInitials = (name: string) => {
    if (!name) return '?';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name[0]?.toUpperCase() || '?';
  }

  return (
    <Card className='dark:bg-slate-900 dark:border-slate-800'>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Users />
                User Management
            </CardTitle>
            <CardDescription>A list of all registered users in the system.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow className='dark:border-slate-800'>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Joined Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoadingUsers && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center h-48">
                                <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                            </TableCell>
                        </TableRow>
                    )}
                    {error && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center text-red-500">
                                Error loading users: {error.message}
                            </TableCell>
                        </TableRow>
                    )}
                    {!isLoadingUsers && (!users || users.length === 0) && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground h-48">
                                No users found.
                            </TableCell>
                        </TableRow>
                    )}
                    {users?.map((user) => {
                       const RoleIcon = roleIcons[user.role];
                       return (
                        <TableRow key={user.id} className='dark:border-slate-800'>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div>{user.displayName}</div>
                                        <div className='text-xs text-muted-foreground'>{user.uid === currentUser?.uid ? '(You)' : ''}</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className={cn('text-xs h-7 px-2 font-semibold', roleColors[user.role])}>
                                        <RoleIcon className='w-3 h-3 mr-1' />
                                        {user.role}
                                        <ChevronDown className="h-3 w-3 ml-1" />
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                    {(Object.keys(roleColors) as UserRole[]).map((role) => (
                                        <DropdownMenuItem
                                        key={role}
                                        onSelect={() => handleRoleChange(user.id, role)}
                                        disabled={user.uid === currentUser?.uid}
                                        >
                                        <Badge className={cn('mr-2', roleColors[role])}>{role}</Badge>
                                        </DropdownMenuItem>
                                    ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                            <TableCell>
                                {user.createdAt ? format(new Date(user.createdAt.seconds * 1000), 'PPP') : 'N/A'}
                            </TableCell>
                            <TableCell className="text-right">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="icon" disabled={user.uid === currentUser?.uid}>
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                            <span className="sr-only">Delete</span>
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will permanently delete this user and all associated data. This action cannot be undone.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(user.id)} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                       )
                    })}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  );
}
