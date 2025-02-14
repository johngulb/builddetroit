import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { TextField, Button, Typography, Autocomplete } from "@mui/material";
import { getArtwork, updateArtwork, getArtists } from "../../../dpop";
import { Artist } from "../../../interfaces";

const EditArtworkPage = ({ artwork, artists }) => {
  const router = useRouter();
  const [title, setTitle] = useState(artwork.title);
  const [description, setDescription] = useState(artwork.description);
  const [imageUrl, setImageUrl] = useState(artwork.data.image);
  const [uploading, setUploading] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(artwork.artist || null);
  const [selectedCollaborators, setSelectedCollaborators] = useState<Artist[]>(artwork.collaborators || []);

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

    try {
      await updateArtwork({
        id: artwork.id,
        title,
        description,
        artist_id: selectedArtist?.id,
        data: {
          image: imageUrl,
          collaborator_ids: selectedCollaborators.map((collaborator) => collaborator.id),
        },
      });

      router.push(`/artwork/${artwork.slug}`);
    } catch (error) {
      console.error("Error updating artwork:", error);
      alert("Failed to update artwork. Please try again.");
    }
  };

  return (
    <PageWrapper>
      <Typography variant="h5" gutterBottom>Edit Artwork</Typography>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <TextField
            fullWidth
            label="Title"
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
            getOptionLabel={(option: Artist) => option.name}
            value={selectedArtist}
            onChange={(event, newValue: Artist | null) => {
              setSelectedArtist(newValue);
            }}
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

        <FormGroup>
          <Autocomplete
            multiple
            options={artists.filter(artist => artist.id !== selectedArtist?.id)}
            getOptionLabel={(option: Artist) => option.name}
            value={selectedCollaborators}
            onChange={(event, newValue: Artist[]) => {
              setSelectedCollaborators(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Collaborators"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </FormGroup>

        <FormGroup>
          <Typography variant="subtitle2" gutterBottom>Artwork Image</Typography>
          <ImageUploadContainer>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="image-upload"
              style={{ display: 'none' }}
            />
            <label htmlFor="image-upload">
              <Button
                variant="outlined"
                component="span"
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Change Image'}
              </Button>
            </label>
            {imageUrl && (
              <PreviewImage src={imageUrl} alt="Artwork preview" />
            )}
          </ImageUploadContainer>
        </FormGroup>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Update Artwork
        </Button>
      </Form>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  width: 100%;
`;

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 4px;
`;

export async function getServerSideProps({ params }) {
  const [artwork, artists] = await Promise.all([
    getArtwork(params.artwork),
    getArtists()
  ]);
  
  return {
    props: {
      artwork,
      artists
    }
  };
}

export default EditArtworkPage;
