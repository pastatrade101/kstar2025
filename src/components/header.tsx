'use client';

import React, { useState } from 'react';
import { LogOut, Menu, X, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useAuth, useUser } from '@/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();
  const auth = useAuth();

  const handleSignOut = () => {
    if (auth) {
      auth.signOut();
    }
  };

  const getInitials = (email?: string | null) => {
    if (!email) return 'A';
    return email.substring(0, 2).toUpperCase();
  }

  const kstarGroupComponents: {
    title: string;
    href: string;
    description: string;
    image: any;
  }[] = [
    {
      title: 'Kstar International',
      href: '/kstar-international',
      description:
        'Empowering talent in creativity and sports through insight-driven performance.',
      image: PlaceHolderImages.find((p) => p.id === 'mega-menu-kstar'),
    },
    {
      title: 'Kstar Malezi Foundation',
      href: '/kstar-malezi-foundation',
      description:
        'A non-profit fostering youth development through education and mentorship programs.',
      image: PlaceHolderImages.find((p) => p.id === 'mega-menu-malezi'),
    },
    {
      title: 'ClickData Tanzania',
      href: '/clickdata-tanzania',
      description:
        'Harnessing the power of data to provide innovative analytics and business solutions.',
      image: PlaceHolderImages.find((p) => p.id === 'mega-menu-clickdata'),
    },
  ];

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // Approximate height of the sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setIsMenuOpen(false);
    }
  };

  const handleMobileLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-lg border-b`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="https://firebasestorage.googleapis.com/v0/b/studio-4061903538-cceaf.firebasestorage.app/o/icon%404x.png?alt=media&token=45e36cf0-d0aa-41b8-8039-698aaa6e29e7" 
              alt="Kstar Logo" 
              width={40} 
              height={40}
              className="rounded-xl"
            />
            <div>
              <div className="font-semibold text-foreground">
                kstar (T) Group
              </div>
              <div className="text-xs text-muted-foreground">
                Excellence in Every Field
              </div>
            </div>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Button variant="ghost" asChild>
                  <Link href="/">Home</Link>
                </Button>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Kstar (T) Group</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {kstarGroupComponents.map((component) => (
                      <li key={component.title} className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href={component.href}
                          >
                            <Image
                              src={component.image.imageUrl}
                              alt={component.title}
                              width={400}
                              height={200}
                              className="w-full h-24 object-cover rounded-md mb-4"
                              data-ai-hint={component.image.imageHint}
                            />
                            <div className="mb-2 mt-4 text-lg font-medium">
                              {component.title}
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              {component.description}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant="ghost" asChild>
                  <Link href="/careers">
                    Careers
                  </Link>
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant="ghost" asChild>
                  <Link href="/get-involved">
                    Get Involved
                  </Link>
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant="ghost" asChild>
                  <Link href="/#contact" onClick={scrollToSection('contact')}>
                    Contact
                  </Link>
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2 p-1 h-auto rounded-full">
                        <Avatar className="size-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">{getInitials(user.displayName || user.email)}</AvatarFallback>
                        </Avatar>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>{user.displayName || user.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/admin/dashboard">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500 focus:text-red-500" onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign Out</span>
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Button asChild>
                    <Link href="/login">Sign In</Link>
                </Button>
            )}


            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <nav className="py-4 space-y-1 px-4">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/" onClick={handleMobileLinkClick}>
                Home
              </Link>
            </Button>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="kstar-group" className="border-b-0">
                <AccordionTrigger className="py-2 hover:no-underline font-medium text-sm hover:bg-accent hover:text-accent-foreground rounded-md px-3">
                  Kstar (T) Group
                </AccordionTrigger>
                <AccordionContent className="pb-0 pl-4">
                  {kstarGroupComponents.map((component) => (
                    <Button
                      key={component.href}
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link
                        href={component.href}
                        onClick={handleMobileLinkClick}
                      >
                        {component.title}
                      </Link>
                    </Button>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/careers" onClick={handleMobileLinkClick}>
                Careers
              </Link>
            </Button>

            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/get-involved" onClick={handleMobileLinkClick}>
                Get Involved
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/#contact" onClick={scrollToSection('contact')}>
                Contact
              </Link>
            </Button>
            <Button
              asChild
              className="w-full mt-2 bg-gradient-to-r from-primary to-accent"
            >
              <Link href="/login">
                Sign In
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
