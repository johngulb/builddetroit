import React from "react";
import styled from "@emotion/styled";
import { EventList } from "../components/Events/EventList";

import {
  getUser,
  getCommunities,
  getEvents,
  getArtworks,
  getArtists,
} from "../dpop";
import { Community, Contact, User } from "../interfaces";
import { getEnvironment } from "../utils/environment";
import { NextSeoProps } from "next-seo";
import CommunityCard from "../components/CommunityCard";
import { ArtworkCard } from "../components/ArtworkCard";
import Link from "next/link";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
`;

const PageContainer = styled.div`
  display: block;
  width: 100%;
  max-width: 1000px;
  margin: auto;
  padding: 0 1rem;

  .header {
    padding: 1rem;
    margin: 1rem 0;
  }
  .header-container {
    margin-top: -0.5rem;
  }
  img {
    padding: 0.5rem;
    margin: auto;
  }
  h1 {
    margin-bottom: 0.75rem;
    font-size: 2.5rem;
    @media only screen and (max-width: 822px) {
      font-size: 1.75rem;
    }
  }
  .section-title {
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: bold;
    text-align: left;
    margin-top: 1.5rem;
    @media only screen and (max-width: 822px) {
      font-size: 1.1rem;
      padding: 0 1rem;
    }
  }
  p {
    font-size: 0.9rem;
    margin: 0.75rem auto;
    @media only screen and (max-width: 822px) {
      margin: 0.5rem auto;
      font-size: 0.8rem;
    }
  }
  .build-btn {
    max-width: 240px;
    margin: auto;
  }

  @media only screen and (max-width: 822px) {
    padding: 0;
  }
`;

const ScrollSection = styled.div`
  padding: 0.5rem 0;

  @media only screen and (max-width: 822px) {
    width: 100vw;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding: 0.5rem 1rem;
    margin: 0 -1rem;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const ArtistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media only screen and (max-width: 822px) {
    display: flex;
    grid-template-columns: none;
  }
`;

const ArtworkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;

  @media only screen and (max-width: 822px) {
    display: flex;
    > * {
      flex: 0 0 90%;
    }
  }
`;

const CommunityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;

  @media only screen and (max-width: 822px) {
    display: flex;
    > * {
      flex: 0 0 70%;
    }
  }
`;

const ArtistCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  text-align: center;
  transition: transform 0.2s;

  @media only screen and (max-width: 822px) {
    flex: 0 0 33%;
  }

  &:hover {
    transform: translateY(-2px);
  }

  .artist-preview {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 0.5rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      padding: 0;
    }
  }

  .artist-info {
    h2 {
      font-size: 0.9rem;
      margin: 0 0 0.25rem 0;
    }

    p {
      font-size: 0.75rem;
      color: #666;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
`;

type HomePageLayout = "default" | "artnight" | "detroiter";
interface HomePageProps {
  events: any[];
  layout: HomePageLayout;
  meta: NextSeoProps;
  category: string;
  communities: Community[];
  artists: any[];
  artworks: any[];
}

const HomePage = ({
  events,
  layout,
  meta,
  category,
  communities,
  artists,
  artworks,
}: HomePageProps) => {
  const [showContactBox, setShowContactBox] = React.useState<boolean>(false);
  const [showAuth, setShowAuth] = React.useState<boolean>(false);
  const [contact, setContact] = React.useState<Contact>();
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    const user = getUser();
    setUser(user);
  }, []);

  return (
    <PageWrapper>
      <PageContainer>
        <h2 className="section-title">JOIN A COMMUNITY</h2>
        <ScrollSection>
          <CommunityGrid>
            {communities?.map((community: Community) => (
              <CommunityCard key={community.slug} community={community} variant="compact" />
            ))}
          </CommunityGrid>
        </ScrollSection>

        <h2 className="section-title">FIND EVENTS</h2>
        <ScrollSection>
          <EventList
            category={category}
            events={events}
            variant="compact"
            header={3}
            loadMore={true}
          />
        </ScrollSection>

        <h2 className="section-title">EXPLORE ARTWORK</h2>
        <ScrollSection>
          <ArtworkGrid>
            {artworks?.slice(0, 6).map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </ArtworkGrid>
        </ScrollSection>

        <h2 className="section-title">CONNECT WITH ARTISTS</h2>
        <ScrollSection>
          <ArtistGrid>
            {artists?.slice(0, 6).map((artist) => (
              <ArtistCard key={artist.id} href={`/artists/${artist.slug}`}>
                <div className="artist-preview">
                  <img
                    src={artist.profile_picture || "/default-avatar.png"}
                    alt={artist.name}
                  />
                </div>
                <div className="artist-info">
                  <h2>{artist.name}</h2>
                  <p>{artist.bio}</p>
                </div>
              </ArtistCard>
            ))}
          </ArtistGrid>
        </ScrollSection>
      </PageContainer>
    </PageWrapper>
  );
};

export const getServerSideProps = async () => {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const env = getEnvironment();

  try {
    // Use more modern fetch pattern with error handling
    const [events, communities, artworks, artists] = await Promise.all([
      getEvents({
        type: env.category,
        featured: true,
        limit: 18,
        offset: 0,
      }),
      getCommunities(),
      getArtworks(),
      getArtists(),
    ]);

    return {
      props: {
        events,
        communities,
        artworks,
        artists,
        category: env.category,
        layout: env.layout,
        meta: {
          title: env.site_name,
          description:
            env.layout === "artnight"
              ? "Art Night Detroit is a community-driven initiative that brings together artists, art enthusiasts, and community members for a night of creativity and connection. Our events feature live music, new local establishments, and opportunities to create art in a fun and supportive environment. Join us for an unforgettable night of art, culture, and community building."
              : "Our mission is to leverage open source technology to build a better future for Detroit. We are committed to provide educational resources that empower individuals and organizations to solve problems, innovate, and build the future they want to see.",
          canonical: url,
          openGraph: {
            url,
            type: "webpage",
            images: [
              {
                url: env.image,
              },
            ],
            site_name: env.site_name,
          },
        },
        headerProps: {
          mainRoute: "/",
        },
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    // Return empty arrays if fetch fails
    return {
      props: {
        events: [],
        communities: [],
        artworks: [],
        artists: [],
        layout: env.layout,
        meta: {
          title: env.site_name,
          description:
            env.layout === "artnight"
              ? "Art Night Detroit is a community-driven initiative that brings together artists, art enthusiasts, and community members for a night of creativity and connection."
              : "Our mission is to leverage open source technology to build a better future for Detroit.",
          canonical: url,
          openGraph: {
            url,
            type: "webpage",
            images: [{ url: env.image }],
            site_name: env.site_name,
          },
        },
        headerProps: {
          hideNavigation: true,
        },
      },
    };
  }
};
export default HomePage;

{
  /* <div className="header-container">
          <div>
            <AuthModal
              show={showAuth}
              setShow={setShowAuth}
              onAuthorized={handleAuthorized}
              mode="login"
            />
            <ContactBoxModal
              show={showContactBox}
              setShow={setShowContactBox}
              onSubmit={handleSubmitContact}
              onConfirmation={() => {}}
              bodyContent={
                <>
                  <div style={{ fontSize: 14, marginBottom: 8, marginTop: 16 }}>
                    <a
                      onClick={() => {
                        setShowContactBox(false);
                        setShowAuth(true);
                      }}
                      style={{ color: "blue", fontWeight: "bold" }}
                    >
                      Login
                    </a>{" "}
                    or enter your contact info below.
                  </div>
                </>
              }
              titleText={
                <>
                  <div style={{ marginBottom: 8, textTransform: "uppercase" }}>
                    JOIN BUILDERS IN DETROIT
                  </div>
                </>
              }
              buttonText="BUILD WITH US"
            />
          </div>
        </div>
        {contact && (
          <Form
            formID="1"
            populatedFields={{ email: contact?.email, cid: contact?.cid }}
          />
        )} */
}
