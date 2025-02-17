import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { TextField, Button as MuiButton, Typography, Autocomplete } from "@mui/material";
import { createArtwork, getArtists } from "../../dpop";

const CreateArtworkPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);

  useEffect(() => {
    const loadArtists = async () => {
      try {
        const artistsData = await getArtists();
        setArtists(artistsData);
      } catch (error) {
        console.error("Error loading artists:", error);
      }
    };
    loadArtists();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const { url } = await response.json();
      setImageUrl(url);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageUrl) {
      alert("Please upload an image first");
      return;
    }

    if (!selectedArtist) {
      alert("Please select an artist");
      return;
    }

    try {
      const artwork = await createArtwork({
        title,
        description,
        artist_id: selectedArtist.id,
        data: {
          image: imageUrl,
        },
      });

      if (artwork.slug) {
        router.push(`/artwork/${artwork.slug}`);
      }
    } catch (error) {
      console.error("Error creating artwork:", error);
      alert("Failed to create artwork. Please try again.");
    }
  };

  return (
    <PageWrapper>
      <Typography variant="h5" gutterBottom>Create New Artwork</Typography>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <TextField
            fullWidth
            label="Title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            variant="outlined"
          />
        </FormGroup>

        <FormGroup>
          <TextField
            fullWidth
            label="Description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            multiline
            rows={4}
            variant="outlined"
          />
        </FormGroup>

        <FormGroup>
          <Autocomplete
            options={artists}
            getOptionLabel={(artist) => artist.name}
            value={selectedArtist}
            onChange={(_, newValue) => setSelectedArtist(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Artist"
                variant="outlined"
                required
                fullWidth
              />
            )}
          />
        </FormGroup>

        <FormGroup>
          <Typography variant="subtitle2" gutterBottom>Upload Image</Typography>
          <ImageUploadContainer>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              required
            />
            {uploading && <UploadStatus>Uploading...</UploadStatus>}
            {imageUrl && (
              <ImagePreview>
                <img src={imageUrl} alt="Preview" />
              </ImagePreview>
            )}
          </ImageUploadContainer>
        </FormGroup>

        <MuiButton 
          variant="contained" 
          type="submit" 
          disabled={!imageUrl || uploading || !selectedArtist}
          fullWidth
        >
          Create Artwork
        </MuiButton>
      </Form>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ImageUploadContainer = styled.div`
  input[type="file"] {
    margin-bottom: 1rem;
  }
`;

const ImagePreview = styled.div`
  max-width: 300px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const UploadStatus = styled.div`
  color: #666;
  margin: 0.5rem 0;
  font-style: italic;
`;

export default CreateArtworkPage;
