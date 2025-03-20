import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia
} from '@mui/material';

// Sample data - in production this would likely come from an API/database
const pizzaVenues = [
  {
    id: 1,
    name: "Buddy's Pizza",
    address: "17125 Conant St, Detroit, MI 48212",
    description: "Detroit's original square pizza since 1946",
    coordinates: { longitude: -83.0457, latitude: 42.3314 },
    imageUrl: "/images/buddys-pizza.jpg"
  },
  {
    id: 2,
    name: "Supino Pizzeria",
    address: "2457 Russell St, Detroit, MI 48207",
    description: "Thin-crust pizzas in Eastern Market",
    coordinates: { longitude: -83.0419, latitude: 42.3467 },
    imageUrl: "/images/supino-pizza.jpg"
  },
  {
    id: 3,
    name: "Michigan & Trumbull",
    address: "1441 W Elizabeth St, Detroit, MI 48216",
    description: "Detroit-style pizza in Corktown",
    coordinates: { longitude: -83.0647, latitude: 42.3318 },
    imageUrl: "/images/michigan-trumbull.jpg"
  },
  {
    id: 4,
    name: "Pie-Sci Pizza",
    address: "5163 Trumbull Ave, Detroit, MI 48208",
    description: "Creative artisanal pizzas in Woodbridge",
    coordinates: { longitude: -83.0776, latitude: 42.3512 },
    imageUrl: "/images/pie-sci.jpg"
  }
];

const mapStyle = {
  width: '100%',
  height: '400px' // Made taller since it's the main map now
};

export default function PizzaHunt() {
  const mapRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

    if (!mapRef.current) return;

    // Initialize map centered on Detroit
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/dark-v11', // Changed to dark theme
      center: [-83.0458, 42.3314], // Detroit coordinates
      zoom: 12
    });

    // Add markers for all venues
    pizzaVenues.forEach((venue) => {
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <h3>${venue.name}</h3>
          <p>${venue.address}</p>
        `);

      // Create custom marker element
      const el = document.createElement('div');
      el.innerHTML = '🍕'; // Pizza emoji as marker
      el.style.fontSize = '32px';
      el.style.cursor = 'pointer';

      new mapboxgl.Marker(el)
        .setLngLat([venue.coordinates.longitude, venue.coordinates.latitude])
        .setPopup(popup)
        .addTo(map);
    });

    return () => map.remove();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Detroit Pizza Scavenger Hunt
      </Typography>
      
      <Typography variant="h6" color="text.secondary" paragraph>
        Visit these amazing Detroit pizza spots and collect stamps for your hunt!
      </Typography>

      <Box sx={{ mb: 4, height: 400 }}>
        <div ref={mapRef} style={mapStyle} />
      </Box>

      <Grid container spacing={4}>
        {pizzaVenues.map((venue) => (
          <Grid item xs={12} md={6} key={venue.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={venue.imageUrl}
                alt={venue.name}
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  {venue.name}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {venue.address}
                </Typography>
                <Typography variant="body2" paragraph>
                  {venue.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
