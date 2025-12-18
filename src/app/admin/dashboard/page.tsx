'use client';

import { QuickActions } from '@/components/admin/QuickActions';

export default function AdminDashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-8">
      <div>
        <QuickActions />
      </div>
    </div>
  );
}
