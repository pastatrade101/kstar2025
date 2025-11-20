
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TermsOfUsePage() {
  const lastUpdated = "July 31, 2024";

  return (
    <div className="bg-background text-foreground min-h-screen">
       <header className="sticky top-0 bg-background/80 backdrop-blur-lg border-b z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Terms of Use</h1>
            <Button asChild variant="outline">
                <Link href="/">
                    <ArrowLeft className="mr-2" />
                    Back to Home
                </Link>
            </Button>
        </div>
      </header>

      <main className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg dark:prose-invert">
          <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website (the "Site"), operated by Kstar (T) Group ("we," "us," or "our"), you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please do not use the Site.
          </p>

          <h2>2. Use of the Site</h2>
          <p>
            This Site provides information about Kstar (T) Group and its affiliated organizations: Kstar International, Kstar Malezi Foundation, and ClickData Tanzania. You are granted a limited, non-exclusive, non-transferable license to access and use the Site for informational and non-commercial purposes only.
          </p>
          <p>
            You agree not to use the Site for any unlawful purpose or in any way that could damage, disable, or impair the Site.
          </p>

          <h2>3. Intellectual Property</h2>
          <p>
            All content on this Site, including text, graphics, logos, images, and information, is the property of Kstar (T) Group or its content suppliers and is protected by international copyright and trademark laws. You may not modify, copy, distribute, transmit, display, or create derivative works from any content obtained from the Site without our prior written consent.
          </p>

          <h2>4. User Submissions</h2>
          <p>
            Our Site includes a contact form that allows you to send inquiries to us. By submitting information through the contact form, you grant us the right to use that information for the purpose of responding to your inquiry. You agree not to submit any content that is unlawful, defamatory, or otherwise objectionable.
          </p>

          <h2>5. Disclaimers</h2>
          <p>
            The information and materials on the Site are provided "as is" and without warranties of any kind, either express or implied. We do not warrant that the functions contained in the Site will be uninterrupted or error-free, that defects will be corrected, or that the Site or the server that makes it available are free of viruses or other harmful components.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            In no event shall Kstar (T) Group or its affiliates be liable for any direct, indirect, incidental, special, or consequential damages that result from the use of, or the inability to use, the Site or materials on the Site, even if we have been advised of the possibility of such damages.
          </p>

          <h2>7. Governing Law</h2>
          <p>
            These Terms of Use shall be governed by and construed in accordance with the laws of Tanzania, without giving effect to any principles of conflicts of law.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to change, modify, add, or remove portions of these Terms of Use at any time. Please check this page periodically for changes. Your continued use of the Site following the posting of changes will mean that you accept and agree to the changes.
          </p>
        </div>
      </main>
    </div>
  );
}
