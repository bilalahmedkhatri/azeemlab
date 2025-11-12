import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-5xl font-bold text-neutral-dark mb-6">
            Terms of Service
          </h1>
          <p className="text-gray-600 mb-12">
            Last Updated: January 2025
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600">
                By accessing and using AzeemLab&apos;s services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
                2. Services Description
              </h2>
              <p className="text-gray-600 mb-4">
                AzeemLab provides digital agency services including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Web design and development</li>
                <li>Branding and identity design</li>
                <li>SEO and digital marketing</li>
                <li>E-commerce solutions</li>
                <li>Strategy consulting</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
                3. Client Responsibilities
              </h2>
              <p className="text-gray-600 mb-4">
                Clients agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Respond to requests for feedback in a timely manner</li>
                <li>Provide necessary access to systems and materials</li>
                <li>Make payments according to agreed terms</li>
                <li>Not use our services for illegal purposes</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
                4. Payment Terms
              </h2>
              <p className="text-gray-600 mb-4">
                Payment terms are as follows:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>50% deposit required to begin work</li>
                <li>Remaining balance due upon project completion</li>
                <li>Invoices are payable within 15 days of receipt</li>
                <li>Late payments may incur additional fees</li>
                <li>All fees are non-refundable unless otherwise stated</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
                5. Intellectual Property
              </h2>
              <p className="text-gray-600 mb-4">
                Upon full payment:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Client owns the final deliverables created specifically for them</li>
                <li>AzeemLab retains rights to preliminary concepts and unused designs</li>
                <li>AzeemLab may use completed work in portfolio and marketing</li>
                <li>Third-party assets are subject to their respective licenses</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
                6. Project Timeline
              </h2>
              <p className="text-gray-600">
                Project timelines are estimates and may be subject to change based on client feedback, scope changes, or unforeseen circumstances. We will communicate any timeline adjustments promptly.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
                7. Revisions and Changes
              </h2>
              <p className="text-gray-600">
                Each project includes a specified number of revision rounds. Additional revisions beyond the agreed scope may incur extra charges. Major scope changes will require a new quote and timeline.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
                8. Termination
              </h2>
              <p className="text-gray-600">
                Either party may terminate services with written notice. Upon termination, client is responsible for payment of work completed to date. AzeemLab will deliver all completed work upon receipt of final payment.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
                9. Limitation of Liability
              </h2>
              <p className="text-gray-600">
                AzeemLab&apos;s liability is limited to the amount paid for services. We are not liable for indirect, incidental, or consequential damages arising from use of our services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
                10. Confidentiality
              </h2>
              <p className="text-gray-600">
                We maintain strict confidentiality of all client information and project details unless authorized to disclose or required by law.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
                11. Governing Law
              </h2>
              <p className="text-gray-600">
                These terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
                12. Contact Information
              </h2>
              <p className="text-gray-600">
                For questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-accent font-semibold mt-4">
                Email: legal@testweb.com<br />
                Phone: +92 (321) 300 93 21
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
