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
  import { collection, query, orderBy, getDocs, Timestamp } from 'firebase-admin/firestore';
  import { initializeFirebase } from '@/firebase/server';
  
  
  type NewsEvent = {
    id: string;
    title: string;
    content: string;
    date: string | Timestamp;
    type: 'News' | 'Event';
    imageUrl: string;
  };
  
  async function getNewsAndEvents() {
    try {
      const { firestore } = initializeFirebase();
      const newsCollectionRef = firestore.collection('news_events');
      const newsQuery = newsCollectionRef.orderBy('date', 'desc');
      const snapshot = await newsQuery.get();
  
      if (snapshot.empty) {
        return [];
      }
  
      const newsAndEvents = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          date: (data.date as Timestamp).toDate().toISOString(),
        } as NewsEvent;
      });
  
      return newsAndEvents;
    } catch (error) {
      console.error("Error fetching news and events:", error);
      return [];
    }
  }
  
  export default async function NewsAndEventsPage() {
    const newsAndEvents = await getNewsAndEvents();
  
    return (
      <div className="flex flex-col gap-8 p-4 md:p-8">
        <header>
          <h1 className="font-headline text-4xl font-bold tracking-tight">
            News & Events
          </h1>
          <p className="text-muted-foreground mt-2">
            Stay up-to-date with everything happening at EduPro Hub.
          </p>
        </header>
  
        {!newsAndEvents && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        )}
  
        {newsAndEvents?.length === 0 && (
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
                  <p className="text-foreground/80">{item.content}</p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  