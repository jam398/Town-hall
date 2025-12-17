import { Metadata } from 'next';
import { AccentBar } from '@/components/ui/AccentBar';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Town Hall Newark privacy policy - how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-swiss-white">
      <section className="py-24 lg:py-32">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <AccentBar color="red" size="md" className="mb-6" />
            <h1 className="text-h1 font-bold text-swiss-black mb-8">
              Privacy Policy
            </h1>
            <p className="text-body-lg text-swiss-gray mb-12">
              Last updated: December 2024
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-h2 font-bold text-swiss-black mb-4">
                  Information We Collect
                </h2>
                <p className="text-body text-swiss-gray mb-4">
                  Town Hall Newark collects information you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body text-swiss-gray">
                  <li>Name and email address when you register for events</li>
                  <li>Contact information when you reach out to us</li>
                  <li>Volunteer application information</li>
                  <li>Newsletter subscription preferences</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-h2 font-bold text-swiss-black mb-4">
                  How We Use Your Information
                </h2>
                <p className="text-body text-swiss-gray mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body text-swiss-gray">
                  <li>Send event confirmations and reminders</li>
                  <li>Respond to your inquiries and requests</li>
                  <li>Send newsletters and community updates (with your consent)</li>
                  <li>Improve our programs and services</li>
                  <li>Coordinate volunteer activities</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-h2 font-bold text-swiss-black mb-4">
                  Information Sharing
                </h2>
                <p className="text-body text-swiss-gray">
                  We do not sell, trade, or otherwise transfer your personal information 
                  to third parties. We may share information with trusted partners who 
                  assist us in operating our website and conducting our programs, so long 
                  as those parties agree to keep this information confidential.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-h2 font-bold text-swiss-black mb-4">
                  Data Security
                </h2>
                <p className="text-body text-swiss-gray">
                  We implement appropriate security measures to protect your personal 
                  information. However, no method of transmission over the Internet is 
                  100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-h2 font-bold text-swiss-black mb-4">
                  Your Rights
                </h2>
                <p className="text-body text-swiss-gray mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body text-swiss-gray">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt out of marketing communications</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-h2 font-bold text-swiss-black mb-4">
                  Contact Us
                </h2>
                <p className="text-body text-swiss-gray">
                  If you have questions about this Privacy Policy, please contact us at{' '}
                  <a 
                    href="mailto:hello@townhallnewark.org" 
                    className="text-swiss-red hover:underline"
                  >
                    hello@townhallnewark.org
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
