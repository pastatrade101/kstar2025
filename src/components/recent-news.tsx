'use client';

import { useFirestore, useCollection } from '@/firebase';
import { useMemoFirebase } from '@/firebase/provider';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowRight, Loader2 } from 'lucide-react';

type NewsEvent = {
    id: string;
    title: string;
    content: string;
    date: string;
    type: 'News' | 'Event';
    imageUrl: string;
  };
  
export default function RecentNews() {
    const firestore = useFirestore();
    const newsCollectionRef = useMemoFirebase(() => (firestore ? collection(firestore, 'news_events') : null), [firestore]);
    const newsQuery = useMemoFirebase(() => (newsCollectionRef ? query(newsCollectionRef, orderBy('date', 'desc'), limit(6)) : null), [newsCollectionRef]);
    const { data: recentNews, isLoading } = useCollection<NewsEvent>(newsQuery);

    if (isLoading) {
        return (
            <section id="news" className="py-20 md:py-32 bg-secondary/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                        <p className="mt-4 text-muted-foreground">Loading news...</p>
                    </div>
                </div>
            </section>
        );
    }
    
    if (!recentNews || recentNews.length === 0) {
        return null;
    }

    return (
        <section id="news" className="py-20 md:py-32 bg-secondary/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <Badge>News & Events</Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">Stay Updated</h2>
                    <p className="text-lg text-muted-foreground">
                        Check out the latest news and happenings from Kstar International.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                    {recentNews.map((item) => (
                        <Card key={item.id} className="flex flex-col overflow-hidden group">
                            <Link href="/news-events" className="block aspect-video overflow-hidden">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </Link>
                            <CardHeader>
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>{format(new Date(item.date), 'PPP')}</span>
                                    <Badge variant={item.type === 'Event' ? 'default' : 'secondary'}>
                                        {item.type}
                                    </Badge>
                                </div>
                                <CardTitle className="mt-2">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground text-sm line-clamp-3">{item.content}</p>
                            </CardContent>
                            <div className="p-6 pt-0">
                                <Button variant="link" asChild className="p-0">
                                    <Link href="/news-events">Read More <ArrowRight className="ml-2" /></Link>
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
                <div className="text-center mt-16">
                    <Button asChild size="lg">
                        <Link href="/news-events">View All News & Events</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
