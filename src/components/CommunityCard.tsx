import React from 'react';
import styled from '@emotion/styled';

import { Community } from '../dpop';

interface CommunityCardProps {
  community: Community;
  variant?: 'default' | 'compact';
}

const CommunityCard = ({ community, variant = 'default' }: CommunityCardProps) => {
  const { name, description, image, slug } = community;
  
  return (
    <CardWrapper 
      href={`/communities/${slug}`} 
      rel="noopener noreferrer"
      variant={variant}
    >
      {image && (
        <ImageContainer variant={variant}>
          <img src={image} alt={name} />
        </ImageContainer>
      )}
      <ContentContainer variant={variant}>
        <h3>{name}</h3>
        <p>{description}</p>
      </ContentContainer>
    </CardWrapper>
  );
};

const CardWrapper = styled.a<{variant: 'default' | 'compact'}>`
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

const ImageContainer = styled.div<{variant: 'default' | 'compact'}>`
  width: 100%;
  height: ${props => props.variant === 'compact' ? '120px' : '200px'};
  flex-shrink: 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    padding: 0;
  }
`;

const ContentContainer = styled.div<{variant: 'default' | 'compact'}>`
  padding: ${props => props.variant === 'compact' ? '0.75rem' : '1.5rem'};
  flex-grow: 1;

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: ${props => props.variant === 'compact' ? '1rem' : '1.25rem'};
    font-weight: bold;
  }

  p {
    margin: 0;
    font-size: ${props => props.variant === 'compact' ? '0.875rem' : '1rem'};
    color: #666;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export default CommunityCard;
