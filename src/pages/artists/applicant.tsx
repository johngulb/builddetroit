import React from "react";
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";

const ArtistApplicationPage = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [providesEasel, setProvidesEasel] = React.useState<string>("");
  const [isAvailable, setIsAvailable] = React.useState<string>("");
  const [image, setImage] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      name,
      email,
      website,
      providesEasel: providesEasel === "yes",
      isAvailable: isAvailable === "yes",
      image
    });
  };

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Artist Application - 4x4 Painting at Spotlite
        </Typography>

        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Apply to participate in our 4x4 painting event at Spotlite. Selected artists will create original 4x4 paintings live during the event on February 26th. 
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{
          bgcolor: 'white',
          p: 4,
          borderRadius: 2,
          boxShadow: 1
        }}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              type="url"
              label="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://"
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <FormLabel>Upload Sample Work</FormLabel>
            <Typography variant="caption" display="block" sx={{ mb: 1, color: 'text.secondary' }}>
              Please provide an example of your artwork that best represents your style
            </Typography>
            <TextField
              fullWidth
              type="file"
              inputProps={{ accept: "image/*" }}
              onChange={handleImageChange}
              required
              sx={{ mt: 1 }}
            />
            {imagePreview && (
              <Box sx={{ mt: 2 }}>
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  style={{ maxWidth: 200, maxHeight: 200, objectFit: 'contain' }}
                />
              </Box>
            )}
          </Box>

          <Box sx={{ mb: 3 }}>
            <FormControl>
              <FormLabel>Will you provide your own easel?</FormLabel>
              <RadioGroup
                value={providesEasel}
                onChange={(e) => setProvidesEasel(e.target.value)}
                row
              >
                <FormControlLabel value="yes" control={<Radio required />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Box>

          <Box sx={{ mb: 3 }}>
            <FormControl>
              <FormLabel>Are you available on February 26th?</FormLabel>
              <RadioGroup
                value={isAvailable}
                onChange={(e) => setIsAvailable(e.target.value)}
                row
              >
                <FormControlLabel value="yes" control={<Radio required />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Box>

          <Button 
            type="submit"
            variant="contained"
            fullWidth
            size="large"
          >
            Submit Application
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ArtistApplicationPage;
