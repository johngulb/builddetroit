import React from "react";
import styled from "@emotion/styled";
import { Venue } from "../../interfaces";
import Place from "@mui/icons-material/Place";
import Link from "next/link";
import { getVenues } from "../../dpop";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Event } from "@mui/icons-material";

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
  padding: 0 1rem;
  
  h1 {
    margin: 2rem 0 1.5rem;
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 2rem;
  border-radius: 8px;
  overflow: hidden;
`;

const ContentLayout = styled.div`
  padding: 1rem;
`;

const VenueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem;
  }
`;

const VenueCard = styled(Link)`
  display: flex;
  text-decoration: none;
  color: inherit;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .venue-info {
    padding: 1.25rem;
    width: 100%;

    h2 {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0 0 0.75rem 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      svg {
        color: #666;
        font-size: 1.25rem;
      }
    }

    .address {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 1rem;
      line-height: 1.4;
    }

    .stats {
      display: flex;
      gap: 1rem;
      font-size: 0.85rem;
      color: #666;

      .stat {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.25rem 0;

        svg {
          font-size: 1.1rem;
          color: #666;
        }
      }
    }
  }
`;

interface PlacesPageProps {
  venues: Venue[];
}

const PlacesPage = ({ venues }: PlacesPageProps) => {
  const mapContainer = React.useRef(null);
  const map = React.useRef(null);

  const mapCenter = {
    lat: 42.3314, // Detroit coordinates
    lng: -83.0458,
  };

  React.useEffect(() => {
    if (!mapContainer.current) return;
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
        center: [mapCenter.lng, mapCenter.lat],
        zoom: 12,
      });

      map.current.on("load", () => {
        // Add markers for each venue
        venues?.forEach((venue) => {
          if (!venue.geo?.lat || !venue.geo?.lng) return;

          console.log('venue:', venue);

          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div style="padding: 8px;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">${venue.title}</h3>
              <div style="font-size: 14px; color: #666; margin-bottom: 4px;">${venue.geo.address}</div>
              <div style="font-size: 14px; color: #666; margin-bottom: 8px;">${venue.geo.city}, ${venue.geo.state} ${venue.geo.zipcode}</div>
              <div style="font-size: 14px; color: #0066cc;">${venue.event_count} upcoming events</div>
             </div>`
          );

          new mapboxgl.Marker()
            .setLngLat([parseFloat(venue.geo.lng as unknown as string), parseFloat(venue.geo.lat as unknown as string)])
            .setPopup(popup)
            .addTo(map.current);
        });
      });
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, [mapCenter.lat, mapCenter.lng, venues]);

  return (
    <PageWrapper>
      <PageContainer>
        <MapContainer ref={mapContainer} />
        <ContentLayout>
          <VenueGrid>
            {venues?.map((venue) => (
              <VenueCard key={venue.id} href={`/places/${venue.slug}`}>
                <div className="venue-info">
                  <h2>
                    <Place />
                    {venue.title}
                  </h2>
                  <div className="address">
                    {venue.geo.address}
                    {venue.geo.city && `, ${venue.geo.city}`}
                    {venue.geo.state && `, ${venue.geo.state}`}
                    {venue.geo.zipcode && ` ${venue.geo.zipcode}`}
                  </div>
                  <div className="stats">
                    <div className="stat">
                      <Event />
                      {venue.event_count} upcoming events
                    </div>
                  </div>
                </div>
              </VenueCard>
            ))}
          </VenueGrid>
        </ContentLayout>
      </PageContainer>
    </PageWrapper>
  );
};

export const getServerSideProps = async () => {
  try {
    const venues = await getVenues({
        type: "upcoming-events"
    });

    return {
      props: {
        venues,
        meta: {
          title: "Places | Detroit Places of Interest",
          description: "Discover interesting places and venues around Detroit",
        },
        headerProps: {
          mainRoute: "places",
        },
      },
    };
  } catch (error) {
    console.error("Error fetching venues:", error);
    return {
      props: {
        venues: [],
        meta: {
          title: "Places | Detroit Places of Interest",
          description: "Discover interesting places and venues around Detroit",
        },
        headerProps: {
          mainRoute: "places",
        },
      },
    };
  }
};

export default PlacesPage;
