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

const PrivacyPage = () => {
  return (
    <>
      <NextSeo
        title="Privacy Policy | Renaissance City"
        description="Privacy policy for Renaissance City, detailing how we collect, use, and protect your personal information."
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/privacy`}
        openGraph={{
          title: 'Privacy Policy | Renaissance City',
          description: 'Privacy policy for Renaissance City, detailing how we collect, use, and protect your personal information.',
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/privacy`,
          site_name: 'Renaissance City',
        }}
      />
      <PageWrapper>
        <h1>Privacy Policy</h1>
        <p><strong>Effective Date:</strong> January 1, 2024</p>
        <p><strong>Last Updated:</strong> January 1, 2024</p>

        <h2>1. Information We Collect</h2>
        <p>We collect information that you provide directly to us:</p>
        <ul>
          <li>Account information (name, email, password)</li>
          <li>Profile information (bio, profile picture)</li>
          <li>Communication preferences</li>
          <li>Event participation details</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul>
          <li>Provide and improve our services</li>
          <li>Communicate with you about events and updates</li>
          <li>Personalize your experience</li>
          <li>Ensure platform security</li>
        </ul>

        <h2>3. Information Sharing</h2>
        <p>We do not sell your personal information. We may share information:</p>
        <ul>
          <li>With your consent</li>
          <li>With service providers</li>
          <li>To comply with legal obligations</li>
          <li>To protect our rights and safety</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>We implement reasonable security measures to protect your information, including:</p>
        <ul>
          <li>Encryption of sensitive data</li>
          <li>Regular security assessments</li>
          <li>Access controls and monitoring</li>
          <li>Secure data storage</li>
        </ul>

        <h2>5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Opt-out of communications</li>
        </ul>

        <h2>6. Cookies and Tracking</h2>
        <p>We use cookies and similar technologies to:</p>
        <ul>
          <li>Remember your preferences</li>
          <li>Analyze site usage</li>
          <li>Improve user experience</li>
          <li>Provide targeted content</li>
        </ul>

        <h2>7. Children&apos;s Privacy</h2>
        <p>Our services are not intended for children under 13. We do not knowingly collect information from children under 13.</p>

        <h2>8. Changes to Privacy Policy</h2>
        <p>We may update this policy periodically. We will notify you of significant changes via email or site notification.</p>

        <h2>9. Contact Us</h2>
        <p>For privacy-related questions, contact us at:</p>
        <p>📧 <strong>Email:</strong> <a href="mailto:john@builddetroit.xyz">john@builddetroit.xyz</a></p>
        {/* <p>📞 <strong>Phone:</strong> (313) 555-0123</p> */}

        <p>For more information about using our platform, please review our <Link href="/terms">Terms & Conditions</Link> and <Link href="/community-guidelines">Community Guidelines</Link>.</p>
      </PageWrapper>
    </>
  );
};

export default PrivacyPage;
