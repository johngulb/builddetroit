import React, { useState } from "react";
import styled from "@emotion/styled";
import { getArtworks } from "../../dpop";
import { ArtworkCard } from "../../components/ArtworkCard";
import Link from "next/link";
import { useRouter } from "next/router";

const ArtworksPage = ({ artworks }) => {
  return (
    <PageWrapper>
      <ArtworkGrid>
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
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

const ArtworkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

export async function getServerSideProps() {
  const artworks = await getArtworks();

  return {
    props: {
      artworks,
      headerProps: {
        mainRoute: "artwork",
      },
    },
  };
}

export default ArtworksPage;
