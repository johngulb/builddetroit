import React from 'react';
import styled from '@emotion/styled';

import { Community } from '../dpop';

interface CommunityCardProps {
  community: Community;
}

const CommunityCard = ({ community }: CommunityCardProps) => {
  const { name, description, image, slug } = community;
  
  return (
    <CardWrapper href={`/communities/${slug}`} target="_blank" rel="noopener noreferrer">
      {image && (
        <ImageContainer>
          <img src={image} alt={name} />
        </ImageContainer>
      )}
      <ContentContainer>
        <h3>{name}</h3>
        <p>{description}</p>
      </ContentContainer>
    </CardWrapper>
  );
};

const CardWrapper = styled.a`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  text-decoration: none;
  color: inherit;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    padding: 0;
  }
`;

const ContentContainer = styled.div`
  padding: 1.5rem;

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    font-weight: bold;
  }

  p {
    margin: 0;
    font-size: 1rem;
    color: #666;
    line-height: 1.5;
  }
`;

export default CommunityCard;

