// I'm not sure where I should go next. I'm making my way to Denver, and don't know if I should go through Kansas City or Lincoln Nebraska.

import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import { NextSeo } from "next-seo";

const PageWrapper = styled.div`
  background-color: #fafafa;
  margin: auto;
  background-image: url("https://detroitartdao.com/wp-content/uploads/2024/02/dark-side-of-the-moon-galaxy.png");
  height: 100vh;
  background-size: cover;
  img {
    margin-top: 1rem;
  }
`;

const PageContainer = styled.div`
  padding: 1rem;
  height: 100vh;
  align-items: center;
  display: flex;
  justify-content: center;
  color: white;
  h3 {
    margin-top: 1em;
    margin-bottom: 0.25em;
    font-weight: bold;
    font-size: 1.8em;
    @media only screen and (max-width: 822px) {
      font-size: 1em;
    }
  }
  p {
    text-align: center;
    color: white;
  }
  textarea {
    padding: 0.25rem;
    display: block;
    text-align: center;
    margin: 1rem 0;
    width: 100%;
  }
  button.submmit {
    padding: 0.5rem 2rem;
    font-weight: bold;
  }
`;

const Content = styled.div`
  text-align: center;
  max-width: 600px;
  .button-container {
    margin-top: 1rem;
    button {
      padding: 0.5rem 1rem;
      border: solid 1px #fff;
      margin: 0.5rem;
      font-size: 1rem;
      color: white;
    }
  }
`;

const Page = () => {
  const [direction, setDirection] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");
  const [response, setResponse] = React.useState<string>("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = {
    know: {
      prompt: "I know where I am headed.",
      message:
        "It's great to have a clear path. Anything specific you'd like to share about your journey?",
    },
    find: {
      prompt: "I am finding my way.",
      message:
        "Embracing the journey of discovery is a powerful experience. How can I assist you on this part of your adventure?",
    },
    lost: {
      prompt: "I am lost. :(",
      message:
        "I understand that feeling lost can be disheartening. Take a deep breath. What's been challenging, and how can I help you find your way?",
    },
  };

  const handleButtonPress = React.useCallback((e) => {
    console.log(e.target.innerHTML, e.target.id);
    setDirection(e.target.id);
  }, []);

  const handleSubmit = React.useCallback(() => {
    console.log("options", options, direction);
    const chat = `i'm building an interactive artwork that has the goal to help someone along on their journey in life.

    the prompt is "Hello fellow traveler... How are you doing on your journey?"
    
    the initial inputs the traveler can select to help provide direction are: "I know where I am headed", "I am finding my way." and "I am lost. :("
    
    the traveler selected "${options[direction].prompt}" and was prompted the following: "${options[direction].message}"
    
    they answered:
    
    "${message}"
    
    can you share a response`;
    console.log("chat", chat);
    (async () => {
      const res = await fetch(`/api/chat`, {
        method: "POST",
        body: JSON.stringify({
          text: chat,
        }),
        headers: { "content-type": "application/json" },
      });
      const json = await res.json();
      setResponse(json.detail.choices[0].message.content);
    })();
  }, [direction, message, options]);

  return (
    <PageWrapper>
      <NextSeo
        title={`A Journey to the Dark Side of the Moon | Detroit Art`}
        description=""
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/journey`}
      />
      <PageContainer>
        <Content>
          <Image
            alt="cosmonaut helmet"
            width={180}
            height={180}
            src="https://dpop.nyc3.digitaloceanspaces.com/wp-content/uploads/2024/02/06231740/dark-side-of-the-moon-cosmnaut-helmet-only-1.png"
          />
          <h3>
            Hello fellow traveler...
            <br />
            How are you doing on your journey?
          </h3>
          {direction?.length === 0 && (
            <div className="button-container">
              <button id="know" onClick={handleButtonPress}>
                I know where I am headed.
              </button>
              <button id="find" onClick={handleButtonPress}>
                I am finding my way.
              </button>
              <button id="lost" onClick={handleButtonPress}>
                I am lost. :(
              </button>
            </div>
          )}
          {direction?.length > 0 && (
            <>
              <p>{options[direction]?.message}</p>
              <textarea
                placeholder="enter message..."
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <button className="submmit" id="submit" onClick={handleSubmit}>
                SUBMIT
              </button>
            </>
          )}
          {response?.length > 0 && (
            <>
              <p>{response}</p>
            </>
          )}
          <br />
          <br />
          <br />
          <h4>invite travelers</h4>
          <Image
            alt="Invite fellow travelers"
            src="https://dpop.nyc3.digitaloceanspaces.com/wp-content/uploads/2024/02/20222248/Screenshot-2024-02-19-at-6.02.54-PM.png"
            width={150}
            height={150}
          />
        </Content>
      </PageContainer>
    </PageWrapper>
  );
};

export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      headerProps: {
        hideNavigation: true,
        hideFooter: true,
      },
    },
  };
};

export default Page;
