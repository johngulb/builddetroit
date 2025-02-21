import React from "react";
import styled from "@emotion/styled";
import { NextSeo } from "next-seo";
import { NextButton } from "../../components/Styled";
const SelfCustodyPage = () => {
  return (
    <>
      <NextSeo
        title="Self-Custody & Asset Security | Learn"
        description="Learn about self-custody of digital assets and how cryptographic security protects your holdings."
      />
      <PageWrapper>
        <HeroSection>
          <HeroContent>
            <h1>Self-Custody & Asset Security</h1>
            <p>Understand how cryptographic technology protects your digital assets and enables secure transactions</p>
          </HeroContent>
        </HeroSection>

        <ContentContainer>
          <Section>
            <h2>Core Security Features</h2>
            <Grid>
              <Card>
                <h3>Cryptographic Protection</h3>
                <p>Military-grade encryption secures your assets and transactions from unauthorized access</p>
              </Card>
              <Card>
                <h3>Immutable Records</h3>
                <p>Blockchain technology creates permanent, tamper-proof records of all transactions</p>
              </Card>
              <Card>
                <h3>Decentralized Security</h3>
                <p>No single point of failure means enhanced protection against attacks and system failures</p>
              </Card>
            </Grid>
          </Section>

          <Section>
            <h2>Security Best Practices</h2>
            <ComparisonTable>
              <thead>
                <tr>
                  <th>Practice</th>
                  <th>Benefits</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Hardware Wallets</td>
                  <td>Offline storage protected from online threats</td>
                </tr>
                <tr>
                  <td>Backup Seeds</td>
                  <td>Recovery protection against loss or damage</td>
                </tr>
                <tr>
                  <td>Multi-Signature</td>
                  <td>Additional security through multiple key requirements</td>
                </tr>
                <tr>
                  <td>Regular Audits</td>
                  <td>Proactive monitoring of asset security</td>
                </tr>
              </tbody>
            </ComparisonTable>
          </Section>

          <Section>
            <NextButton href="/learn/quiz">
              Test Your Knowledge
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
    font-size: 2.5rem;
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
  margin-bottom: 3rem;

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

export default SelfCustodyPage;
