'use client';

import { StatsCards } from '@/components/admin/StatsCards';
import { QuickActions } from '@/components/admin/QuickActions';
import { RecentActivity } from '@/components/admin/RecentActivity';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <QuickActions />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
