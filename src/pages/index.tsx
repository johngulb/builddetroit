import React from "react";
import styled from "@emotion/styled";
import { EventList } from "../components/Events/EventList";
import { ContactBoxModal } from "../components/ContactBox";
import { AuthModal } from "../components/Auth/AuthModal";
import { Form } from "../components/Form";

import {
  Contact,
  createContact,
  getUser,
  User,
  getCommunities,
  getEvents,
} from "../dpop";
import { getEnvironment } from "../utils/environment";
import { NextSeoProps } from "next-seo";
import Hero from "../components/Hero";
import CommunityCard from "../components/CommunityCard";
import { Community } from "../dpop";
import { DPoPLabs } from "../components/DPoPLabs";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const PageContainer = styled.div`
  display: block;
  max-width: 700px;
  margin: auto;
  .header {
    padding: 2rem;
    margin: 2rem 0;
  }
  .header-container {
    margin-top: -1rem;
  }
  img {
    padding: 1rem;
    margin: auto;
  }
  h1 {
    margin-bottom: 1rem;
    font-size: 3.2rem;
    /* text-transform: uppercase; */
    @media only screen and (max-width: 822px) {
      font-size: 2rem;
    }
  }
  .section-title {
    margin-bottom: 2rem;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: left;
    margin-top: 2rem;
    @media only screen and (max-width: 822px) {
      font-size: 1.5rem;
    }
  }
  p {
    font-size: 1rem;
    margin: 1rem auto;
    @media only screen and (max-width: 822px) {
      margin: 0.6rem auto;
      font-size: 0.9rem;
    }
  }
  .build-btn {
    max-width: 280px;
    margin: auto;
  }
`;

type HomePageLayout = "default" | "artnight" | "detroiter";
interface HomePageProps {
  events: any[];
  layout: HomePageLayout;
  meta: NextSeoProps;
  category: string;
  communities: Community[];
}

const HomePage = ({
  events,
  layout,
  meta,
  category,
  communities,
}: HomePageProps) => {
  const [showContactBox, setShowContactBox] = React.useState<boolean>(false);
  const [showAuth, setShowAuth] = React.useState<boolean>(false);
  const [contact, setContact] = React.useState<Contact>();
  const [user, setUser] = React.useState<User>();

  const handleAuthorized = React.useCallback((user) => {
    setContact(user);
    setShowAuth(false);
  }, []);

  const handleSubmitContact = React.useCallback((contact: Contact) => {
    createContact(contact);
    setContact(contact);
    setShowContactBox(false);
  }, []);

  React.useEffect(() => {
    const user = getUser();
    setUser(user);
  }, []);

  return (
    <PageWrapper>
      <PageContainer>
        <div className="header-container">
          {layout === "detroiter" && <DPoPLabs />}

          {layout === "default" && (
            <Hero
              title={
                <>
                  Welcome to the
                  <br />
                  Renaissance City
                </>
              }
              subtitle="Our mission is to empower creators in Detroit by deploying technology that drives positive change in our community."
              image="https://dpop.nyc3.digitaloceanspaces.com/wp-content/uploads/2025/02/10201802/penobscot-e1739236711632.jpg"
            />
          )}
          {layout === "artnight" && (
            <>
              <div>
                <hr></hr>
                <br></br>
                <div>Coming Soon</div>
                <h2>Art Night Detroit</h2>
                <img src={meta.openGraph.images[0].url} width={200} />
                <br></br>
                <hr></hr>
                <br></br>
              </div>
            </>
          )}
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
        )}
        {/* <EventSubmissionButton /> */}
        <h2 className="section-title">FEATURED EVENTS</h2>
        <EventList
          category={category}
          events={events}
          variant="compact"
          header={3}
          loadMore={true}
        />
        <h2 className="section-title">COMMUNITIES</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          {communities?.map((community: Community) => (
            <CommunityCard key={community.slug} community={community} />
          ))}
        </div>
      </PageContainer>
    </PageWrapper>
  );
};

export const getServerSideProps = async () => {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const env = getEnvironment();

  try {
    // Use more modern fetch pattern with error handling
    const events = await getEvents({
      type: env.category,
      limit: 18,
      offset: 0,
    });

    const communities = await getCommunities();

    return {
      props: {
        events,
        communities,
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
          hideNavigation: true,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    // Return empty events array if fetch fails
    return {
      props: {
        events: [],
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
