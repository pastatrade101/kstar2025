
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-secondary/50 text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
              <Image 
                src="https://firebasestorage.googleapis.com/v0/b/studio-4061903538-cceaf.firebasestorage.app/o/icon%404x.png?alt=media&token=45e36cf0-d0aa-41b8-8039-698aaa6e29e7" 
                alt="Kstar Logo" 
                width={40} 
                height={40}
                className="rounded-xl"
              />
                <span className="font-bold text-lg">
                  Kstar (T) Group
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Thank you for visiting Kstar (T) Group. We feel proud to serve you.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/kstar-international', label: 'Kstar International' },
                  { href: '/kstar-malezi-foundation', label: 'Kstar Malezi Foundation' },
                  { href: '/clickdata-tanzania', label: 'ClickData Tanzania' },
                  { href: '/#contact', label: 'Contact' },
                ].map(link => (
                    <li key={link.href}>
                        <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                        >
                        {link.label}
                        </Link>                    </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">info@kstar.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">
                Follow Us
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Stay connected on social media.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: '#' },
                  { icon: Twitter, href: '#' },
                  { icon: Instagram, href: 'https://www.instagram.com/kstar_international/' },
                  { icon: Linkedin, href: '#' },
                  { icon: Youtube, href: '#' },
                ].map((social, i) => (
                  <a href={social.href} key={i} className="text-muted-foreground hover:text-primary transition-colors">
                      <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p className="text-muted-foreground">
                © {currentYear} Kstar International Limited. All rights reserved.
              </p>
              <div className="flex gap-6">
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-of-use"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Use
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
}
