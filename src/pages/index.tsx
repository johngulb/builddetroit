import React from "react";
import styled from "@emotion/styled";
import { EventList } from "../components/Events/EventList";
// import { EventCalendar } from "../components/Events/EventCalendar";

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
  max-width: 1200px;
  margin: auto;
  padding: 0 1rem;

  .header {
    padding: 0.75rem;
    margin: 0.75rem 0;
  }
  .header-container {
    margin-top: -0.25rem;
  }
  img {
    padding: 0.25rem;
    margin: auto;
  }
  h1 {
    margin-bottom: 0.5rem;
    font-size: 2rem;
    @media only screen and (max-width: 822px) {
      font-size: 1.5rem;
    }
  }
  .section-title {
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
    font-weight: bold;
    text-align: left;
    margin-top: 1.25rem;
    @media only screen and (max-width: 822px) {
      font-size: 1rem;
      padding: 0 0.75rem;
    }
  }
  p {
    font-size: 0.85rem;
    margin: 0.5rem auto;
    @media only screen and (max-width: 822px) {
      margin: 0.35rem auto;
      font-size: 0.75rem;
    }
  }
  .build-btn {
    max-width: 200px;
    margin: auto;
  }

  .more-info {
    h3 {
      margin-bottom: 0.25rem;
      font-size: 1.2rem;
    }
    p {
      margin: 0.25rem auto;
    }
    .time-range {
      font-size: 0.85rem;
      color: #666;
    }
    .venue {
      font-size: 0.85rem;
      color: #666;
    }
    .date-info-wrapper {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
    }
  }

  @media only screen and (max-width: 822px) {
    padding: 0;
  }
`;

const ScrollSection = styled.div`
  padding: 0.35rem 0;

  @media only screen and (max-width: 822px) {
    width: 100vw;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding: 0.35rem 0.75rem;
    margin: 0 -0.75rem;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const ArtistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.5rem;

  @media only screen and (max-width: 822px) {
    display: flex;
    grid-template-columns: none;
  }
`;

const ArtworkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;

  @media only screen and (max-width: 822px) {
    display: flex;
    > * {
      flex: 0 0 85%;
    }
  }
`;

const CommunityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;

  @media only screen and (max-width: 822px) {
    display: flex;
    > * {
      flex: 0 0 65%;
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
    flex: 0 0 30%;
  }

  &:hover {
    transform: translateY(-2px);
  }

  .artist-preview {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 0.35rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      padding: 0;
    }
  }

  .artist-info {
    h2 {
      font-size: 0.85rem;
      margin: 0 0 0.15rem 0;
    }

    p {
      font-size: 0.7rem;
      color: #666;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1.5fr);
  gap: 1.5rem;

  @media (max-width: 822px) {
    display: flex;
    flex-direction: column;
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
        <ContentWrapper>
          <GridContainer>
            <div>
              {layout !== "artnight" && (
                <>
                  <h2 className="section-title">JOIN A COMMUNITY</h2>
                  <ScrollSection>
                    <CommunityGrid>
                      {communities?.map((community: Community) => (
                        <CommunityCard
                          key={community.slug}
                          community={community}
                          variant="compact"
                        />
                      ))}
                    </CommunityGrid>
                  </ScrollSection>
                </>
              )}

              <h2 className="section-title">EXPLORE ARTWORK</h2>
              <ScrollSection>
                <ArtworkGrid>
                  {artworks?.slice(0, 60).map((artwork) => (
                    <ArtworkCard key={artwork.id} artwork={artwork} />
                  ))}
                </ArtworkGrid>
              </ScrollSection>

              <h2 className="section-title">CONNECT WITH ARTISTS</h2>
              <ScrollSection>
                <ArtistGrid>
                  {artists?.slice(0, 60).map((artist) => (
                    <ArtistCard
                      key={artist.id}
                      href={`/artists/${artist.slug}`}
                    >
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
            </div>

            <div>
              <h2 className="section-title">FIND EVENTS</h2>
              <ScrollSection>
                {/* <EventCalendar events={events} /> */}
                <EventList
                  category={category}
                  events={events}
                  variant="compact"
                  header={3}
                  loadMore={true}
                />
              </ScrollSection>
            </div>
          </GridContainer>
        </ContentWrapper>
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
