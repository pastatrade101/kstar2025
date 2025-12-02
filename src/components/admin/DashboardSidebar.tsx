
'use client';
import { X, LayoutDashboard, Newspaper, Mail, Users, Settings, BarChart3, Calendar, FileText, HeartHandshake, Briefcase, PlusSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Manage Jobs', href: '/admin/jobs', icon: PlusSquare },
  { name: 'Job Applications', href: '/admin/applications', icon: Briefcase },
  { name: 'News & Events', href: '/admin/news', icon: Newspaper },
  { name: 'Contact Submissions', href: '/admin/contacts', icon: Mail },
  { name: 'Volunteers', href: '/admin/volunteers', icon: HeartHandshake },
  { name: 'Users', href: '#', icon: Users },
  { name: 'Analytics', href: '#', icon: BarChart3 },
  { name: 'Calendar', href: '#', icon: Calendar },
  { name: 'Reports', href: '#', icon: FileText },
  { name: 'Settings', href: '#', icon: Settings },
];

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
    const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 transform bg-slate-900 transition-transform duration-300 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo & Close button */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-slate-800 shrink-0">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-white font-semibold">Admin Panel</span>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-slate-400 hover:text-white"
              onClick={onClose}
            >
              <X className="size-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isCurrent = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors',
                    isCurrent
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  )}
                >
                  <Icon className="size-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="border-t border-slate-800 p-4 shrink-0">
            <div className="rounded-lg bg-slate-800 p-4">
              <p className="text-slate-300 mb-2">Need help?</p>
              <p className="text-slate-400 text-sm mb-3">
                Check our documentation or contact support
              </p>
              <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                Get Support
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
