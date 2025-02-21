import React from "react";
import styled from "@emotion/styled";
import { NextSeo } from "next-seo";
import { ButtonLink } from "../../components/Styled";

const OwnershipPage = () => {
  return (
    <>
      <NextSeo
        title="Digital Communities & Collective Organization | Learn"
        description="Learn how digital communities can organize collectively using blockchain technology and new ownership models."
      />
      <PageWrapper>
        <HeroSection>
          <HeroContent>
            <h1>Digital Communities & Collective Organization</h1>
            <p>Discover how blockchain enables communities to coordinate, make decisions, and share ownership in new ways</p>
          </HeroContent>
        </HeroSection>

        <ContentContainer>
          <Section>
            <h2>Community Organization Models</h2>
            <Grid>
              <Card>
                <h3>Decentralized Autonomous Organizations (DAOs)</h3>
                <p>Community-owned entities where decisions are made collectively through transparent voting mechanisms</p>
              </Card>
              <Card>
                <h3>Social Coordination</h3>
                <p>Tools and frameworks for communities to align incentives and work together toward shared goals</p>
              </Card>
              <Card>
                <h3>Digital Commons</h3>
                <p>Shared resources and infrastructure governed by community members for collective benefit</p>
              </Card>
            </Grid>
          </Section>

          <Section>
            <h2>Benefits of Community Organization</h2>
            <ComparisonTable>
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>Benefits</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Collective Decision Making</td>
                  <td>Democratic processes that give voice to all members</td>
                </tr>
                <tr>
                  <td>Resource Sharing</td>
                  <td>Pooled resources and knowledge for greater impact</td>
                </tr>
                <tr>
                  <td>Network Effects</td>
                  <td>Growing value and opportunities as community expands</td>
                </tr>
                <tr>
                  <td>Shared Ownership</td>
                  <td>Equitable distribution of value created by the community</td>
                </tr>
              </tbody>
            </ComparisonTable>
          </Section>

          <Section>
            <h2>Community Building Blocks</h2>
            <Grid>
              <Card>
                <h3>Governance Systems</h3>
                <p>Clear frameworks for proposal submission, discussion, and collective decision making</p>
              </Card>
              <Card>
                <h3>Token Economics</h3>
                <p>Incentive structures that reward participation and align community interests</p>
              </Card>
              <Card>
                <h3>Contribution Tracking</h3>
                <p>Systems to recognize and reward member contributions to the community</p>
              </Card>
            </Grid>
          </Section>

          <Section>
            <NextButton href="/learn/sovereignty">
              Next: Sovereignty
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
  background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/images/ownership-bg.jpg');
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroContent = styled.div`
  text-align: center;
  color: white;
  padding: 0 1rem;
  max-width: 800px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Section = styled.div`
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

export default OwnershipPage;
