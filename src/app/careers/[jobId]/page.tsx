'use client';

import { useState } from 'react';
import { useFirestore, useDoc, useUser, useCollection, addDocumentNonBlocking } from '@/firebase';
import { doc, collection, serverTimestamp, query, where, limit } from 'firebase/firestore';
import { useMemoFirebase } from '@/firebase/provider';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, MapPin, Briefcase, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { AuthGate } from '@/components/auth-gate';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';

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
};

type JobApplication = {
    id: string;
    submittedAt: {
      seconds: number;
      nanoseconds: number;
    } | null;
    status: 'Pending' | 'Received' | 'Whitelisted' | 'Not Selected';
};

function ApplicationForm({ job, onApplicationSuccess }: { job: Job, onApplicationSuccess: () => void }) {
  const { user } = useUser();
  const { toast } = useToast();
  const firestore = useFirestore();
  const applicationsCollectionRef = useMemoFirebase(() => collection(firestore, 'job_applications'), [firestore]);


  const [applicantPhone, setApplicantPhone] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job || !user || !firestore) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not submit application. Please try again.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const applicationData = {
        jobId: job.id,
        jobTitle: job.title,
        userId: user.uid,
        userName: user.displayName || user.email,
        userEmail: user.email,
        phone: applicantPhone,
        coverLetter: coverLetter,
        submittedAt: serverTimestamp(),
        status: 'Received',
      };

      await addDocumentNonBlocking(applicationsCollectionRef, applicationData);

      toast({
        title: 'Application Submitted!',
        description: 'Thank you for applying. We will review your application and be in touch.',
      });

      // Reset form and notify parent
      setApplicantPhone('');
      setCoverLetter('');
      onApplicationSuccess();

    } catch (error) {
      console.error("Application submission error:", error);
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
        <CardHeader>
        <CardTitle>Apply for this Position</CardTitle>
        <CardDescription>
            You are applying as <span className="font-semibold text-primary">{user?.displayName || user?.email}</span>.
        </CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={onApplicationSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input id="phone" placeholder="+1 234 567 890" value={applicantPhone} onChange={e => setApplicantPhone(e.target.value)} disabled={isSubmitting} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="coverLetter">Cover Letter</Label>
                <Textarea id="coverLetter" placeholder="Tell us why you're a good fit for this role..." value={coverLetter} onChange={e => setCoverLetter(e.target.value)} disabled={isSubmitting} rows={8} />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting || !user}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
        </form>
        </CardContent>
    </Card>
  )
}

function ApplicationStatus({ application }: { application: JobApplication }) {
    return (
      <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
        <CardHeader className="text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-green-600 dark:text-green-500 mb-4" />
          <CardTitle className="text-green-800 dark:text-green-300">Application Submitted</CardTitle>
          <CardDescription className="text-green-700 dark:text-green-400">
            You have already applied for this position.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Submitted on: {application.submittedAt ? format(new Date(application.submittedAt.seconds * 1000), 'PPP') : 'N/A'}
            </p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-sm text-muted-foreground">Status:</p>
              <Badge variant="secondary">{application.status}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

export default function JobDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.jobId as string;
  const { user, isUserLoading } = useUser();

  const firestore = useFirestore();
  const jobDocRef = useMemoFirebase(() => (firestore && jobId ? doc(firestore, 'jobs', jobId) : null), [firestore, jobId]);
  const { data: job, isLoading, error } = useDoc<Job>(jobDocRef);
  
  const userApplicationQuery = useMemoFirebase(() => {
    if (!firestore || !user || !jobId) return null;
    return query(
      collection(firestore, 'job_applications'),
      where('jobId', '==', jobId),
      where('userId', '==', user.uid),
      limit(1)
    );
  }, [firestore, user, jobId]);

  const { data: userApplication, isLoading: isLoadingApplication, refetch: refetchApplication } = useCollection<JobApplication>(userApplicationQuery);
  const hasApplied = userApplication && userApplication.length > 0;
  
  if (isLoading || isUserLoading || isLoadingApplication) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Job Not Found</h2>
        <p className="text-muted-foreground mt-2">
          The job listing you are looking for could not be found. It may have been removed.
        </p>
        <Button onClick={() => router.push('/careers')} className="mt-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Careers
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-secondary/30 pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
        <Button variant="ghost" onClick={() => router.back()} className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Jobs
        </Button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Badge>{job.department}</Badge>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4">{job.title}</h1>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>{job.type}</span>
              </div>
            </div>
            <Separator />
            <div className="prose dark:prose-invert max-w-none mt-8 whitespace-pre-wrap">
              <p>{job.description}</p>
            </div>
          </div>

          <div className="lg:col-span-1">
             { !user && <AuthGate /> }
             { user && hasApplied && userApplication && <ApplicationStatus application={userApplication[0]} /> }
             { user && !hasApplied && <ApplicationForm job={job} onApplicationSuccess={refetchApplication}/> }
          </div>
        </div>
      </div>
    </div>
  );
}
