'use client';

import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { useMemoFirebase } from '@/firebase/provider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, MapPin, Briefcase, Clock, ArrowRight, CalendarDays, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow, format } from 'date-fns';
import Image from 'next/image';

type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  description: string;
  postedAt: {
    seconds: number;
    nanoseconds: number;
  } | null;
  applicationDeadline: string;
  coverImageUrl?: string;
};

export default function CareersPage() {
  const firestore = useFirestore();
  const jobsCollectionRef = useMemoFirebase(() => (firestore ? collection(firestore, 'jobs') : null), [firestore]);
  const jobsQuery = useMemoFirebase(() => (jobsCollectionRef ? query(jobsCollectionRef, orderBy('postedAt', 'desc')) : null), [jobsCollectionRef]);
  const { data: jobs, isLoading, error } = useCollection<Job>(jobsQuery);

  return (
    <div className="bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Join Our Team
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore exciting career opportunities at Kstar (T) Group and our affiliated organizations. We're looking for passionate individuals to help us turn passion into performance.
          </p>
        </div>

        <div className="mt-16">
          {isLoading && (
            <div className="flex justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          )}
          {error && (
            <p className="text-center text-red-500">
              Failed to load job listings. Please try again later.
            </p>
          )}
          {!isLoading && jobs && jobs.length === 0 && (
            <p className="text-center text-muted-foreground">
              There are currently no open positions. Please check back soon!
            </p>
          )}
          {jobs && jobs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobs.map((job) => (
                <Card key={job.id} className="flex flex-col group">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    {job.coverImageUrl ? (
                        <Image src={job.coverImageUrl} alt={job.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                            <ImageIcon className="w-12 h-12 text-muted-foreground" />
                        </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>{job.department}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>
                        {job.postedAt ? `${formatDistanceToNow(new Date(job.postedAt.seconds * 1000))} ago` : 'Date not available'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                        <CalendarDays className="h-4 w-4" />
                        <span>Deadline: {format(new Date(job.applicationDeadline), 'PPP')}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/careers/${job.id}`}>
                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
