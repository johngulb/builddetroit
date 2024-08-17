import React from "react";
import { getArtwork } from "../../dpop";
import styled from "@emotion/styled";
import { getEnvironment } from "../../utils/environment";
import moment from "moment";

const ArtworkPage = ({ artwork }) => {
  return (
    <PageWrapper>
      <h1 dangerouslySetInnerHTML={{ __html: artwork.title }} />
      {artwork.content.map((content, i: number) => {
        return (
          <ContentWrapper key={i}>
            <div className="timestamp">{moment(content.timestamp).format('dddd MMMM Do, YYYY – h:mm a')}</div>
            {content.data.type === "image/jpeg" && (
              <img src={content.data.url} />
            )}
            {content.data.type === "video/mp4" && (
              <>
                <video controls preload="metadata">
                  <source src={content.data.url} type="video/mp4"></source>
                </video>
              </>
            )}
          </ContentWrapper>
        );
      })}
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  background-color: #fafafa;
  max-width: 700px;
  margin: auto;
  h1 {
    font-size: 2rem;
    padding: 1rem;
    margin-left: 1rem;
  }
  img {
    padding: 1rem;
    padding-top: 0.5rem;
    max-width: 100%;
  }
  video {
    padding: 1rem;
    padding-top: 0.5rem;
    max-width: 100%;
  }
`;

const ContentWrapper = styled.div`
    border-left: solid 1px #333;
    margin-left: 1rem;
    .timestamp {
        font-size: 0.8rem;
        margin-left: 1rem;
        font-style: italic;
    }
`;

export const getServerSideProps = async ({ query, res }) => {
  const artwork = await getArtwork(query.artwork);

  const env = getEnvironment();

  const url = `${env.url}/a/${artwork.slug}`;

  //   const image = event.image ?? event.venue?.image ?? env.image;

  return {
    props: {
      artwork,
      meta: {
        title: `${artwork.title} | ${env.site_name}`,
        description: artwork.description,
        canonical: url,
        openGraph: {
          url: url,
          type: "webpage",
          //   images: image
          //     ? [
          //         {
          //           url: image,
          //           alt: artwork.title,
          //         },
          //       ]
          //     : [],
          site_name: env.site_name,
        },
      },
    },
  };
};

export default ArtworkPage;
