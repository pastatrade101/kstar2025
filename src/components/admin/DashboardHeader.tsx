'use client';
import { Menu, Bell, Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth, useUser } from '@/firebase';

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { user } = useUser();
  const auth = useAuth();
  
  const getInitials = (email?: string | null) => {
    if (!email) return 'A';
    return email.substring(0, 2).toUpperCase();
  }

  const handleSignOut = () => {
    auth?.signOut();
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden shrink-0"
          onClick={onMenuClick}
        >
          <Menu className="size-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Search */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700"
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative shrink-0">
            <Bell className="size-5" />
            <Badge className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 text-xs bg-red-600">
              3
            </Badge>
            <span className="sr-only">Notifications</span>
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 p-1 h-auto">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-blue-600 text-white">{getInitials(user?.email)}</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline text-slate-700 dark:text-slate-300 text-sm">{user?.email}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 dark:bg-slate-900">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Preferences</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/40 dark:focus:text-red-500" onClick={handleSignOut}>
                <LogOut className="size-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
