import React, { useState } from "react";
import styled from "@emotion/styled";
import { getArtworks } from "../../dpop";
import { ArtworkCard } from "../../components/ArtworkCard";
import Link from "next/link";
import { Tabs, Tab } from "@mui/material";
import { useRouter } from "next/router";

const ArtworksPage = ({ artworks }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("artwork");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
    if (newValue === "artists") {
      router.push("/artists");
    }
  };

  return (
    <PageWrapper>
      <HeaderSection>
        <h1>Gallery</h1>
        <CreateButton href="/artwork/create">Create New</CreateButton>
      </HeaderSection>

      <TabsContainer>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Artwork" value="artwork" />
          <Tab label="Artists" value="artists" />
        </Tabs>
      </TabsContainer>

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
