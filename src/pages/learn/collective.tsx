import React from "react";
import styled from "@emotion/styled";
import { NextSeo } from "next-seo";
import { ButtonLink } from "../../components/Styled";

const CollectivePage = () => {
  return (
    <>
      <NextSeo
        title="Collective Ownership Models | Detroit Events"
        description="Explore the advantages and challenges of collective ownership models enabled by blockchain technology."
      />
      <PageWrapper>
        <HeroSection>
          <HeroContent>
            <h1>Collective Ownership Models</h1>
            <p>Understanding the benefits and challenges of shared ownership in the blockchain era</p>
          </HeroContent>
        </HeroSection>

        <ContentContainer>
          <Section>
            <h2>Key Benefits</h2>
            <Grid>
              <Card>
                <h3>Democratized Access</h3>
                <p>Collective ownership enables broader participation by lowering financial barriers to entry and distributing costs among members</p>
              </Card>
              <Card>
                <h3>Shared Resources</h3>
                <p>Pool capital, expertise, and other resources to achieve goals that would be difficult for individuals</p>
              </Card>
              <Card>
                <h3>Risk Distribution</h3>
                <p>Spread financial and operational risks across the collective rather than concentrating them on individuals</p>
              </Card>
            </Grid>
          </Section>

          <Section>
            <h2>Implementation Models</h2>
            <ComparisonTable>
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Description</th>
                  <th>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>DAOs</td>
                  <td>Decentralized autonomous organizations with token-based governance</td>
                  <td>Large-scale coordination</td>
                </tr>
                <tr>
                  <td>Cooperatives</td>
                  <td>Member-owned and operated organizations</td>
                  <td>Local communities</td>
                </tr>
                <tr>
                  <td>Fractional NFTs</td>
                  <td>Shared ownership of digital assets</td>
                  <td>Digital collectibles</td>
                </tr>
              </tbody>
            </ComparisonTable>
          </Section>

          <Section>
            <h2>Common Challenges</h2>
            <Grid>
              <Card>
                <h3>Decision Making</h3>
                <p>Coordinating diverse stakeholders and achieving consensus can slow down operations</p>
              </Card>
              <Card>
                <h3>Free Rider Issues</h3>
                <p>Managing contribution inequalities and ensuring fair participation from all members</p>
              </Card>
              <Card>
                <h3>Legal Complexity</h3>
                <p>Navigating regulatory requirements and establishing clear ownership frameworks</p>
              </Card>
            </Grid>
          </Section>

          <Section>
            <h2>Success Factors</h2>
            <Grid>
              <Card>
                <h3>Clear Governance</h3>
                <p>Well-defined rules and processes for decision-making and conflict resolution</p>
              </Card>
              <Card>
                <h3>Aligned Incentives</h3>
                <p>Mechanisms to reward contribution and participation while deterring harmful behavior</p>
              </Card>
              <Card>
                <h3>Technical Infrastructure</h3>
                <p>Robust platforms and tools to facilitate coordination and asset management</p>
              </Card>
            </Grid>
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

export default CollectivePage;
