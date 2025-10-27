import { GraduationCap } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <GraduationCap className="h-8 w-8 text-primary" />
      <h1 className="text-xl font-bold font-headline text-foreground">
        EduPro Hub
      </h1>
    </div>
  );
}
