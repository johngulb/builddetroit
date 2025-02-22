import React from "react";
import styled from "@emotion/styled";
import { NextSeo } from "next-seo";
import { ButtonLink } from "../../components/Styled";

const OwnershipPage = () => {
  return (
    <>
      <NextSeo
        title="Crypto Communities & Collective Organization | Learn"
        description="Learn how crypto communities organize collectively using blockchain technology, tokens, and decentralized governance."
      />
      <PageWrapper>
        <HeroSection>
          <HeroContent>
            <h1>Crypto Communities & Collective Organization</h1>
            <p>Discover how blockchain enables new forms of community coordination, ownership and governance through tokens, DAOs and decentralized systems</p>
          </HeroContent>
        </HeroSection>

        <ContentContainer>
          <Section>
            <h2>Types of Crypto Communities</h2>
            <Grid>
              <Card>
                <h3>Tokenized Communities</h3>
                <p>Communities powered by native tokens that represent ownership, governance rights and participation. Members can earn and use tokens to participate in decision-making.</p>
              </Card>
              <Card>
                <h3>DAOs (Decentralized Autonomous Organizations)</h3>
                <p>Organizations governed by smart contracts and token holders through transparent voting mechanisms and community-led decisions.</p>
              </Card>
              <Card>
                <h3>Creator Economies</h3>
                <p>Platforms enabling creators to monetize digital assets as NFTs with collective curation and community support for artistic growth.</p>
              </Card>
            </Grid>
          </Section>

          <Section>
            <h2>Key Components</h2>
            <BenefitsInfographic>
              <BenefitItem>
                <BenefitIcon>🏛️</BenefitIcon>
                <BenefitTitle>Decentralized Governance</BenefitTitle>
                <BenefitDescription>Token-based voting and community-driven decision making</BenefitDescription>
              </BenefitItem>
              <BenefitItem>
                <BenefitIcon>💰</BenefitIcon>
                <BenefitTitle>Economic Models</BenefitTitle>
                <BenefitDescription>Treasury management and tokenomics for sustainable growth</BenefitDescription>
              </BenefitItem>
              <BenefitItem>
                <BenefitIcon>🎯</BenefitIcon>
                <BenefitTitle>Incentives & Rewards</BenefitTitle>
                <BenefitDescription>Token incentives and POAPs for active participation</BenefitDescription>
              </BenefitItem>
              <BenefitItem>
                <BenefitIcon>🔐</BenefitIcon>
                <BenefitTitle>Digital Identity</BenefitTitle>
                <BenefitDescription>Decentralized identifiers for secure community access</BenefitDescription>
              </BenefitItem>
            </BenefitsInfographic>
          </Section>

          <Section>
            <h2>Building Blocks</h2>
            <Grid>
              <Card>
                <h3>Token Design</h3>
                <p>Creating utility tokens for governance, access and incentives with fair launch mechanisms and community distribution</p>
              </Card>
              <Card>
                <h3>Community Engagement</h3>
                <p>Dual-path onboarding, invite-only growth models and referral-based credibility systems</p>
              </Card>
              <Card>
                <h3>Leadership Roles</h3>
                <p>Community leaders, organizers and curators working together to enable decentralized growth</p>
              </Card>
            </Grid>
          </Section>

          <Section>
            <NextButton href="/learn/collective">
              Next: Collective Models
              <span>→</span>
            </NextButton>
          </Section>
        </ContentContainer>
      </PageWrapper>
    </>
  );
};

const PageWrapper = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const HeroSection = styled.div`
  background: linear-gradient(90deg, rgba(49,130,206,0.9), rgba(44,82,130,0.9)), url('/images/ownership-bg.jpg');
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
`;

const HeroContent = styled.div`
  text-align: center;
  color: white;
  padding: 0 2rem;
  max-width: 800px;

  h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    
    @media (max-width: 768px) {
      font-size: 2.25rem;
    }
  }

  p {
    font-size: 1.25rem;
    line-height: 1.6;
    opacity: 0.9;
    margin: 0 auto;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: -25px auto 0;
  padding: 3rem 2rem;
  position: relative;
  z-index: 2;
`;

const Section = styled.div`
  margin-bottom: 5rem;

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 3rem;
    text-align: center;
    color: #1a1a1a;
    
    &::after {
      content: '';
      display: block;
      width: 60px;
      height: 4px;
      background: #3182ce;
      margin: 1rem auto 0;
      border-radius: 2px;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin: 0 auto;
  max-width: 1400px;
`;

const Card = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05), 0 10px 20px rgba(0,0,0,0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.08), 0 15px 25px rgba(0,0,0,0.06);
  }

  h3 {
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 1.2rem;
    color: #2d3748;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #4a5568;
    margin-bottom: 0;
  }
`;

const BenefitsInfographic = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05), 0 10px 20px rgba(0,0,0,0.04);
`;

const BenefitItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: #f7fafc;
  border-radius: 8px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const BenefitIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const BenefitTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.8rem;
`;

const BenefitDescription = styled.p`
  font-size: 1.1rem;
  color: #4a5568;
  line-height: 1.5;
`;

const NextButton = styled(ButtonLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  max-width: 320px;
  margin: 3rem auto 0;
  font-size: 1.3rem;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 8px;
  background: #3182ce;
  color: white;
  transition: all 0.2s ease;
  
  span {
    font-size: 1.5rem;
    transition: transform 0.2s ease;
  }

  &:hover {
    background: #2c5282;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(49, 130, 206, 0.3);
    
    span {
      transform: translateX(6px);
    }
  }
`;

export default OwnershipPage;
