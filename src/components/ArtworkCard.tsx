import React from "react";
import styled from "@emotion/styled";
import moment from "moment";
import { Tooltip } from "@mui/material";

import { Artwork } from "../interfaces";
import { convertDefaultToResized } from "../utils/image";

interface ArtworkCardProps {
  artwork: Artwork;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
  const imageUrl = artwork.data?.image;
  const artist = artwork.artist;
  const collaborators = artwork.collaborators || [];

  return (
    <CardWrapper href={`/artwork/${artwork.slug}`}>
      <div className="artwork-preview">
        <img src={convertDefaultToResized(imageUrl)} alt={artwork.title} />
      </div>
      <div className="artwork-info">
        <h2 dangerouslySetInnerHTML={{ __html: artwork.title }} />
        <div className="contributors">
          {artist && (
            <Tooltip title={`Artist: ${artist.name}`} arrow>
              <div className="profile-pic artist">
                <img
                  src={artist.profile_picture || "/default-avatar.png"}
                  alt={artist.name}
                />
              </div>
            </Tooltip>
          )}
          {collaborators.map((collaborator, i) => (
            <Tooltip key={i} title={`Collaborator: ${collaborator.name}`} arrow>
              <div className="profile-pic collaborator">
                <img
                  src={collaborator.profile_picture || "/default-avatar.png"}
                  alt={collaborator.name}
                />
              </div>
            </Tooltip>
          ))}
        </div>
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

    img,
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      padding: 0;
    }
  }

  .artwork-info {
    padding: 1rem;

    h2 {
      font-size: 1.2rem;
      margin: 0 0 0.5rem 0;
    }

    .contributors {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.5rem;

      .profile-pic {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          padding: 0;
        }
      }

      .artist {
        border: 2px solid #0070f3;
      }

      .collaborator {
        border: 2px solid #666;
      }
    }
  }
`;
