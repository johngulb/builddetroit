// {
//     "id": 186421,
//     "fancy_id": "test3a-bitcoin-pizza-day-2025",
//     "name": "test: Bitcoin Pizza Day",
//     "description": "test",
//     "location_type": "IN_PERSON",
//     "city": "Detroit",
//     "country": "USA",
//     "image_url": "https://assets.poap.xyz/test3a-bitcoin-pizza-day-2025-logo-1741196828622.png",
//     "year": 2025,
//     "start_date": "2025-05-22",
//     "end_date": "2025-05-22",
//     "expiry_date": "2025-05-22",
//     "from_admin": false,
//     "virtual_event": false,
//     "event_template_id": 1,
//     "private_event": true
// 123456
//   }
// API KEY: nkiQTmkJFUjs5fbXrtCZYI7CzzB9Q0An2LtqDEuUe4Q3iZgby2KZDsd0TKvpKp7H4J9LfM7aZLFydFc1g44aP1lhFZ4USW3kjOTNHCDtKfSwKJN6BuC4gzgS2AaEcNCm

// Client ID:  sIMEuNaoVwhQqDdKsKbkzcSFaDZ3ilNf

// Client Secret:  Uk2e2L4LiTnr63Kw8kEB0FLQ34v2Wg6mWk2mXCS6KsDKLSfOHa6BMSK_4UwFSMvh

// Retrieve Auth0 token:

// curl --location --request POST \
//      --url 'https://auth.accounts.poap.xyz/oauth/token' \
//      --header "Content-Type: application/json" \
//      -d '{"audience": "https://api.poap.tech", "grant_type": "client_credentials", "client_id": "sIMEuNaoVwhQqDdKsKbkzcSFaDZ3ilNf", "client_secret": "Uk2e2L4LiTnr63Kw8kEB0FLQ34v2Wg6mWk2mXCS6KsDKLSfOHa6BMSK_4UwFSMvh"}'

// Use Auth0 tokens:

// curl --location --request GET \
//      --url https://api.poap.tech/actions/claim-qr?qr_hash=1kozmm' \
//      --header 'Accept: application/json' \
//      --header 'Authorization: Bearer $acccesstoken' \
//      --header 'X-API-Key: $apikey'


import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Grid, Card, CardContent, FormControlLabel, Switch } from '@mui/material';

interface POAPFormData {
  name: string;
  description: string;
  city: string;
  country: string;
  start_date: string;
  end_date: string;
  expiry_date: string;
  event_url: string;
  virtual_event: boolean;
  secret_code: string;
  event_template_id: number;
  email: string;
  requested_codes: number;
  private_event: boolean;
  notify_issuer: boolean;
  image: File | null;
}

export default function CreatePOAP() {
  const [formData, setFormData] = useState<POAPFormData>({
    name: '',
    description: '',
    city: '',
    country: '',
    start_date: '',
    end_date: '',
    expiry_date: '',
    event_url: '',
    virtual_event: false,
    secret_code: '',
    event_template_id: 1,
    email: '',
    requested_codes: 0,
    private_event: false,
    notify_issuer: true,
    image: null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to create POAP
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        image: e.target.files![0]
      }));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Create POAP Event
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Event Details
                </Typography>
                
                <TextField
                  fullWidth
                  label="Event Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  margin="normal"
                  required
                  inputProps={{ maxLength: 256 }}
                />

                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  margin="normal"
                  multiline
                  rows={3}
                  required
                  inputProps={{ maxLength: 1500 }}
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.virtual_event}
                      onChange={handleChange}
                      name="virtual_event"
                    />
                  }
                  label="Virtual Event"
                />

                {!formData.virtual_event && (
                  <>
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      margin="normal"
                      required
                      inputProps={{ maxLength: 256 }}
                    />

                    <TextField
                      fullWidth
                      label="Country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      margin="normal"
                      required
                      inputProps={{ maxLength: 256 }}
                    />
                  </>
                )}

                <TextField
                  fullWidth
                  type="date"
                  label="Start Date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  margin="normal"
                  required
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  fullWidth
                  type="date"
                  label="End Date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  margin="normal"
                  required
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  fullWidth
                  type="date"
                  label="Expiry Date"
                  name="expiry_date"
                  value={formData.expiry_date}
                  onChange={handleChange}
                  margin="normal"
                  required
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  fullWidth
                  label="Event URL"
                  name="event_url"
                  value={formData.event_url}
                  onChange={handleChange}
                  margin="normal"
                />

                <TextField
                  fullWidth
                  label="Secret Code (6 digits)"
                  name="secret_code"
                  value={formData.secret_code}
                  onChange={handleChange}
                  margin="normal"
                  required
                  inputProps={{ pattern: '[0-9]{6}' }}
                />

                <TextField
                  fullWidth
                  type="number"
                  label="Event Template ID"
                  name="event_template_id"
                  value={formData.event_template_id}
                  onChange={handleChange}
                  margin="normal"
                />

                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                  inputProps={{ maxLength: 256 }}
                />

                <TextField
                  fullWidth
                  type="number"
                  label="Requested Codes"
                  name="requested_codes"
                  value={formData.requested_codes}
                  onChange={handleChange}
                  margin="normal"
                  required
                  inputProps={{ min: 1 }}
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.private_event}
                      onChange={handleChange}
                      name="private_event"
                    />
                  }
                  label="Private Event"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.notify_issuer}
                      onChange={handleChange}
                      name="notify_issuer"
                    />
                  }
                  label="Notify Issuer"
                />

                <Box sx={{ mt: 2 }}>
                  <input
                    accept="image/gif,image/png,image/webp"
                    style={{ display: 'none' }}
                    id="image-upload"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="image-upload">
                    <Button variant="contained" component="span">
                      Upload POAP Image
                    </Button>
                  </label>
                  {formData.image && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Selected file: {formData.image.name}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ position: 'sticky', top: 20 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Preview
                </Typography>
                {formData.image && (
                  <Box
                    component="img"
                    src={URL.createObjectURL(formData.image)}
                    alt="POAP Preview"
                    sx={{ width: '100%', height: 'auto' }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Create POAP
          </Button>
        </Box>
      </form>
    </Container>
  );
}
