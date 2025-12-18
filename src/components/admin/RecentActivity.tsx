'use client';
import { Clock, Newspaper, Mail, Briefcase } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { useFirestore, useCollection, useUser, useDoc } from '@/firebase';
import { useMemoFirebase } from '@/firebase/provider';
import { collection, query, orderBy, limit, doc, collectionGroup } from 'firebase/firestore';
import { useMemo } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Loader2 } from 'lucide-react';

type UserProfile = {
  role: 'admin' | 'user';
};

type NewsEvent = {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'News' | 'Event';
};

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  subject: string;
  submittedAt: {
    seconds: number;
    nanoseconds: number;
  } | null;
};

type JobApplication = {
  id: string;
  jobTitle: string;
  userName: string;
  submittedAt: {
    seconds: number;
    nanoseconds: number;
  } | null;
};

export function RecentActivity() {
  const firestore = useFirestore();
  const { user } = useUser();
  
  const userProfileRef = useMemoFirebase(
    () => (firestore && user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);
  const isAdmin = userProfile?.role === 'admin';

  // --- News Query (Publicly Readable) ---
  const newsCollectionRef = useMemoFirebase(() => (firestore ? collection(firestore, 'news_events') : null), [firestore]);
  const newsQuery = useMemoFirebase(() => (newsCollectionRef ? query(newsCollectionRef, orderBy('date', 'desc'), limit(5)) : null), [newsCollectionRef]);
  const { data: recentNews, isLoading: isLoadingNews } = useCollection<NewsEvent>(newsQuery);

  // --- Admin-Only Queries ---
  const contactsCollectionRef = useMemoFirebase(() => (firestore && isAdmin ? collection(firestore, 'contact_submissions') : null), [firestore, isAdmin]);
  const contactsQuery = useMemoFirebase(() => (contactsCollectionRef ? query(contactsCollectionRef, orderBy('submittedAt', 'desc'), limit(5)) : null), [contactsCollectionRef]);
  const { data: recentContacts, isLoading: isLoadingContacts } = useCollection<ContactSubmission>(contactsQuery);

  const applicationsCollectionGroup = useMemoFirebase(() => (firestore && isAdmin ? collectionGroup(firestore, 'job_applications') : null), [firestore, isAdmin]);
  const applicationsQuery = useMemoFirebase(() => (applicationsCollectionGroup ? query(applicationsCollectionGroup, orderBy('submittedAt', 'desc'), limit(5)) : null), [applicationsCollectionGroup]);
  const { data: recentApplications, isLoading: isLoadingApplications } = useCollection<JobApplication>(applicationsQuery);


  const combinedActivities = useMemo(() => {
    const newsActivities = (recentNews || []).map(item => ({
      id: item.id,
      type: 'news' as const,
      title: item.type === 'News' ? 'New article published' : 'New event published',
      description: item.title,
      timestamp: new Date(item.date),
      icon: Newspaper,
      iconColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    }));

    const contactActivities = (recentContacts || []).map(item => ({
      id: item.id,
      type: 'submission' as const,
      title: 'Contact form submitted',
      description: `From: ${item.name}`,
      timestamp: item.submittedAt ? new Date(item.submittedAt.seconds * 1000) : new Date(),
      icon: Mail,
      iconColor: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
    }));

    const applicationActivities = (recentApplications || []).map(item => ({
      id: item.id,
      type: 'application' as const,
      title: 'New job application',
      description: `${item.userName} for ${item.jobTitle}`,
      timestamp: item.submittedAt ? new Date(item.submittedAt.seconds * 1000) : new Date(),
      icon: Briefcase,
      iconColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400',
    }));

    // Only include admin activities if the user is an admin
    const adminActivities = isAdmin ? [...contactActivities, ...applicationActivities] : [];

    return [...newsActivities, ...adminActivities]
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 10);
  }, [recentNews, recentContacts, recentApplications, isAdmin]);
  
  const isLoading = isProfileLoading || isLoadingNews || (isAdmin && (isLoadingContacts || isLoadingApplications));

  return (
    <Card className="border-slate-200 dark:bg-slate-900 dark:border-slate-800">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest updates and changes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[450px] pr-4 -mr-4">
          {isLoading && (
              <div className="flex justify-center items-center h-full">
                  <Loader2 className="mx-auto h-8 w-8 animate-spin" />
              </div>
          )}
          {!isLoading && combinedActivities.length === 0 && (
            <div className="text-center text-muted-foreground pt-16">
              No recent activity.
            </div>
          )}
          <div className="space-y-4">
            {combinedActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={`${activity.type}-${activity.id}`} className="relative">
                  {/* Timeline line */}
                  {index !== combinedActivities.length - 1 && (
                    <div className="absolute left-5 top-12 bottom-0 w-px bg-slate-200 dark:bg-slate-800" />
                  )}
                  
                  <div className="flex gap-4">
                    <div className={`${activity.iconColor} rounded-full p-2 shrink-0 relative z-10 size-10 flex items-center justify-center`}>
                      <Icon className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0 pb-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-900 dark:text-slate-200 text-sm font-medium">
                            {activity.title}
                          </p>
                          <p className="text-slate-600 dark:text-slate-400 text-sm mt-0.5 truncate">
                            {activity.description}
                          </p>
                        </div>
                        {activity.type === 'submission' && (
                          <Badge variant="default" className="bg-green-500 shrink-0">
                            New
                          </Badge>
                        )}
                         {activity.type === 'application' && (
                          <Badge variant="secondary" className="shrink-0">
                            New
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-slate-500 dark:text-slate-400 text-xs">
                        <Clock className="size-3" />
                        <span>{formatDistanceToNow(activity.timestamp, { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
