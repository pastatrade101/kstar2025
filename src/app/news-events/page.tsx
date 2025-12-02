'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import Image from 'next/image';
  import { Badge } from '@/components/ui/badge';
  import { Loader2 } from 'lucide-react';
  import { format } from 'date-fns';
  import { useFirestore, useCollection } from '@/firebase';
  import { useMemoFirebase } from '@/firebase/provider';
  import { collection, query, orderBy } from 'firebase/firestore';
  
  
  type NewsEvent = {
    id: string;
    title: string;
    content: string;
    date: string;
    type: 'News' | 'Event';
    imageUrl: string;
  };
    
  export default function NewsAndEventsPage() {
    const firestore = useFirestore();
    const newsCollectionRef = useMemoFirebase(() => (firestore ? collection(firestore, 'news_events') : null), [firestore]);
    const newsQuery = useMemoFirebase(() => (newsCollectionRef ? query(newsCollectionRef, orderBy('date', 'desc')) : null), [newsCollectionRef]);
    const { data: newsAndEvents, isLoading } = useCollection<NewsEvent>(newsQuery);
  
    return (
      <div className="flex flex-col gap-8 p-4 md:p-8 pt-24 md:pt-32">
        <header>
          <h1 className="font-headline text-4xl font-bold tracking-tight">
            News & Events
          </h1>
          <p className="text-muted-foreground mt-2">
            Stay up-to-date with everything happening at Kstar International.
          </p>
        </header>
  
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        )}
  
        {!isLoading && newsAndEvents?.length === 0 && (
            <div className="text-center text-muted-foreground py-16">
                <p>No news or events have been posted yet.</p>
            </div>
        )}
  
        <div className="space-y-8">
          {newsAndEvents?.map((item) => (
            <Card key={item.id} className="overflow-hidden md:flex md:flex-row">
              <div className="md:w-1/3">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              <div className="md:w-2/3">
                <CardHeader>
                  <div className='flex items-center justify-between'>
                      <CardDescription>{format(new Date(item.date as string), 'PPP')}</CardDescription>
                      <Badge variant={item.type === 'Event' ? 'default' : 'secondary'}>
                          {item.type}
                      </Badge>
                  </div>
                  <CardTitle className="font-headline text-2xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 whitespace-pre-wrap">{item.content}</p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  