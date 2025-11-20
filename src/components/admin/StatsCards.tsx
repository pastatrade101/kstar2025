'use client';
import { TrendingUp, TrendingDown, Newspaper, Mail, Users, Calendar, Loader2 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { useMemoFirebase } from '@/firebase/provider';
import { useMemo } from 'react';

export function StatsCards() {
  const firestore = useFirestore();
  const newsCollectionRef = useMemoFirebase(() => (firestore ? collection(firestore, 'news_events') : null), [firestore]);
  const contactsCollectionRef = useMemoFirebase(() => (firestore ? collection(firestore, 'contact_submissions') : null), [firestore]);

  const { data: newsItems, isLoading: isLoadingNews } = useCollection(newsCollectionRef);
  const { data: contactItems, isLoading: isLoadingContacts } = useCollection(contactsCollectionRef);
  
  const upcomingEventsQuery = useMemoFirebase(() => 
    newsCollectionRef 
      ? query(newsCollectionRef, where('type', '==', 'Event'), where('date', '>=', new Date().toISOString().split('T')[0]))
      : null,
    [newsCollectionRef]
  );
  const { data: upcomingEvents, isLoading: isLoadingEvents } = useCollection(upcomingEventsQuery);

  const stats = useMemo(() => [
    {
      name: 'Total News & Events',
      value: isLoadingNews ? null : newsItems?.length.toString() ?? '0',
      change: '+12%',
      changeType: 'increase' as const,
      icon: Newspaper,
      color: 'bg-blue-500',
      isLoading: isLoadingNews,
    },
    {
      name: 'Contact Submissions',
      value: isLoadingContacts ? null : contactItems?.length.toString() ?? '0',
      change: '+8%',
      changeType: 'increase' as const,
      icon: Mail,
      color: 'bg-green-500',
      isLoading: isLoadingContacts,
    },
    {
      name: 'Active Users',
      value: '1', // Static for now as we only have one admin user
      change: '0%',
      changeType: 'increase' as const,
      icon: Users,
      color: 'bg-purple-500',
      isLoading: false,
    },
    {
      name: 'Upcoming Events',
      value: isLoadingEvents ? null : upcomingEvents?.length.toString() ?? '0',
      change: '+2',
      changeType: 'increase' as const,
      icon: Calendar,
      color: 'bg-orange-500',
      isLoading: isLoadingEvents,
    },
  ], [newsItems, contactItems, upcomingEvents, isLoadingNews, isLoadingContacts, isLoadingEvents]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.name} className="border-slate-200 dark:bg-slate-900 dark:border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{stat.name}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                    {stat.isLoading ? <Loader2 className="size-6 animate-spin" /> : stat.value}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.changeType === 'increase' ? (
                      <TrendingUp className="size-4 text-green-600" />
                    ) : (
                      <TrendingDown className="size-4 text-red-600" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        stat.changeType === 'increase'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-sm ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="size-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
