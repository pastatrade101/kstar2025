'use client';

import { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { faculty } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Mail, Search } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function FacultyPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaculty = useMemo(() => {
    if (!searchTerm) return faculty;
    const lowercasedTerm = searchTerm.toLowerCase();
    return faculty.filter(
      (person) =>
        person.name.toLowerCase().includes(lowercasedTerm) ||
        person.title.toLowerCase().includes(lowercasedTerm) ||
        person.researchInterests.some((interest) =>
          interest.toLowerCase().includes(lowercasedTerm)
        )
    );
  }, [searchTerm]);

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return names[0][0];
  }

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 pt-24 md:pt-32">
      <header>
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          Faculty Directory
        </h1>
        <p className="text-muted-foreground mt-2">
          Meet the brilliant minds shaping our institution.
        </p>
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name, title, or research interest..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((person) => (
          <Card key={person.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={person.image.imageUrl} alt={person.name} data-ai-hint={person.image.imageHint} />
                <AvatarFallback>{getInitials(person.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle>{person.name}</CardTitle>
                <CardDescription>{person.title}</CardDescription>
                <a
                  href={`mailto:${person.email}`}
                  className="mt-2 inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  {person.email}
                </a>
              </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <p className="text-foreground/80">{person.bio}</p>
              <div>
                <h3 className="text-sm font-semibold mb-2">Research Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {person.researchInterests.map((interest) => (
                    <Badge key={interest} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredFaculty.length === 0 && (
            <div className="md:col-span-2 lg:col-span-3 text-center text-muted-foreground py-16">
                <p>No faculty members found matching your search.</p>
            </div>
        )}
      </div>
    </div>
  );
}
