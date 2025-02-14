import React from "react";
import styled from "@emotion/styled";
import { getArtworks } from "../../dpop";
import { ArtworkCard } from "../../components/ArtworkCard";

const ArtworksPage = ({ artworks }) => {
  return (
    <PageWrapper>
      <h1>Artwork</h1>
      <ArtworkGrid>
        {artworks.map((artwork) => (
          <ArtworkCard 
            key={artwork.id}
            artwork={artwork}
          />
        ))}
      </ArtworkGrid>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  background-color: #fafafa;
  max-width: 1200px;
  margin: auto;
  padding: 2rem;

  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const ArtworkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

export async function getServerSideProps() {
  const artworks = await getArtworks();
  
  return {
    props: {
      artworks
    }
  };
}

export default ArtworksPage;

