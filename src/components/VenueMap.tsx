import React, { useEffect, useRef, useState } from 'react';
import { Venue } from '../dpop';

interface VenueMapProps {
  venue: Venue;
}

export const VenueMap: React.FC<VenueMapProps> = ({ venue }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 200 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = width * 0.5; // Maintain 2:1 aspect ratio
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  if (!venue.geo?.lat || !venue.geo?.lng) {
    return null;
  }

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${venue.geo.lat},${venue.geo.lng}&zoom=15&size=${dimensions.width}x${dimensions.height}&markers=${venue.geo.lat},${venue.geo.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

  return (
    <div ref={containerRef} style={{ width: '100%', height: dimensions.height }}>
      <img 
        src={mapUrl}
        alt={`Map showing location of ${venue.title}`}
        style={{width: '100%', height: '100%', objectFit: 'cover', margin: '0 auto'}}
      />
    </div>
  );
};
