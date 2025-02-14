import React from "react";
import styled from "@emotion/styled";
import { Artist } from "../../interfaces";
import { getArtist } from "../../dpop";
import { ArtworkCard } from "../../components/ArtworkCard";

interface ArtistPageProps {
  artist: Artist;
}

const ArtistPage = ({ artist }: ArtistPageProps) => {
  return (
    <PageWrapper>
      <ArtistHeader>
        <div className="artist-grid">
          <div className="artist-image">
            <img src={artist.profile_picture} alt={artist.name} />
          </div>
          <div className="artist-details">
            <h1>{artist.name}</h1>
            <p className="artist-bio">{artist.bio}</p>
          </div>
        </div>
      </ArtistHeader>

      <ArtistWorks>
        <h2>Works</h2>
        <div className="works-grid">
          {artist.artwork?.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      </ArtistWorks>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
`;

const ArtistHeader = styled.div`
  margin: 2rem 0;

  .artist-grid {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .artist-image {
    img {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: 8px;
    }
  }

  .artist-details {
    h1 {
      font-size: 2.5rem;
      margin: 0 0 1rem 0;
    }

    .artist-bio {
      font-size: 1.1rem;
      line-height: 1.6;
      color: #333;
    }
  }
`;

const ArtistWorks = styled.section`
  margin: 4rem 0;

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .works-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
`;

export async function getServerSideProps({ params }) {
  const artist = await getArtist(params.artist);
  
  return {
    props: {
      artist: artist
    }
  };
}

export default ArtistPage;
