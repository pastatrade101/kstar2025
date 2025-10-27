"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import Logo from '@/components/logo';
import {
  LayoutDashboard,
  BookOpen,
  UsersRound,
  Newspaper,
  GraduationCap as AdmissionsIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from './ui/button';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard, tooltip: 'Dashboard' },
  { href: '/courses', label: 'Courses', icon: BookOpen, tooltip: 'Courses' },
  { href: '/faculty', label: 'Faculty', icon: UsersRound, tooltip: 'Faculty' },
  { href: '/news-events', label: 'News & Events', icon: Newspaper, tooltip: 'News & Events' },
  { href: '/admissions', label: 'Admissions', icon: AdmissionsIcon, tooltip: 'Admissions' },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { toggleSidebar, state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar>
      <SidebarHeader className="h-16 flex items-center justify-between p-4">
        <div className={`transition-opacity duration-200 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
          <Logo />
        </div>
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hidden md:flex">
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.tooltip, side: 'right' }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className={`transition-opacity duration-200 ${isCollapsed ? 'opacity-0 h-0' : 'opacity-100'}`}>
            <p className="text-xs text-sidebar-foreground/70">&copy; 2024 EduPro Hub</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
