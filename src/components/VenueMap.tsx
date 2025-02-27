import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Venue } from '../dpop';

interface VenueMapProps {
  venue: Venue;
}

export const VenueMap: React.FC<VenueMapProps> = ({ venue }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 200 });
  const [zoomEnabled, setZoomEnabled] = useState(false);

  useEffect(() => {
    if (!venue.geo?.lat || !venue.geo?.lng) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [venue.geo.lng, venue.geo.lat],
        zoom: 15,
        scrollZoom: zoomEnabled, // Enable/disable scroll zoom based on state
        dragRotate: false, // Disable rotation
        touchZoomRotate: zoomEnabled // Enable/disable touch zoom based on state
      });

      // Add marker
      new mapboxgl.Marker()
        .setLngLat([venue.geo.lng, venue.geo.lat])
        .addTo(map.current);
    }

    const updateDimensions = () => {
      if (mapContainer.current) {
        const width = mapContainer.current.offsetWidth;
        const height = width * 0.5; // Maintain 2:1 aspect ratio
        setDimensions({ width, height });
        map.current?.resize();
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      map.current?.remove();
      window.removeEventListener('resize', updateDimensions);
    };
  }, [venue.geo?.lat, venue.geo?.lng, zoomEnabled]);

  const handleMapClick = () => {
    setZoomEnabled(true);
    map.current?.scrollZoom.enable();
    map.current?.touchZoomRotate.enable();
  };

  if (!venue.geo?.lat || !venue.geo?.lng) {
    return null;
  }

  return (
    <div 
      ref={mapContainer} 
      onClick={handleMapClick}
      style={{ 
        width: '100%', 
        height: dimensions.height,
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: zoomEnabled ? 'grab' : 'pointer'
      }}
    />
  );
};
