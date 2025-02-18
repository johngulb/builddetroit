import React from 'react';
import styled from '@emotion/styled';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
const PageWrapper = styled.div`
  font-family: Arial, sans-serif;
  line-height: 1.5;
  margin: 20px auto;
  padding: 20px;
  max-width: 800px;
  background-color: #f9f9f9;

  h1 {
    font-size: 1.75rem;
    color: #333;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.25rem;
    color: #333;
    margin: 1.5rem 0 0.75rem;
  }

  p {
    font-size: 0.9rem;
    color: #555;
    margin: 0.5rem 0;
  }

  ul {
    font-size: 0.9rem;
    color: #555;
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }

  li {
    margin: 0.25rem 0;
  }

  a {
    color: #007bff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const TermsPage = () => {
  return (
    <>
      <NextSeo
        title="Terms & Conditions | Renaissance City"
        description="Terms and conditions for using Renaissance City's services, including user responsibilities, content guidelines, SMS messaging terms, and more."
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/terms`}
        openGraph={{
          title: 'Terms & Conditions | Renaissance City',
          description: 'Terms and conditions for using Renaissance City\'s services, including user responsibilities, content guidelines, SMS messaging terms, and more.',
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/terms`,
          site_name: 'Renaissance City',
        }}
      />
      <PageWrapper>
        <h1>Terms & Conditions</h1>
        <p><strong>Effective Date:</strong> January 1, 2024</p>
        <p><strong>Last Updated:</strong> January 1, 2024</p>
        <h2>1. Acceptance of Terms</h2>
        <p>By using <strong>Renaissance City</strong> (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;), you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.</p>

        <h2>2. User Accounts & Responsibilities</h2>
        <p>To access certain features, you must create an account. You are responsible for securing your account credentials and complying with our <Link href="/community-guidelines">Community Guidelines</Link>.</p>

        <h2>3. User-Generated Content</h2>
        <p>You retain ownership of your content but grant us a non-exclusive license to use, distribute, and display it. Do not post illegal or copyrighted content without permission.</p>

        <h2>4. Prohibited Activities</h2>
        <ul>
          <li>Using the platform for illegal purposes.</li>
          <li>Harassing or threatening other users.</li>
          <li>Posting false, misleading, or spam content.</li>
          <li>Hacking or unauthorized access.</li>
        </ul>

        <h2>5. SMS Messaging Terms</h2>
        <p><strong>Opt-In & Consent:</strong> By providing your phone number, you consent to receive SMS messages from us.</p>
        <p><strong>Opt-Out:</strong> Reply <strong>STOP</strong> to unsubscribe at any time. Reply <strong>HELP</strong> for assistance.</p>
        <p><strong>Message & Data Rates:</strong> Standard carrier rates may apply.</p>
        <h2>6. Privacy Policy</h2>
        <p>We respect your privacy. View our <Link href="/privacy">Privacy Policy</Link> for details on how we handle your data.</p>

        <h2>7. Intellectual Property</h2>
        <p>All content and branding on this site belong to <strong>Renaissance City</strong>. You may not reproduce or distribute without permission.</p>

        <h2>8. Disclaimer & Limitation of Liability</h2>
        <p>We provide our services &ldquo;as-is&ldquo; without warranties. We are not responsible for service interruptions or data loss.</p>

        <h2>9. Changes to Terms</h2>
        <p>We may update these terms at any time. Continued use of our services means you accept the new terms.</p>

        <h2>10. Contact Information</h2>
        <p>For questions, contact us at:</p>
        <p>📧 <strong>Email:</strong> <a href="mailto:john@builddetroit.xyz">john@builddetroit.xyz</a></p>
        {/* <p>📞 <strong>Phone:</strong> (313) 555-0123</p> */}
      </PageWrapper>
    </>
  );
};

export default TermsPage;
