import { Metadata } from 'next';
import { AccentBar } from '@/components/ui/AccentBar';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Town Hall Newark terms of service - guidelines for using our website and services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-swiss-white">
      <section className="py-24 lg:py-32">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <AccentBar color="red" size="md" className="mb-6" />
            <h1 className="text-h1 font-bold text-swiss-black mb-8">
              Terms of Service
            </h1>
            <p className="text-body-lg text-swiss-gray mb-12">
              Last updated: December 2024
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-h2 font-bold text-swiss-black mb-4">
                  Acceptance of Terms
                </h2>
                <p className="text-body text-swiss-gray">
                  By accessing and using the Town Hall Newark website and services, you 
                  accept and agree to be bound by these Terms of Service. If you do not 
                  agree to these terms, please do not use our services.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-h2 font-bold text-swiss-black mb-4">
                  Use of Services
                </h2>
                <p className="text-body text-swiss-gray mb-4">
                  Our services are provided for educational and community purposes. You agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body text-swiss-gray">
                  <li>Provide accurate information when registering for events</li>
                  <li>Respect other community members and staff</li>
                  <li>Not use our services for any unlawful purpose</li>
                  <li>Not attempt to disrupt or interfere with our services</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-h2 font-bold text-swiss-black mb-4">
                  Event Registration
                </h2>
                <p className="text-body text-swiss-gray">
                  When you register for an event, you agree to attend or cancel your 
                  registration in advance if you cannot attend. Repeated no-shows may 
                  result in restricted access to future event registrations.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-h2 font-bold text-swiss-black mb-4">
                  Intellectual Property
                </h2>
                <p className="text-body text-swiss-gray">
                  All content on this website, including text, graphics, logos, and 
                  images, is the property of Town Hall Newark or its content suppliers 
                  and is protected by intellectual property laws.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-h2 font-bold text-swiss-black mb-4">
                  Disclaimer
                </h2>
                <p className="text-body text-swiss-gray">
                  Our services are provided &quot;as is&quot; without warranties of any kind. 
                  We do not guarantee that our services will be uninterrupted or error-free.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-h2 font-bold text-swiss-black mb-4">
                  Limitation of Liability
                </h2>
                <p className="text-body text-swiss-gray">
                  Town Hall Newark shall not be liable for any indirect, incidental, 
                  special, or consequential damages arising from your use of our services.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-h2 font-bold text-swiss-black mb-4">
                  Changes to Terms
                </h2>
                <p className="text-body text-swiss-gray">
                  We reserve the right to modify these terms at any time. Changes will 
                  be effective immediately upon posting to this page.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-h2 font-bold text-swiss-black mb-4">
                  Contact Us
                </h2>
                <p className="text-body text-swiss-gray">
                  If you have questions about these Terms of Service, please contact us at{' '}
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
