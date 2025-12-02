
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Loader2, PlusCircle, Trash2, Briefcase, MapPin, Clock } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { useFirestore, useCollection, addDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase';
import { collection, query, orderBy, doc, serverTimestamp } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMemoFirebase } from '@/firebase/provider';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  department: z.string().min(1, { message: 'Department is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  type: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship']),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
});

type Job = z.infer<typeof formSchema> & {
    id: string;
    postedAt: {
      seconds: number;
      nanoseconds: number;
    } | null;
  };

export default function ManageJobsPage() {
  const firestore = useFirestore();
  const jobsCollectionRef = useMemoFirebase(() => collection(firestore, 'jobs'), [firestore]);
  const jobsQuery = useMemoFirebase(() => query(jobsCollectionRef, orderBy('postedAt', 'desc')), [jobsCollectionRef]);

  const { data: jobItems, isLoading: isLoadingJobs, error } = useCollection<Job>(jobsQuery);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      department: '',
      location: 'Dar es Salaam, Tanzania',
      type: 'Full-time',
      description: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const dataToSave = {
      ...values,
      postedAt: serverTimestamp(),
    };
    addDocumentNonBlocking(jobsCollectionRef, dataToSave);
    form.reset({
        title: '',
        department: '',
        location: 'Dar es Salaam, Tanzania',
        type: 'Full-time',
        description: '',
    });
  }

  const handleDelete = (id: string) => {
    if (!firestore) return;
    const itemRef = doc(firestore, 'jobs', id);
    deleteDocumentNonBlocking(itemRef);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card className='dark:bg-slate-900 dark:border-slate-800'>
          <CardHeader>
            <CardTitle>Create Job Listing</CardTitle>
            <CardDescription>Fill out the form to post a new job opening.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Software Engineer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Engineering" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Dar es Salaam, Tanzania" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                          <SelectItem value="Internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe the role, responsibilities, and requirements..." {...field} rows={8} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <PlusCircle className="mr-2 h-4 w-4" />
                    )}
                  Create Job Listing
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
          <Card className='dark:bg-slate-900 dark:border-slate-800'>
              <CardHeader>
                  <CardTitle>Published Job Listings</CardTitle>
                  <CardDescription>A list of all currently open positions.</CardDescription>
              </CardHeader>
              <CardContent>
                  <Table>
                      <TableHeader>
                          <TableRow className='dark:border-slate-800'>
                              <TableHead>Position</TableHead>
                              <TableHead>Details</TableHead>
                              <TableHead>Posted</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {isLoadingJobs && (
                              <TableRow>
                                  <TableCell colSpan={4} className="text-center h-64">
                                      <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                                  </TableCell>
                              </TableRow>
                          )}
                          {error && (
                              <TableRow>
                                  <TableCell colSpan={4} className="text-center text-red-500">
                                      Error loading jobs: {error.message}
                                  </TableCell>
                              </TableRow>
                          )}
                          {!isLoadingJobs && jobItems && jobItems.length === 0 && (
                              <TableRow>
                                  <TableCell colSpan={4} className="text-center text-muted-foreground h-64">
                                      No job listings found. Create one to get started.
                                  </TableCell>
                              </TableRow>
                          )}
                          {jobItems?.map((item) => (
                              <TableRow key={item.id} className='dark:border-slate-800'>
                                  <TableCell className="font-medium align-top">
                                      <div className='font-bold text-base'>{item.title}</div>
                                      <div className='text-muted-foreground'>{item.department}</div>
                                  </TableCell>
                                  <TableCell className='align-top'>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                        <MapPin className="h-4 w-4" />
                                        <span>{item.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Badge variant="secondary">{item.type}</Badge>
                                    </div>
                                  </TableCell>
                                  <TableCell className='align-top text-muted-foreground text-sm'>
                                    {item.postedAt ? formatDistanceToNow(new Date(item.postedAt.seconds * 1000), { addSuffix: true }) : '...'}
                                   </TableCell>
                                  <TableCell className="text-right align-top">
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
                                            This will permanently delete this job listing. This action cannot be undone.
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
      </div>
    </div>
  );
}
