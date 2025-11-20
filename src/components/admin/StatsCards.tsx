'use client';
import { TrendingUp, TrendingDown, Newspaper, Mail, Users, Calendar } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const stats = [
  {
    name: 'Total News & Events',
    value: '24',
    change: '+12%',
    changeType: 'increase' as const,
    icon: Newspaper,
    color: 'bg-blue-500',
  },
  {
    name: 'Contact Submissions',
    value: '156',
    change: '+8%',
    changeType: 'increase' as const,
    icon: Mail,
    color: 'bg-green-500',
  },
  {
    name: 'Active Users',
    value: '1,234',
    change: '-3%',
    changeType: 'decrease' as const,
    icon: Users,
    color: 'bg-purple-500',
  },
  {
    name: 'Upcoming Events',
    value: '8',
    change: '+2',
    changeType: 'increase' as const,
    icon: Calendar,
    color: 'bg-orange-500',
  },
];

export function StatsCards() {
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
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">{stat.value}</p>
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
