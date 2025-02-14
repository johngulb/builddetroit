import React, { useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { TextField, Button as MuiButton, Typography } from "@mui/material";
import { createArtist } from "../../dpop";

const CreateArtistPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(e.target.value);
  };

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
      setProfilePicture(url);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profilePicture) {
      alert("Please upload a profile picture first");
      return;
    }

    try {
      const artist = await createArtist({
        name,
        handle,
        bio,
        profile_picture: profilePicture,
      });

      if (artist.slug) {
        router.push(`/artists/${artist.slug}`);
      }
    } catch (error) {
      console.error("Error creating artist:", error);
      alert("Failed to create artist. Please try again.");
    }
  };

  return (
    <PageWrapper>
      <Typography variant="h5" gutterBottom>Create New Artist</Typography>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <TextField
            fullWidth
            label="Name"
            id="name"
            value={name}
            onChange={(e) => handleInput(e, setName)}
            required
            variant="outlined"
          />
        </FormGroup>

        <FormGroup>
          <TextField
            fullWidth
            label="Handle"
            id="handle"
            value={handle}
            onChange={(e) => handleInput(e, setHandle)}
            required
            variant="outlined"
            helperText="A unique identifier for the artist (e.g. @artistname)"
          />
        </FormGroup>

        <FormGroup>
          <TextField
            fullWidth
            label="Bio"
            id="bio"
            value={bio}
            onChange={(e) => handleInput(e, setBio)}
            required
            multiline
            rows={4}
            variant="outlined"
          />
        </FormGroup>

        <FormGroup>
          <Typography variant="subtitle2" gutterBottom>Upload Profile Picture</Typography>
          <ImageUploadContainer>
            <input
              type="file"
              id="profile_picture"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor="profile_picture">
              <MuiButton
                variant="contained"
                component="span"
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Choose File'}
              </MuiButton>
            </label>
            {profilePicture && (
              <PreviewImage src={profilePicture} alt="Profile preview" />
            )}
          </ImageUploadContainer>
        </FormGroup>

        <SubmitButton
          type="submit"
          variant="contained"
          disabled={!name || !handle || !bio || !profilePicture}
        >
          Create Artist
        </SubmitButton>
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
  align-items: flex-start;
`;

const PreviewImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
  border-radius: 4px;
`;

const SubmitButton = styled(MuiButton)`
  margin-top: 1rem;
`;

export default CreateArtistPage;
