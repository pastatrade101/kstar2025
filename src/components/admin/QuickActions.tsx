'use client';
import { Newspaper, Mail, ArrowRight, Plus, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';

const actions = [
  {
    title: 'Manage News & Events',
    description: 'Create, edit, and delete news and events',
    href: '/admin/news',
    icon: Newspaper,
    primaryAction: 'Manage News & Events',
    secondaryAction: 'Create New',
    iconColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    stats: { total: 24, published: 20, drafts: 4 },
  },
  {
    title: 'View Contact Submissions',
    description: 'Read and manage messages from your website visitors',
    href: '/admin/contacts',
    icon: Mail,
    primaryAction: 'View Submissions',
    secondaryAction: 'Export Data',
    iconColor: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
    stats: { total: 156, unread: 12, responded: 144 },
  },
];

export function QuickActions() {
  return (
    <Card className="border-slate-200 dark:bg-slate-900 dark:border-slate-800">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Manage your content and communications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <div
              key={action.title}
              className="group rounded-lg border border-slate-200 dark:border-slate-800 p-6 transition-all hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md dark:hover:bg-slate-800/50"
            >
              <div className="flex items-start gap-4">
                <div className={`${action.iconColor} rounded-lg p-3 shrink-0`}>
                  <Icon className="size-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-slate-900 dark:text-slate-100 font-semibold">{action.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">{action.description}</p>
                  
                  {/* Stats */}
                  <div className="flex gap-6 mt-4">
                    {Object.entries(action.stats).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-slate-900 dark:text-slate-200 font-semibold">{value}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm capitalize">{key}</p>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 mt-4">
                    <Button asChild className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200">
                      <Link href={action.href}>
                        <Eye className="size-4 mr-2" />
                        {action.primaryAction}
                        <ArrowRight className="size-4 ml-2" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="border-slate-300 dark:border-slate-700 dark:hover:bg-slate-800">
                      <Plus className="size-4 mr-2" />
                      {action.secondaryAction}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
