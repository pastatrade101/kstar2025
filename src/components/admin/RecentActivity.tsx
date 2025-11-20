'use client';
import { Clock, Newspaper, Mail, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';

const activities = [
  {
    id: 1,
    type: 'news',
    title: 'New article published',
    description: 'Summer Festival Announcement',
    time: '2 hours ago',
    icon: Newspaper,
    iconColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    status: 'completed',
  },
  {
    id: 2,
    type: 'submission',
    title: 'Contact form submitted',
    description: 'From: john.doe@example.com',
    time: '4 hours ago',
    icon: Mail,
    iconColor: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
    status: 'new',
  },
  {
    id: 3,
    type: 'user',
    title: 'New user registered',
    description: 'Sarah Johnson joined',
    time: '6 hours ago',
    icon: Users,
    iconColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
    status: 'completed',
  },
  {
    id: 4,
    type: 'news',
    title: 'Event updated',
    description: 'Community Meetup - Date Changed',
    time: '1 day ago',
    icon: Newspaper,
    iconColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    status: 'completed',
  },
  {
    id: 5,
    type: 'submission',
    title: 'Contact form submitted',
    description: 'From: mike.wilson@example.com',
    time: '1 day ago',
    icon: Mail,
    iconColor: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
    status: 'completed',
  },
  {
    id: 6,
    type: 'news',
    title: 'Article deleted',
    description: 'Old announcement removed',
    time: '2 days ago',
    icon: Newspaper,
    iconColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    status: 'completed',
  },
];

export function RecentActivity() {
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
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="relative">
                  {/* Timeline line */}
                  {index !== activities.length - 1 && (
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
                          <p className="text-slate-600 dark:text-slate-400 text-sm mt-0.5">
                            {activity.description}
                          </p>
                        </div>
                        {activity.status === 'new' && (
                          <Badge variant="default" className="bg-green-500 shrink-0">
                            New
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-slate-500 dark:text-slate-400 text-xs">
                        <Clock className="size-3" />
                        <span>{activity.time}</span>
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
