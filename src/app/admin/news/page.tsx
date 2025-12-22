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
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon, Loader2, PlusCircle, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useFirestore, useCollection, deleteDocumentNonBlocking } from '@/firebase';
import { collection, query, orderBy, doc, addDoc } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMemoFirebase } from '@/firebase/provider';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
  date: z.date({
    required_error: 'A date is required.',
  }),
  type: z.enum(['News', 'Event']),
  imageUrl: z.string().url({ message: 'Please enter a valid image URL.' }),
});

type NewsItem = z.infer<typeof formSchema> & { id: string };

export default function ManageNewsPage() {
  const firestore = useFirestore();
  const newsCollectionRef = useMemoFirebase(() => collection(firestore, 'news_events'), [firestore]);
  const newsQuery = useMemoFirebase(() => query(newsCollectionRef, orderBy('date', 'desc')), [newsCollectionRef]);

  const { data: newsItems, isLoading: isLoadingNews, error } = useCollection<NewsItem>(newsQuery);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      type: 'News',
      imageUrl: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!newsCollectionRef) return;
    const dataToSave = {
      ...values,
      date: format(values.date, 'yyyy-MM-dd'),
    };
    await addDoc(newsCollectionRef, dataToSave);
    form.reset({
        title: '',
        content: '',
        type: 'News',
        imageUrl: '',
        date: undefined
    });
  }

  const handleDelete = (id: string) => {
    if (!firestore) return;
    const itemRef = doc(firestore, 'news_events', id);
    deleteDocumentNonBlocking(itemRef);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card className='dark:bg-slate-900 dark:border-slate-800'>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
            <CardDescription>Fill out the form below to add a new news item or event.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter post title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Write the main content of the post" {...field} rows={5} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
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
                            disabled={(date) => date < new Date('1900-01-01')}
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
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select post type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="News">News</SelectItem>
                          <SelectItem value="Event">Event</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormDescription>
                        Paste a URL to an image for the post.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Post
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
          <Card className='dark:bg-slate-900 dark:border-slate-800'>
              <CardHeader>
                  <CardTitle>Published Posts</CardTitle>
                  <CardDescription>Here is a list of all current news and events.</CardDescription>
              </CardHeader>
              <CardContent>
                  <Table>
                      <TableHeader>
                          <TableRow className='dark:border-slate-800'>
                              <TableHead>Image</TableHead>
                              <TableHead>Title</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {isLoadingNews && (
                              <TableRow>
                                  <TableCell colSpan={5} className="h-48 text-center">
                                      <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                                  </TableCell>
                              </TableRow>
                          )}
                          {error && (
                              <TableRow>
                                  <TableCell colSpan={5} className="h-48 text-center text-red-500">
                                      Error loading posts: {error.message}
                                  </TableCell>
                              </TableRow>
                          )}
                          {!isLoadingNews && newsItems && newsItems.length === 0 && (
                              <TableRow>
                                  <TableCell colSpan={5} className="h-48 text-center text-muted-foreground">
                                      No posts found.
                                  </TableCell>
                              </TableRow>
                          )}
                          {newsItems?.map((item) => (
                              <TableRow key={item.id} className='dark:border-slate-800'>
                                  <TableCell>
                                      <Image src={item.imageUrl} alt={item.title} width={80} height={60} className="rounded-md object-cover aspect-[4/3]" />
                                  </TableCell>
                                  <TableCell className="font-medium align-top">{item.title}</TableCell>
                                  <TableCell className="align-top">
                                    <Badge variant={item.type === 'Event' ? 'default' : 'secondary'}>{item.type}</Badge>
                                  </TableCell>
                                  <TableCell className="align-top text-muted-foreground">{format(new Date(item.date), 'PPP')}</TableCell>
                                  <TableCell className="text-right align-top">
                                      <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                                          <Trash2 className="h-4 w-4 text-red-500" />
                                          <span className="sr-only">Delete</span>
                                      </Button>
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
