import React, { useState } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { Artist } from "../../interfaces";
import { useRouter } from "next/router";
import { getArtists } from "../../dpop";
import Hero from "../../components/Hero";
import { TabNavigation } from "../../components/Tabs";

const ArtistsPage = ({ artists }: { artists: Artist[] }) => {
  return (
    <PageWrapper>
      <ArtistGrid>
        {artists.map((artist) => (
          <ArtistCard key={artist.id} href={`/artists/${artist.slug}`}>
            <div className="artist-preview">
              <img src={artist.profile_picture} alt={artist.name} />
            </div>
            <div className="artist-info">
              <h2>{artist.name}</h2>
              <p>{artist.bio}</p>
            </div>
          </ArtistCard>
        ))}
      </ArtistGrid>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  background-color: #fafafa;
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  h1 {
    font-size: 2rem;
    margin: 0;
  }
`;

const CreateButton = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: #0070f3;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    background-color: #0051cc;
  }
`;

const TabsContainer = styled.div`
  margin-bottom: 2rem;
  border-bottom: 1px solid #e0e0e0;

  .MuiTabs-root {
    min-height: 48px;
  }

  .MuiTab-root {
    text-transform: none;
    font-size: 1rem;
    font-weight: 500;
    min-height: 48px;
  }
`;

const ArtistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ArtistCard = styled(Link)`
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

  .artist-preview {
    aspect-ratio: 1;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .artist-info {
    padding: 1rem;

    h2 {
      font-size: 1.2rem;
      margin: 0 0 0.5rem 0;
    }

    p {
      font-size: 0.9rem;
      color: #666;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
`;

export async function getServerSideProps() {
  const artists = await getArtists();

  return {
    props: {
      artists: artists,
      headerProps: {
        mainRoute: "artists",
      },
    },
  };
}

export default ArtistsPage;
