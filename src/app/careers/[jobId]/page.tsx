'use client';

import { useState } from 'react';
import { useFirestore, useDoc, setDocumentNonBlocking } from '@/firebase';
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

export default function JobDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const jobId = params.jobId as string;

  const firestore = useFirestore();
  const jobDocRef = useMemoFirebase(() => (firestore && jobId ? doc(firestore, 'jobs', jobId) : null), [firestore, jobId]);
  const { data: job, isLoading, error } = useDoc<Job>(jobDocRef);

  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
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
    if (!job || !resumeFile || !applicantName || !applicantEmail || !applicationsCollectionRef) {
      toast({ variant: 'destructive', title: 'Missing Information', description: 'Please fill out all required fields and upload your resume.' });
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
        const storage = getStorage();
        // Create a new document reference with a unique ID first
        const newApplicationRef = doc(applicationsCollectionRef);
        const newApplicationId = newApplicationRef.id;
    
        const storageRef = ref(storage, `resumes/${newApplicationId}/${resumeFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, resumeFile);
    
        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          }, 
          (error) => {
            console.error("Upload error:", error);
            toast({
              variant: 'destructive',
              title: 'Upload Failed',
              description: error.message || 'An unexpected error occurred during upload. Please try again.',
            });
            setIsSubmitting(false);
            setUploadProgress(null);
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // Save application to Firestore using the pre-generated document reference
              const applicationData = {
                jobId: job.id,
                jobTitle: job.title,
                name: applicantName,
                email: applicantEmail,
                phone: applicantPhone,
                resumeUrl: downloadURL,
                submittedAt: serverTimestamp(),
              };

              setDoc(newApplicationRef, applicationData).then(() => {
                toast({
                    title: 'Application Submitted!',
                    description: 'Thank you for applying. We will review your application and be in touch.',
                });
    
                // Reset form
                setApplicantName('');
                setApplicantEmail('');
                setApplicantPhone('');
                setResumeFile(null);
                const fileInput = document.getElementById('resume') as HTMLInputElement;
                if (fileInput) {
                    fileInput.value = '';
                }
                setIsSubmitting(false);
                setUploadProgress(null);
              }).catch((firestoreError) => {
                console.error("Firestore save error:", firestoreError);
                toast({
                    variant: 'destructive',
                    title: 'Submission Failed',
                    description: 'Your resume was uploaded, but we failed to save your application. Please try again.',
                });
                setIsSubmitting(false);
                setUploadProgress(null);
              });
            }).catch((err) => {
                console.error("Get Download URL error:", err);
                toast({
                  variant: 'destructive',
                  title: 'Submission Failed',
                  description: err.message || 'An unexpected error occurred after upload. Please try again.',
                });
                setIsSubmitting(false);
                setUploadProgress(null);
            });
          }
        );
    } catch (error) {
        console.error("Application submission error:", error);
        toast({
            variant: 'destructive',
            title: 'Submission Failed',
            description: 'An unexpected error occurred. Please try again.',
        });
        setIsSubmitting(false);
        setUploadProgress(null);
    }
  };

  if (isLoading) {
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
            <Card>
              <CardHeader>
                <CardTitle>Apply for this Position</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={onApplicationSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" required value={applicantName} onChange={e => setApplicantName(e.target.value)} disabled={isSubmitting} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" required value={applicantEmail} onChange={e => setApplicantEmail(e.target.value)} disabled={isSubmitting} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input id="phone" placeholder="+1 234 567 890" value={applicantPhone} onChange={e => setApplicantPhone(e.target.value)} disabled={isSubmitting} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resume">Resume (PDF, max 5MB)</Label>
                      <div className="relative">
                      <Input id="resume" type="file" accept=".pdf" onChange={handleFileChange} required className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" disabled={isSubmitting}/>
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
          </div>
        </div>
      </div>
    </div>
  );
}

    