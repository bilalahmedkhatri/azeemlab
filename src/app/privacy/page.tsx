import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-5xl font-bold text-neutral-dark mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-12">
            Last Updated: January 2025
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
                1. Information We Collect
              </h2>
              <p className="text-gray-600 mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Name and contact information (email, phone number)</li>
                <li>Project details and requirements</li>
                <li>Payment and billing information</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-600 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process your transactions and send related information</li>
                <li>Communicate with you about services, updates, and promotions</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Monitor and analyze trends and usage</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
                3. Information Sharing
              </h2>
              <p className="text-gray-600 mb-4">
                We do not sell or rent your personal information to third parties. We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Service providers who assist in our operations</li>
                <li>Professional advisors (lawyers, accountants)</li>
                <li>Law enforcement when required by law</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
                4. Data Security
              </h2>
              <p className="text-gray-600">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
                5. Your Rights
              </h2>
              <p className="text-gray-600 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Access, update, or delete your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request restriction of processing your personal information</li>
                <li>Request transfer of your personal information</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
                6. Cookies
              </h2>
              <p className="text-gray-600">
                We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
                7. Changes to This Policy
              </h2>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
                8. Contact Us
              </h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-accent font-semibold mt-4">
                Email: privacy@azeemlab.com<br />
                Phone: +1 (555) 123-4567
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
