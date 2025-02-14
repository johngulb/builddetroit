import React from 'react';
import styled from '@emotion/styled';
import moment from 'moment';

import { Artwork } from '../interfaces';


interface ArtworkCardProps {
  artwork: Artwork;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
  // Use data.image from Artwork interface
  const imageUrl = artwork.data?.image;

  return (
    <CardWrapper href={`/artwork/${artwork.id}`}>
      <div className="artwork-preview">
        <img src={imageUrl} alt={artwork.title} />
      </div>
      <div className="artwork-info">
        <h2 dangerouslySetInnerHTML={{ __html: artwork.title }} />
        {/* <div className="timestamp">
          {moment(artwork.created_at).format('MMMM Do, YYYY')}
        </div> */}
      </div>
    </CardWrapper>
  );
};

const CardWrapper = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }

  .artwork-preview {
    aspect-ratio: 16/9;
    overflow: hidden;
    
    img, video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .artwork-info {
    padding: 1rem;

    h2 {
      font-size: 1.2rem;
      margin: 0 0 0.5rem 0;
    }

    .timestamp {
      font-size: 0.9rem;
      color: #666;
    }
  }
`;

