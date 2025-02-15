import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  styled,
} from "@mui/material";
import { getArtist, updateArtist } from "../../../dpop";
import { Artist } from "../../../interfaces";

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const FormField = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const ImageUploadBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  textAlign: "center",
  cursor: "pointer",
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
}));

const PreviewImage = styled("img")({
  maxWidth: "100%",
  maxHeight: "200px",
  objectFit: "cover",
  marginTop: "1rem",
});

interface EditArtistPageProps {
  artist: Artist;
}

const EditArtistPage = ({ artist }: EditArtistPageProps) => {
  const router = useRouter();
  const [name, setName] = useState(artist.name);
  const [handle, setHandle] = useState(artist.handle);
  const [bio, setBio] = useState(artist.bio);
  const [profilePicture, setProfilePicture] = useState(artist.profile_picture);
  const [imagePreview, setImagePreview] = useState(artist.profile_picture);
  const fileInputRef = React.useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        setProfilePicture(data.url);
        setImagePreview(URL.createObjectURL(file));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateArtist({
        id: artist.id,
        name,
        handle,
        bio,
        profile_picture: profilePicture,
      });
      router.push(`/artists/${artist.slug}`);
    } catch (error) {
      console.error("Error updating artist:", error);
    }
  };

  return (
    <StyledContainer maxWidth="md">
      <StyledPaper>
        <Typography variant="h4" gutterBottom>
          Edit Artist Profile
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <FormField>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              ref={fileInputRef}
            />
            <ImageUploadBox onClick={() => fileInputRef.current?.click()}>
              <Typography>
                {imagePreview ? "Change Profile Picture" : "Upload Profile Picture"}
              </Typography>
              {imagePreview && (
                <PreviewImage src={imagePreview} alt="Profile preview" />
              )}
            </ImageUploadBox>
          </FormField>

          <FormField>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormField>

          <FormField>
            <TextField
              label="Handle"
              variant="outlined"
              fullWidth
              required
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
            />
          </FormField>

          <FormField>
            <TextField
              label="Bio"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </FormField>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Update Artist
          </Button>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export async function getServerSideProps({ params }) {
  const artist = await getArtist(params.artist);
  
  return {
    props: {
      artist
    }
  };
}

export default EditArtistPage;
