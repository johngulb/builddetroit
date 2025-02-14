import styled from "@emotion/styled";
import { Tabs as MuiTabs, Tab as MuiTab } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const TabsContainer = styled.div`
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 1rem;
  .MuiTabs-root {   
    margin: auto;
    max-width: 1200px;
  }
    @media (max-width: 768px) {
    margin: 0;
    padding: 0 1rem;
  }
`;

interface TabsProps {
  tab: string;
}

export const TabNavigation = ({ tab }: TabsProps) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tab);

  const handleTabChange = (event: React.SyntheticEvent, value: string) => {
    setActiveTab(value);
    if (value === "home") {
      router.push("/");
    }
    if (value === "events") {
      router.push("/events");
    }
    if (value === "artists") {
      router.push("/artists");
    }
    if (value === "artwork") {
      router.push("/artwork");
    }
  };

  return (
    <TabsContainer>
      <MuiTabs value={activeTab} onChange={handleTabChange}>
        <MuiTab label="Home" value="home" />
        <MuiTab label="Events" value="events" />
        <MuiTab label="Artwork" value="artwork" />
        <MuiTab label="Artists" value="artists" />
      </MuiTabs>
    </TabsContainer>
  );
};