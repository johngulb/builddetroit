import React from "react";
import styled from "@emotion/styled";
import { NextSeo } from 'next-seo';
import CommunityCard from "../../components/CommunityCard";
import { Community, getCommunities } from "../../dpop";

interface CommunitiesPageProps {
  communities: Community[];
}

const CommunitiesPage = ({ communities }: CommunitiesPageProps) => {
  return (
    <PageWrapper>
      <NextSeo
        title="Detroit Communities | Connect & Engage"
        description="Discover and join Detroit's vibrant communities. Connect with like-minded people and engage in local events and initiatives."
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/communities`}
      />
      <PageContainer>
        <h1>Communities</h1>
        <div className="communities-grid">
          {communities.map((community: Community) => (
            <CommunityCard key={community.slug} community={community} />
          ))}
        </div>
      </PageContainer>
    </PageWrapper>
  );
};

export const getServerSideProps = async () => {
  try {
    const communities = await getCommunities();
    return {
      props: {
        communities,
      },
    };
  } catch (error) {
    console.error('Error fetching communities:', error);
    return {
      props: {
        communities: [],
      },
    };
  }
};

const PageWrapper = styled.div`
  background-color: #fafafa;
  max-width: 1200px;
  margin: auto;
`;

const PageContainer = styled.div`
  padding: 2rem;

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  .communities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  .community-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-4px);
    }
  }

  .community-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .community-content {
    padding: 1.5rem;

    h2 {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    p {
      color: #666;
      font-size: 1rem;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
`;

export default CommunitiesPage;
