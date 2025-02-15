import React from "react";
import styled from "@emotion/styled";
import { NextSeo } from "next-seo";

const CryptographyPage = () => {
  return (
    <>
      <NextSeo
        title="Cryptography & Security | Detroit Events"
        description="Learn about cryptographic security and how public-private key pairs protect and authenticate blockchain transactions."
      />
      <PageWrapper>
        <HeroSection>
          <HeroContent>
            <h1>Cryptographic Security</h1>
            <p>Understand how public-private key pairs protect and authenticate your transactions</p>
          </HeroContent>
        </HeroSection>

        <ContentContainer>
          <Section>
            <h2>Key Concepts</h2>
            <Grid>
              <Card>
                <h3>Public-Private Key Pairs</h3>
                <p>Unique cryptographic keys that work together - private keys for signing transactions, public keys for verification</p>
              </Card>
              <Card>
                <h3>Digital Signatures</h3>
                <p>Cryptographic proof that a transaction was authorized by the owner of a private key</p>
              </Card>
              <Card>
                <h3>Transaction Security</h3>
                <p>Mathematical verification ensures only authorized users can access and transfer assets</p>
              </Card>
            </Grid>
          </Section>

          <Section>
            <h2>Security Features</h2>
            <ComparisonTable>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Protection Provided</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Private Key Security</td>
                  <td>Only the owner can initiate transactions</td>
                </tr>
                <tr>
                  <td>Signature Verification</td>
                  <td>Prevents transaction tampering and forgery</td>
                </tr>
                <tr>
                  <td>One-way Encryption</td>
                  <td>Private keys cannot be derived from public keys</td>
                </tr>
                <tr>
                  <td>Immutable Records</td>
                  <td>Transactions cannot be altered once confirmed</td>
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
  min-height: 100vh;
  background: #f5f5f5;
`;

const HeroSection = styled.div`
  background: #28303d;
  color: white;
  padding: 4rem 2rem;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Section = styled.section`
  margin: 3rem 0;

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
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

export default CryptographyPage;
