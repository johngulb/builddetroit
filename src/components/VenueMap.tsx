import React from 'react';
import { Venue } from '../dpop';

const containerStyle = {
  width: '100%',
  height: '240px',
};

interface VenueMapProps {
  venue: Venue;
}

export const VenueMap: React.FC<VenueMapProps> = ({ venue }) => {
  if (!venue.geo?.lat || !venue.geo?.lng) {
    return null;
  }

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${venue.geo.lat},${venue.geo.lng}&zoom=15&size=600x300&markers=${venue.geo.lat},${venue.geo.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

  return (
    <div style={containerStyle}>
      <img 
        src={mapUrl}
        alt={`Map showing location of ${venue.title}`}
        style={{width: '100%', height: '100%', objectFit: 'cover'}}
      />
    </div>
  );
};
