import React from "react";
import styled from "@emotion/styled";
import { NextSeo } from "next-seo";
import { ButtonLink } from "../../components/Styled";
import Link from "next/link";

const LearnPage = () => {
  return (
    <>
      <NextSeo
        title="Learn About Blockchain & Investment | Detroit Events"
        description="Educational resources about blockchain technology, cryptocurrency, and smart investment strategies."
      />
      <PageWrapper>
        <HeroSection>
          <HeroContent>
            <h1>Learn About Blockchain & Investment</h1>
            <p>Discover how blockchain technology is revolutionizing finance and creating new investment opportunities</p>
            <ButtonLink href="/learn/ownership">Learn About Ownership</ButtonLink>
          </HeroContent>
        </HeroSection>

        <ContentContainer>
          <Section>
            <h2>Why Blockchain Matters</h2>
            <Grid>
              <Card>
                <h3>Decentralization</h3>
                <p>No single entity controls the network, making it more resistant to manipulation and censorship</p>
              </Card>
              <Card>
                <h3>Transparency</h3>
                <p>All transactions are recorded on a public ledger that anyone can verify</p>
              </Card>
              <Card>
                <h3>Security</h3>
                <p>Cryptographic technology ensures your assets are protected and transactions are secure</p>
              </Card>
            </Grid>
          </Section>

          <Section>
            <h2>Public-Private Key Cryptography</h2>
            <Grid>
              <Card>
                <h3>Digital Sovereignty</h3>
                <p>Control your own private keys to achieve true ownership and financial independence</p>
                <ButtonLink href="/learn/sovereignty">Learn More</ButtonLink>
              </Card>
              <Card>
                <h3>Cryptographic Security</h3>
                <p>Understand how public-private key pairs protect and authenticate your transactions</p>
                <ButtonLink href="/learn/cryptography">Learn More</ButtonLink>
              </Card>
              <Card>
                <h3>Self-Custody</h3>
                <p>Learn why being your own bank brings both freedom and responsibility</p>
                <ButtonLink href="/learn/custody">Learn More</ButtonLink>
              </Card>
            </Grid>
          </Section>

          <Section>
            <h2>Blockchain Advantages</h2>
            <ComparisonTable>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Traditional Finance</th>
                  <th>Blockchain</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Transaction Speed</td>
                  <td>Days for settlement</td>
                  <td>Minutes or seconds</td>
                </tr>
                <tr>
                  <td>Accessibility</td>
                  <td>Limited by location & status</td>
                  <td>Global & inclusive</td>
                </tr>
                <tr>
                  <td>Costs</td>
                  <td>High fees & intermediaries</td>
                  <td>Lower fees, direct transfers</td>
                </tr>
              </tbody>
            </ComparisonTable>
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
  text-align: center;
  color: white;
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 2rem;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
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

export default LearnPage;
