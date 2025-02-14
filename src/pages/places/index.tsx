import React from "react";
import styled from "@emotion/styled";
import { Venue } from "../../interfaces";
import Place from "@mui/icons-material/Place";
import Link from "next/link";
import { getPlaces, getEvents } from "../../dpop";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Event } from "@mui/icons-material";
import { Person } from "@mui/icons-material";

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
  
  h1 {
    margin: 2rem 0 1.5rem;
    font-size: 2rem;
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
  display: flex;
  gap: 2rem;
  padding: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const VenueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const VenueCard = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }

  .venue-info {
    padding: 1rem;

    h2 {
      font-size: 1.2rem;
      margin: 0 0 0.5rem 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .address {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 0.75rem;
    }

    .stats {
      display: flex;
      gap: 1rem;
      font-size: 0.85rem;
      color: #666;

      .stat {
        display: flex;
        align-items: center;
        gap: 0.25rem;

        svg {
          font-size: 1rem;
        }
      }
    }
  }
`;

interface PlacesPageProps {
  venues: (Venue & {
    upcomingEventsCount: number;
    visitorsCount: number;
  })[];
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

          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${venue.title}</h3>
             <p>${venue.geo.address}</p>`
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
  }, [venues]);

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
                      {venue.upcomingEventsCount} upcoming
                    </div>
                    <div className="stat">
                      <Person />
                      {venue.visitorsCount} visitors
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
    const venues = await getPlaces();
    const events = await getEvents({ limit: 1000 }); // Get all upcoming events

    // Add event and visitor counts to each venue
    const venuesWithStats = venues.map(venue => {
      const upcomingEventsCount = events.filter(event => event.venue?.id === venue.id).length;
      // For this example, generating a random number of visitors
      // In a real app, you would get this from your database
      const visitorsCount = Math.floor(Math.random() * 1000);
      
      return {
        ...venue,
        upcomingEventsCount,
        visitorsCount
      };
    });

    return {
      props: {
        venues: venuesWithStats,
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
