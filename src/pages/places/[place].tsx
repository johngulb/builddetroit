import React from "react";
import styled from "@emotion/styled";
import { getPlace } from "../../dpop";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Venue } from "../../interfaces";
import Hero from "../../components/Hero";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
`;

const PageContainer = styled.div`
  display: block;
  max-width: 1200px;
  width: 100%;
  margin: auto;
  padding: 1rem;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  margin: 2rem 0;
  border-radius: 8px;
  overflow: hidden;
`;

const VenueDetails = styled.div`
  margin: 2rem 0;

  .address {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 1rem;
  }

  .description {
    font-size: 1rem;
    line-height: 1.6;
    white-space: pre-wrap;
  }
`;

interface PlacePageProps {
  venue: Venue;
}

const PlacePage = ({ venue }: PlacePageProps) => {
  const mapContainer = React.useRef(null);
  const map = React.useRef(null);

  React.useEffect(() => {
    if (!mapContainer.current || !venue?.geo?.lat || !venue?.geo?.lng) return;
    if (map.current) return;

    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!accessToken) {
      console.error("Mapbox access token is missing");
      return;
    }

    mapboxgl.accessToken = accessToken;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [parseFloat(venue.geo.lng as unknown as string), parseFloat(venue.geo.lat as unknown as string)],
        zoom: 15,
      });

      map.current.on("load", () => {
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3>${venue.title}</h3>
           <p>${venue.geo.address}</p>`
        );

        new mapboxgl.Marker()
          .setLngLat([parseFloat(venue.geo.lng as unknown as string), parseFloat(venue.geo.lat as unknown as string)])
          .setPopup(popup)
          .addTo(map.current);
      });
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, [venue]);

  if (!venue) {
    return <div>Place not found</div>;
  }

  return (
    <>
      <Hero
        title={venue.title}
        image={
          venue?.image ||
          "https://dpop.nyc3.digitaloceanspaces.com/wp-content/uploads/2025/02/10201802/penobscot-e1739236711632.jpg"
        }
      />
      <PageWrapper>
        <PageContainer>
          <VenueDetails>
            <div className="address">
              {venue.geo.address}
              {venue.geo.city && `, ${venue.geo.city}`}
              {venue.geo.state && `, ${venue.geo.state}`}
              {venue.geo.zipcode && ` ${venue.geo.zipcode}`}
            </div>
            {/* <div className="description">{venue.description}</div> */}
          </VenueDetails>
          <MapContainer ref={mapContainer} />
        </PageContainer>
      </PageWrapper>
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  try {
    const venue = await getPlace(params.place);
    return {
      props: {
        venue,
        meta: {
          title: `${venue.title} | Detroit Places of Interest`,
          description:
            venue.description || `Learn more about ${venue.title} in Detroit`,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching venue:", error);
    return {
      notFound: true,
    };
  }
};

export default PlacePage;
