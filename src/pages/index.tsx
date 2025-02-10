import React from "react";
import styled from "@emotion/styled";
import { ButtonLink } from "../components/ButtonLink";
import { EventList } from "../components/Events/EventList";
import { EventSubmissionButton } from "../components/Events/EventSubmissionBox";
import { ContactBoxModal } from "../components/ContactBox";
import { AuthModal } from "../components/Auth/AuthModal";
import { Form } from "../components/Form";
import { Social } from "../components/Social";

import { Contact, createContact, getUser, User } from "../dpop";
import { getEnvironment } from "../utils/environment";
import { NextSeoProps } from "next-seo";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const PageContainer = styled.div`
  text-align: center;
  display: block;
  max-width: 700px;
  margin: auto;
  .header {
    padding: 2rem;
    margin: 2rem 0;
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
    font-size: 2rem;
    font-weight: bold;
    @media only screen and (max-width: 822px) {
      font-size: 1.5rem;
    }
  }
  p {
    font-size: 1rem;
    max-width: 420px;
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
}

const HomePage = ({ events, layout, meta }: HomePageProps) => {
  const [showContactBox, setShowContactBox] = React.useState<boolean>(false);
  const [showAuth, setShowAuth] = React.useState<boolean>(false);
  const [contact, setContact] = React.useState<Contact>();
  const [user, setUser] = React.useState<User>();

  const handleBuildWithUs = React.useCallback(() => {
    console.log("CONSOLE LOG FUN: BUILD WITH US");
    setShowContactBox(true);
  }, []);

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
        <div className="header">
          <img
            width="144"
            src="https://thedetroitilove.com/wp-content/uploads/2022/08/TDIL-acid-heart-700x688.png"
            className="custom-logo"
            alt=""
          />
          {layout === "default" && (
            <>
              <h1>DPoP Labs</h1>
              <p>
                Our mission is to empower creators in Detroit by deploying technology that drives positive change in our community.
              </p>
              {/* <p>
                Our mission is to leverage open source technology to build a
                better future for Detroit.
              </p>
              <p>
                We are committed to provide educational resources that empower
                individuals and organizations to solve problems, innovate, and
                build the future they want to see.
              </p> */}
              {/* <video controls preload="metadata" style={{ width: '300px' }}>
                <source src={`https://nyc3.digitaloceanspaces.com/dpop/uploads/GM8FHSFQBvfUGTFFcPCu74zC0XQ9BQA8NYTrmJTa.mp4#t=0.1`} type="video/mp4"></source>
              </video>
              <video controls preload="metadata" style={{ width: '300px' }}>
                <source src={`https://nyc3.digitaloceanspaces.com/dpop/uploads/jIhCtwC0DnD6DeY1rNgKkpfpf5mFP3znFrR6oCDp.mp4#t=0.1`} type="video/mp4"></source>
              </video>
              <ButtonLink href="/a/doing-gods-work-1">View Creation</ButtonLink>
              <Social
                discord={"https://discord.gg/bK8wjhS2Mg"}
                instagram={"https://www.instagram.com/dpop.labs/"}
              /> */}
            </>
          )}
          {layout === "detroiter" && (
            <>
              <h1>DPoP Labs</h1>
              <p>
                Our mission is to empower creators in Detroit by deploying technology that drives positive change in our community.
              </p>
              {/* <p>
                Through our app, we aim to amplify the voices and stories of Detroit residents, promoting inclusivity, diversity, and collaboration.
              </p>
              <p>
                By connecting individuals, businesses, and organizations, we strive to facilitate meaningful interactions, promote local initiatives, and create opportunities for personal and professional growth.
              </p>
              <p>
                Together, we envision a connected Detroit, where residents thrive, support one another, and collectively contribute to the ongoing revitalization and success of our great city.
              </p> */}
              <video controls preload="metadata" style={{ width: '300px' }}>
                <source src={`https://nyc3.digitaloceanspaces.com/dpop/uploads/GM8FHSFQBvfUGTFFcPCu74zC0XQ9BQA8NYTrmJTa.mp4#t=0.1`} type="video/mp4"></source>
              </video>
              <video controls preload="metadata" style={{ width: '300px' }}>
                <source src={`https://nyc3.digitaloceanspaces.com/dpop/uploads/jIhCtwC0DnD6DeY1rNgKkpfpf5mFP3znFrR6oCDp.mp4#t=0.1`} type="video/mp4"></source>
              </video>
              <ButtonLink href="/a/doing-gods-work-1">View Creation</ButtonLink>
              <Social
                discord={"https://discord.gg/bK8wjhS2Mg"}
                instagram={"https://www.instagram.com/dpop.labs/"}
              />
            </>
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
            {!user && !contact && (
              <ButtonLink className="build-btn" onClick={handleBuildWithUs}>
                COME BUILD WITH US
              </ButtonLink>
            )}
            {/* {(user || contact) && (
              <div style={{ marginTop: 64 }}>
                <p>Interested in learning more?</p>
                <ButtonLink
                  className="build-btn"
                  href="https://discord.gg/bK8wjhS2Mg"
                  target="_blank"
                  rel="noreferrer"
                >
                  JOIN US ON DISCORD
                </ButtonLink>
              </div>
              // <ButtonLink className="build-btn" onClick={handleBuildWithUs}>
              //   SHARE EVENT
              // </ButtonLink>
            )} */}
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
        <EventList events={events} variant="compact" />
      </PageContainer>
    </PageWrapper>
  );
};

export const getServerSideProps = async () => {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const env = getEnvironment();

  try {
    // Use more modern fetch pattern with error handling
    const response = await fetch(
      `https://api.detroiter.network/api/events?type=${env.category}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const fetchedEvents = await response.json();
    const events = fetchedEvents.data;

    return {
      props: {
        events,
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
    console.error('Error fetching events:', error);
    // Return empty events array if fetch fails
    return {
      props: {
        events: [],
        layout: env.layout,
        meta: {
          title: env.site_name,
          description: env.layout === "artnight" 
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
