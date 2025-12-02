'use client';

import { useState, useEffect } from 'react';
import { useFirestore, useDoc, useUser } from '@/firebase';
import { doc, collection, serverTimestamp, setDoc } from 'firebase/firestore';
import { useMemoFirebase } from '@/firebase/provider';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, MapPin, Briefcase, Clock, ArrowLeft, Upload, FileText, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Progress } from '@/components/ui/progress';
import { AuthGate } from '@/components/auth-gate';

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

function ApplicationForm({ job }: { job: Job }) {
  const { user } = useUser();
  const { toast } = useToast();
  const firestore = useFirestore();

  const [applicantPhone, setApplicantPhone] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const applicationsCollectionRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'job_applications') : null),
    [firestore]
  );
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        toast({ variant: 'destructive', title: 'Invalid File Type', description: 'Please upload a PDF file.' });
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB
        toast({ variant: 'destructive', title: 'File Too Large', description: 'Please upload a file smaller than 5MB.' });
        return;
      }
      setResumeFile(file);
    }
  };

  const onApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job || !user || !applicationsCollectionRef) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not submit application. Please try again.' });
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    const newApplicationRef = doc(applicationsCollectionRef);
    const newApplicationId = newApplicationRef.id;

    try {
      let resumeUrl = '';

      if (resumeFile) {
        // Step 1: Upload the file if it exists
        const storage = getStorage();
        const storageRef = ref(storage, `resumes/${newApplicationId}/${resumeFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, resumeFile);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => {
              console.error("Upload error:", error);
              reject(error);
            },
            async () => {
              resumeUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      // Step 2: Save the application data to Firestore
      const applicationData = {
        jobId: job.id,
        jobTitle: job.title,
        userId: user.uid,
        userName: user.displayName || user.email,
        userEmail: user.email,
        phone: applicantPhone,
        resumeUrl: resumeUrl, // This will be an empty string if no file was uploaded
        submittedAt: serverTimestamp(),
      };

      await setDoc(newApplicationRef, applicationData);

      toast({
        title: 'Application Submitted!',
        description: 'Thank you for applying. We will review your application and be in touch.',
      });

      // Reset form
      setApplicantPhone('');
      setResumeFile(null);
      const fileInput = document.getElementById('resume') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }

    } catch (error) {
      console.error("Application submission error:", error);
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
      setUploadProgress(null);
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
            <Label htmlFor="resume">Resume (Optional, PDF, max 5MB)</Label>
                <div className="relative">
                <Input id="resume" type="file" accept=".pdf" onChange={handleFileChange} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" disabled={isSubmitting}/>
            </div>
            {resumeFile && !isSubmitting && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <FileText className="h-4 w-4" />
                <span>{resumeFile.name}</span>
                </div>
            )}
            </div>
            
            {isSubmitting && uploadProgress !== null && (
            <div className="space-y-2">
                <Label>Uploading Resume...</Label>
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-sm text-muted-foreground text-center">{Math.round(uploadProgress)}%</p>
            </div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
        </form>
        </CardContent>
    </Card>
  )
}

export default function JobDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.jobId as string;
  const { user, isUserLoading } = useUser();

  const firestore = useFirestore();
  const jobDocRef = useMemoFirebase(() => (firestore && jobId ? doc(firestore, 'jobs', jobId) : null), [firestore, jobId]);
  const { data: job, isLoading, error } = useDoc<Job>(jobDocRef);


  if (isLoading || isUserLoading) {
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
             { user ? <ApplicationForm job={job} /> : <AuthGate /> }
          </div>
        </div>
      </div>
    </div>
  );
}
