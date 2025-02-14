import React from "react";
import { getArtwork } from "../../dpop";
import styled from "@emotion/styled";
import { getEnvironment } from "../../utils/environment";
import moment from "moment";

const ArtworkPage = ({ artwork }) => {
  return (
    <PageWrapper>
      <ArtworkHeader>
        <div className="artwork-grid">
          <div className="artwork-image">
            <img src={artwork.data.image} alt={artwork.title} />
          </div>
          <div className="artwork-details">
            <h1 dangerouslySetInnerHTML={{ __html: artwork.title }} />
            <p className="artwork-description">{artwork.description}</p>
            {artwork.artist && (
              <div className="artist-info">
                <img
                  src={artwork.artist.profile_picture}
                  alt={artwork.artist.name}
                  className="artist-picture"
              />
              <div className="artist-text">
                <h2>{artwork.artist.name}</h2>
                <p>{artwork.artist.bio}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </ArtworkHeader>

      {artwork.content.map((content, i: number) => {
        return (
          <ContentWrapper key={i}>
            <div className="timestamp">
              {moment(content.timestamp).format("dddd MMMM Do, YYYY – h:mm a")}
            </div>
            {content.data.type === "image/jpeg" && (
              <img src={content.data.url} />
            )}
            {content.data.type === "video/mp4" && (
              <>
                <video controls preload="metadata">
                  <source
                    src={`${content.data.url}#t=0.1`}
                    type="video/mp4"
                  ></source>
                </video>
              </>
            )}
            {content.data.type === "youtube" && (
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${content.data.youtubeId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </ContentWrapper>
        );
      })}
    </PageWrapper>
  );
};

const ArtworkHeader = styled.div`
  margin: 2rem 1rem;

  .artwork-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0rem;
    
    @media (min-width: 768px) {
      gap: 2rem;
      grid-template-columns: 1fr 1.5fr;
    }
  }

  .artwork-image {
    img {
      width: 100%;
      max-height: 500px;
      object-fit: contain;
      padding: 0;
    }
  }

  .artist-info {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin: 1rem 0;

    .artist-picture {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      padding: 0;
    }

    .artist-text {
      h2 {
        margin: 0 0 0.25rem 0;
        font-size: 1.2rem;
      }

      p {
        margin: 0;
        font-size: 0.9rem;
        color: #666;
      }
    }
  }

  .artwork-description {
    color: #333;
    line-height: 1.4;
    font-size: 0.95rem;
    max-width: 65ch;
  }
`;

const PageWrapper = styled.div`
  background-color: #fafafa;
  max-width: 700px;
  margin: auto;
  h1 {
    font-size: 2rem;
  }
  img,
  video,
  iframe {
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
