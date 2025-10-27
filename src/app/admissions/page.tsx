import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const admissionData = {
  applicationProcess: [
    {
      title: 'Step 1: Online Application',
      content:
        'Complete and submit our online application form. You will be asked to provide personal information, academic history, and a personal statement.',
    },
    {
      title: 'Step 2: Submit Documents',
      content:
        'Upload all required documents, including official transcripts, letters of recommendation, and standardized test scores (if applicable).',
    },
    {
      title: 'Step 3: Application Fee',
      content:
        'Pay the non-refundable application fee of $50. Fee waivers are available for eligible students.',
    },
    {
      title: 'Step 4: Interview',
      content:
        'Selected candidates may be invited for an interview with an admissions officer. Interviews can be conducted in-person or online.',
    },
  ],
  deadlines: [
    {
      title: 'Early Decision Deadline',
      content: 'November 1st. Applicants will receive a decision by mid-December.',
    },
    {
      title: 'Regular Decision Deadline',
      content: 'January 15th. Applicants will receive a decision by late March.',
    },
    {
      title: 'Financial Aid Application (FAFSA/CSS Profile)',
      content: 'February 1st. Ensure all financial aid forms are submitted to be considered for aid packages.',
    },
  ],
  financialAid: [
    {
      title: 'Types of Aid',
      content:
        'We offer a variety of financial aid options, including need-based grants, merit scholarships, federal loans, and work-study programs.',
    },
    {
      title: 'How to Apply',
      content:
        'To apply for financial aid, you must complete the Free Application for Federal Student Aid (FAFSA) and the CSS Profile. Our school codes are available on the financial aid office website.',
    },
    {
      title: 'Scholarships',
      content:
        'All applicants are automatically considered for merit-based scholarships. No separate application is required. Scholarship recipients are notified with their admission offer.',
    },
  ],
};

export default function AdmissionsPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 max-w-4xl mx-auto">
      <header className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          Admissions
        </h1>
        <p className="text-muted-foreground mt-2">
          Your journey to EduPro Hub starts here.
        </p>
      </header>

      <div className="space-y-8">
        <div>
          <h2 className="font-headline text-2xl mb-4">Application Process</h2>
          <Accordion type="single" collapsible className="w-full">
            {admissionData.applicationProcess.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div>
          <h2 className="font-headline text-2xl mb-4">Important Deadlines</h2>
          <Accordion type="single" collapsible className="w-full">
            {admissionData.deadlines.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div>
          <h2 className="font-headline text-2xl mb-4">Financial Aid & Scholarships</h2>
          <Accordion type="single" collapsible className="w-full">
            {admissionData.financialAid.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
