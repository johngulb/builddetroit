import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ lat, lng }) => <div style={{
    color: 'white', 
    background: 'red',
    padding: '6px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }} />;

export const VenueMap = ({
    venue
}) => {
    const defaultProps = {
      center: {
        lat: venue.geo.lat,
        lng: venue.geo.lng
      },
      zoom: 11
    };
  
    return (
      // Important! Always set the container height explicitly
      <div className="map venue-map" style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAzuNV3xElq-r3vnzjsppngzp5wfwMyvKo" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={venue.geo.lat}
            lng={venue.geo.lng}
          />
        </GoogleMapReact>
      </div>
    );
  }