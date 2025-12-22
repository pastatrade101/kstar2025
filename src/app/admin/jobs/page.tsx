
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
import { Loader2, PlusCircle, Trash2, Briefcase, MapPin, Clock, Calendar as CalendarIcon, CalendarDays, Image as ImageIcon } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { useFirestore, useCollection, deleteDocumentNonBlocking } from '@/firebase';
import { collection, query, orderBy, doc, serverTimestamp, addDoc } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMemoFirebase } from '@/firebase/provider';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Image from 'next/image';


const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  department: z.string().min(1, { message: 'Department is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  type: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship']),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  applicationDeadline: z.date({
    required_error: 'An application deadline is required.',
  }),
  coverImageUrl: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
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
      coverImageUrl: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!jobsCollectionRef) return;
    const dataToSave = {
      ...values,
      postedAt: serverTimestamp(),
      applicationDeadline: format(values.applicationDeadline, 'yyyy-MM-dd'),
    };
    await addDoc(jobsCollectionRef, dataToSave);
    form.reset({
        title: '',
        department: '',
        location: 'Dar es Salaam, Tanzania',
        type: 'Full-time',
        description: '',
        applicationDeadline: undefined,
        coverImageUrl: '',
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
                  name="applicationDeadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Application Deadline</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="coverImageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Image URL (Optional)</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
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
                              <TableHead>Dates</TableHead>
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
                                    <div className="flex items-center gap-4">
                                        {item.coverImageUrl ? (
                                            <Image src={item.coverImageUrl} alt={item.title} width={64} height={64} className="rounded-md object-cover aspect-square" />
                                        ) : (
                                            <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                                                <ImageIcon className="w-8 h-8 text-muted-foreground" />
                                            </div>
                                        )}
                                        <div>
                                            <div className='font-bold text-base'>{item.title}</div>
                                            <div className='text-muted-foreground'>{item.department}</div>
                                        </div>
                                    </div>
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
                                    <div className='flex items-center gap-2'>
                                      <Clock className="h-4 w-4" />
                                      <span>Posted: {item.postedAt ? formatDistanceToNow(new Date(item.postedAt.seconds * 1000), { addSuffix: true }) : '...'}</span>
                                    </div>
                                    <div className='flex items-center gap-2 mt-2 text-red-600 dark:text-red-400'>
                                      <CalendarDays className="h-4 w-4" />
                                      <span>Deadline: {item.applicationDeadline ? format(new Date(item.applicationDeadline as any), 'PPP') : 'N/A'}</span>
                                    </div>
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
