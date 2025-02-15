import React from "react";
import styled from "@emotion/styled";
import { NextSeo } from "next-seo";
import { ButtonLink } from "../../components/Styled";
import Link from "next/link";

const KeyOwnershipPage = () => {
  return (
    <>
      <NextSeo
        title="Digital Sovereignty & Key Ownership | Detroit Events"
        description="Learn about digital sovereignty through private key ownership, the risks involved, and social recovery options."
      />
      <PageWrapper>
        <HeroSection>
          <HeroContent>
            <h1>Digital Sovereignty Through Key Ownership</h1>
            <p>Discover how controlling your private keys gives you true ownership and independence over your digital assets, while understanding the risks and recovery options</p>
          </HeroContent>
        </HeroSection>

        <ContentContainer>
          <Section>
            <h2>Understanding Private Keys</h2>
            <Grid>
              <Card>
                <h3>What is a Private Key?</h3>
                <p>A private key is a secure code that proves your ownership and allows you to control your digital assets. Think of it as a master password that can never be reset.</p>
              </Card>
              <Card>
                <h3>Your Keys, Your Responsibility</h3>
                <p>When you control your private keys, you have direct ownership without intermediaries - but you&apos;re also solely responsible for their security.</p>
              </Card>
              <Card>
                <h3>Key Storage Risks</h3>
                <p>Private keys can be lost, stolen, or compromised. Poor storage practices like keeping keys on an internet-connected device can lead to theft.</p>
              </Card>
            </Grid>
          </Section>

          <Section>
            <h2>Key Management Trade-offs</h2>
            <ComparisonTable>
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>Benefits</th>
                  <th>Risks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Self-Custody</td>
                  <td>Complete control over assets</td>
                  <td>Full responsibility for security</td>
                </tr>
                <tr>
                  <td>Key Storage</td>
                  <td>Direct access to funds</td>
                  <td>Risk of permanent loss if key lost</td>
                </tr>
                <tr>
                  <td>Social Recovery</td>
                  <td>Backup access through trusted contacts</td>
                  <td>Requires careful guardian selection</td>
                </tr>
              </tbody>
            </ComparisonTable>
          </Section>

          <Section>
            <h2>Social Recovery Solutions</h2>
            <Grid>
              <Card>
                <h3>Guardian Network</h3>
                <p>Designate trusted friends or family members who can help recover access to your assets if you lose your key</p>
              </Card>
              <Card>
                <h3>Multi-Signature Setup</h3>
                <p>Split control among multiple keys, requiring a threshold of signatures to access funds</p>
              </Card>
              <Card>
                <h3>Recovery Best Practices</h3>
                <p>Regular verification of recovery methods and guardian contact information helps ensure you can regain access when needed</p>
              </Card>
            </Grid>
          </Section>

          <Section>
            <NextButton href="/learn/cryptography">
              Next: Cryptographic Security
              <span>→</span>
            </NextButton>
          </Section>
        </ContentContainer>
      </PageWrapper>
    </>
  );
};

const PageWrapper = styled.div`
  background-color: #fafafa;
`;

const HeroSection = styled.div`
  background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/images/blockchain-bg.jpg');
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 2rem;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Section = styled.section`
  margin-bottom: 4rem;

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
`;

const ComparisonTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background: #28303d;
    color: white;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const NextButton = styled(ButtonLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  max-width: 300px;
  margin: 2rem auto 0;
  font-size: 1.2rem;
  padding: 0.8rem 1.5rem;
  
  span {
    font-size: 1.4rem;
    transition: transform 0.2s ease;
  }

  &:hover span {
    transform: translateX(4px);
  }
`;

export default KeyOwnershipPage;
