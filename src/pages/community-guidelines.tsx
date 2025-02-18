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

const CommunityGuidelinesPage = () => {
  return (
    <>
      <NextSeo
        title="Community Guidelines | Renaissance City"
        description="Community guidelines for Renaissance City, outlining expected behavior, content standards, and community values."
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/community-guidelines`}
        openGraph={{
          title: 'Community Guidelines | Renaissance City',
          description: 'Community guidelines for Renaissance City, outlining expected behavior, content standards, and community values.',
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/community-guidelines`,
          site_name: 'Renaissance City',
        }}
      />
      <PageWrapper>
        <h1>Community Guidelines</h1>
        <p>Welcome to Renaissance City! These guidelines help ensure our community remains inclusive, respectful, and valuable for everyone.</p>

        <h2>1. Be Respectful</h2>
        <ul>
          <li>Treat all members with respect and kindness</li>
          <li>Avoid hostile or discriminatory language</li>
          <li>Listen to different perspectives and engage constructively</li>
          <li>Respect others&apos; privacy and personal boundaries</li>
        </ul>

        <h2>2. Content Standards</h2>
        <ul>
          <li>Share authentic and accurate information</li>
          <li>Give credit when sharing others&apos; work</li>
          <li>Keep content relevant to the community&apos;s purpose</li>
          <li>Avoid spam, excessive self-promotion, or misleading content</li>
        </ul>

        <h2>3. Event Participation</h2>
        <ul>
          <li>Honor your RSVPs and arrive on time</li>
          <li>Follow venue-specific rules and guidelines</li>
          <li>Engage actively and professionally with other attendees</li>
          <li>Report any concerns to event organizers</li>
        </ul>

        <h2>4. Artist & Creator Guidelines</h2>
        <ul>
          <li>Accurately represent your work and credentials</li>
          <li>Respect intellectual property rights</li>
          <li>Maintain professional relationships with clients and collaborators</li>
          <li>Provide clear terms for commissions and sales</li>
        </ul>

        <h2>5. Safety & Security</h2>
        <ul>
          <li>Do not share personal information publicly</li>
          <li>Report suspicious or harmful behavior</li>
          <li>Use secure methods for transactions</li>
          <li>Follow platform security recommendations</li>
        </ul>

        <h2>6. Reporting Violations</h2>
        <p>If you witness behavior that violates these guidelines, please report it to our moderation team:</p>
        <ul>
          <li>Email: <a href="mailto:john@builddetroit.xyz">john@builddetroit.xyz</a></li>
          <li>Use the in-platform reporting tools</li>
          <li>Contact event organizers for immediate concerns during events</li>
        </ul>

        <h2>7. Consequences</h2>
        <p>Violations of these guidelines may result in:</p>
        <ul>
          <li>Content removal</li>
          <li>Temporary account suspension</li>
          <li>Permanent account termination</li>
          <li>Exclusion from events and activities</li>
        </ul>

        <p>For more information about our policies, please review our <Link href="/terms">Terms & Conditions</Link> and <Link href="/privacy">Privacy Policy</Link>.</p>
      </PageWrapper>
    </>
  );
};

export default CommunityGuidelinesPage;
