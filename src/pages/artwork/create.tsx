import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import {
  TextField,
  Button as MuiButton,
  Typography,
  Autocomplete,
} from "@mui/material";
import { createArtwork, getArtists, uploadMedia } from "../../dpop";
import UploadMedia from "../../components/UploadMedia";
const CreateArtworkPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
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

  const generateArtworkDetails = async (imageUrl: string) => {
    if (!imageUrl) return;

    try {
      setGenerating(true);

      // Only generate if title or description is empty
      if (!title || !description) {
        const response = await fetch("/api/ai/artwork", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate artwork details");
        }

        const data = await response.json();

        // Only set values if they're currently empty
        if (!title) setTitle(data.artwork.title);
        if (!description) setDescription(data.artwork.description);
      }
    } catch (error) {
      console.error("Error generating artwork details:", error);
    } finally {
      setGenerating(false);
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
        artist_id: selectedArtist?.id,
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
      <Typography variant="h5" gutterBottom>
        Create New Artwork
      </Typography>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <UploadMedia
            onUploadComplete={(url) => setImageUrl(url)}
            label="Upload Image"
            buttonText="Choose File"
            accept="image/*"
            showPreview={true}
          />
        </FormGroup>
        <MuiButton
          variant="outlined"
          type="button"
          disabled={!imageUrl || generating}
          onClick={() => generateArtworkDetails(imageUrl)}
          fullWidth
          sx={{ mb: 2 }}
        >
          {generating ? "Generating..." : "Generate Title & Description"}
        </MuiButton>
        {generating && (
          <UploadStatus>Generating title and description...</UploadStatus>
        )}
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
                fullWidth
              />
            )}
          />
        </FormGroup>

        <MuiButton
          variant="contained"
          type="submit"
          disabled={!imageUrl || uploading || generating}
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
