'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
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

export default function HomeClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      href: '#',
      description:
        'A non-profit fostering youth development through education and mentorship programs.',
        image: PlaceHolderImages.find((p) => p.id === 'mega-menu-malezi'),
    },
    {
      title: 'ClickData Tanzania',
      href: '#',
      description:
        'Harnessing the power of data to provide innovative analytics and business solutions.',
        image: PlaceHolderImages.find((p) => p.id === 'mega-menu-clickdata'),
    },
  ];

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Departments' },
    { id: 'values', label: 'Values' },
    { id: 'contact', label: 'Contact' },
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-xl border-b`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold">
                K
              </div>
              <span className="font-bold text-lg">Kstar International</span>
            </Link>

            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Button variant="ghost" asChild>
                    <Link href="#home" onClick={scrollToSection('home')}>
                      Home
                    </Link>
                  </Button>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Kstar International Group</NavigationMenuTrigger>
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
                                className='w-full h-24 object-cover rounded-md mb-4'
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
                    <Link href="#about" onClick={scrollToSection('about')}>
                      About
                    </Link>
                  </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button variant="ghost" asChild>
                    <Link href="#services" onClick={scrollToSection('services')}>
                      Departments
                    </Link>
                  </Button>
                </NavigationMenuItem>
                 <NavigationMenuItem>
                  <Button variant="ghost" asChild>
                    <Link href="#contact" onClick={scrollToSection('contact')}>
                      Contact
                    </Link>
                  </Button>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-4">
              <Button asChild className="hidden md:flex">
                <Link href="#contact" onClick={scrollToSection('contact')}>
                  Get In Touch
                </Link>
              </Button>

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
          <div className="md:hidden bg-background border-t border-border">
            <nav className="py-4 space-y-1 px-4">
              {navLinks.map((link) => (
                <Button
                  key={link.id}
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={`#${link.id}`} onClick={scrollToSection(link.id)}>
                    {link.label}
                  </Link>
                </Button>
              ))}
              <Button asChild className="w-full mt-2">
                <Link href="#contact" onClick={scrollToSection('contact')}>
                  Get In Touch
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </header>
      {children}
    </div>
  );
}
