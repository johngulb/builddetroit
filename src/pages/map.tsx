import React from "react";
import styled from "@emotion/styled";
import { getEvents } from "../dpop";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapPage = ({ events }) => {
  const mapContainer = React.useRef(null);
  const map = React.useRef(null);
  const [selectedEvent, setSelectedEvent] = React.useState(null);

  const mapCenter = {
    lat: 42.3314, // Detroit coordinates
    lng: -83.0458,
  };

  // Filter out events without valid coordinates
  const validEvents = events.filter(
    (event) => event.venue?.geo?.lat && event.venue?.geo?.lng
  );

  React.useEffect(() => {
    if (!mapContainer.current) return; // Check if container exists
    if (map.current) return;

    // Verify access token exists
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
        // Add markers for each event
        validEvents.forEach((event) => {
          if (!event.venue?.geo?.lat || !event.venue?.geo?.lng) return;

          const marker = new mapboxgl.Marker()
            .setLngLat([
              parseFloat(event.venue.geo.lng),
              parseFloat(event.venue.geo.lat),
            ])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(`
                  <div>
                    <h3>${event.title}</h3>
                    <p>${event.venue?.title}</p>
                    <p>${new Date(event.start_date).toLocaleDateString()}</p>
                    <a href="/event/${event.slug}">View Details</a>
                  </div>
                `)
            )
            .addTo(map.current);
        });
      });
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [events, mapCenter.lat, mapCenter.lng, validEvents]);

  return (
    <MapContainer>
      <h1>Event Map</h1>
      <MapBox ref={mapContainer} />
    </MapContainer>
  );
};

export const getServerSideProps = async () => {
  try {
    const events = await getEvents({ limit: 100 });
    return {
      props: {
        events,
        meta: {
          title: "Event Map",
          description: "View all Detroit events on a map",
        },
      },
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    return {
      props: {
        events: [],
        meta: {
          title: "Event Map",
          description: "View all Detroit events on a map",
        },
        headerProps: {
          disableDPoP: false,
          hideFooter: true,
        },
      },
    };
  }
};

const MapContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;

  h1 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
  }
`;

const MapBox = styled.div`
  height: 70vh;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
`;

export default MapPage;
