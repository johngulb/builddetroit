export const PIZZA_SCAVENGER_HUNT = {
  event_name: "PizzaDAO Scavenger Hunt",
  description:
    "Join us for an interactive scavenger hunt across the city! Visit participating pizza spots, complete challenges, and earn rewards powered by PizzaDAO.",
  start_date: "2025-03-15",
  end_date: "2025-03-22",
  rules: {
    "1": "Participants must check in at each location using a QR code or blockchain verification.",
    "2": "Each completed challenge earns points. The top participants will win prizes.",
    "3": "Bonus points for social media shares using #PizzaDAOHunt.",
    "4": "All tasks must be completed within the event timeframe.",
    "5": "Proof of completion (photo or receipt) may be required for some challenges.",
  },
  tasks: [
    {
      task_id: 1,
      description:
        "Take a selfie with the restaurant's logo and post on Twitter/X with #PizzaDAOHunt.",
      points: 10,
    },
    {
      task_id: 2,
      description:
        "Order a pizza at a participating location and scan the QR code on your receipt.",
      points: 15,
    },
    {
      task_id: 3,
      description:
        "Find the hidden pizza-themed NFT QR code at a designated location and claim it.",
      points: 20,
    },
    {
      task_id: 4,
      description:
        "Participate in a community challenge, such as leaving a positive review for the restaurant.",
      points: 10,
    },
    {
      task_id: 5,
      description:
        "Complete all 5 location check-ins to unlock a bonus reward.",
      points: 50,
    },
  ],
  participating_locations: [
    {
      location_id: 1,
      name: "Detroit Slice House",
      address: "123 Main St, Detroit, MI",
      qr_code_url: "https://example.com/qrcode1",
      special_offer: "10% off any pizza for scavenger hunt participants",
    },
    {
      location_id: 2,
      name: "Motor City Pizza Spot",
      address: "456 Woodward Ave, Detroit, MI",
      qr_code_url: "https://example.com/qrcode2",
      special_offer: "Free drink with any large pizza",
    },
    {
      location_id: 3,
      name: "Deep Dish Delight",
      address: "789 Gratiot Ave, Detroit, MI",
      qr_code_url: "https://example.com/qrcode3",
      special_offer: "Buy one, get one free slice",
    },
    {
      location_id: 4,
      name: "Crypto Crust Pizza",
      address: "321 Brush St, Detroit, MI",
      qr_code_url: "https://example.com/qrcode4",
      special_offer: "Exclusive NFT collectible for participants",
    },
    {
      location_id: 5,
      name: "Blockchain Bites Pizzeria",
      address: "555 Cass Ave, Detroit, MI",
      qr_code_url: "https://example.com/qrcode5",
      special_offer: "Chance to win a free pizza for a year!",
    },
  ],
  rewards: {
    top_3_participants: [
      {
        rank: 1,
        reward: "1 ETH + VIP Pizza Party + Limited Edition PizzaDAO NFT",
      },
      {
        rank: 2,
        reward: "0.5 ETH + Free Pizza for a Month + PizzaDAO NFT",
      },
      {
        rank: 3,
        reward: "0.25 ETH + $50 Pizza Gift Card + PizzaDAO NFT",
      },
    ],
    completion_reward:
      "Exclusive PizzaDAO NFT + Discount Codes for Future Purchases",
    social_media_bonus:
      "10 extra points for every post with #PizzaDAOHunt (Max 3 posts per participant)",
  },
};

import React from "react";
import styled from "@emotion/styled";
import { Page } from "../../components/Page";
import Hero from "../../components/Hero";

const PizzaHuntPage = () => {
  return (
    <Page
      meta={{
        title: "Detroit Pizza DAO Scavenger Hunt",
        description: "Join the ultimate pizza scavenger hunt across Detroit and win crypto rewards!",
      }}
      headerProps={{
        disableDPoP: false,
        hideFooter: false,
      }}
    >
      <Hero
        title="Detroit Pizza DAO Scavenger Hunt"
        subtitle="Hunt for QR codes at Detroit's best pizzerias and win ETH rewards!"
        image="/images/pizza-banner.jpg"
      />

      <PageContainer>
        <Section>
          <h2>How It Works</h2>
          <ol>
            <li>Visit participating pizza locations across Detroit</li>
            <li>Scan unique QR codes at each location</li>
            <li>Share on social media with #PizzaDAOHunt</li>
            <li>Earn points and compete for ETH prizes!</li>
          </ol>
        </Section>

        <Section>
          <h2>Participating Locations</h2>
          <LocationGrid>
            {PIZZA_SCAVENGER_HUNT.participating_locations.map((location) => (
              <LocationCard key={location.location_id}>
                <h3>{location.name}</h3>
                <p>{location.address}</p>
                <SpecialOffer>{location.special_offer}</SpecialOffer>
              </LocationCard>
            ))}
          </LocationGrid>
        </Section>

        <Section>
          <h2>Rewards</h2>
          <RewardsContainer>
            <TopRewards>
              {PIZZA_SCAVENGER_HUNT.rewards.top_3_participants.map((reward) => (
                <RewardCard key={reward.rank}>
                  <h3>#{reward.rank}</h3>
                  <p>{reward.reward}</p>
                </RewardCard>
              ))}
            </TopRewards>

            <BonusRewards>
              <div>
                <h3>Completion Reward</h3>
                <p>{PIZZA_SCAVENGER_HUNT.rewards.completion_reward}</p>
              </div>
              <div>
                <h3>Social Media Bonus</h3>
                <p>{PIZZA_SCAVENGER_HUNT.rewards.social_media_bonus}</p>
              </div>
            </BonusRewards>
          </RewardsContainer>
        </Section>
      </PageContainer>
    </Page>
  );
};

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Section = styled.section`
  margin-bottom: 4rem;

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  ol {
    max-width: 600px;
    margin: 0 auto;
    padding-left: 2rem;
    
    li {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }
  }
`;

const LocationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const LocationCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  h3 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    margin-bottom: 1rem;
  }
`;

const SpecialOffer = styled.div`
  background: #f8f8f8;
  padding: 0.8rem;
  border-radius: 4px;
  font-weight: 500;
  color: #333;
`;

const RewardsContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const TopRewards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
`;

const RewardCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #1a1a1a;
  }

  p {
    color: #666;
  }
`;

const BonusRewards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  text-align: center;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
  }
`;

export default PizzaHuntPage;
