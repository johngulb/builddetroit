import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { TextField, Button, Typography } from "@mui/material";
import { getArtwork, addArtworkContent } from "../../../dpop";

const UploadContentPage = ({ artwork }) => {
  const router = useRouter();
  const [caption, setCaption] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fileTimestamp, setFileTimestamp] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      try {
        setUploading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const { url } = await response.json();
        setUploadUrl(url);
        setFileTimestamp(selectedFile.lastModified ? new Date(selectedFile.lastModified).toISOString() : new Date().toISOString());
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file. Please try again.");
      } finally {
        setUploading(false);
      }
    }
  };

  //   const handleYoutubeUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setYoutubeUrl(e.target.value);
  //     setFile(null); // Clear file when YouTube URL entered
  //   };

  //   const getYoutubeId = (url: string) => {
  //     const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  //     const match = url.match(regExp);
  //     return match && match[2].length === 11 ? match[2] : null;
  //   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setUploading(true);

      // Add content to artwork
      await addArtworkContent(artwork.slug, {
        caption,
        data: {
          url: uploadUrl,
          type: file?.type || "image/jpeg",
          width: 0,
          height: 0,
        },
        timestamp: fileTimestamp
      });

      router.push(`/artwork/${artwork.slug}`);
    } catch (error) {
      console.error("Error uploading content:", error);
      alert("Failed to upload content. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <PageWrapper>
      <Typography variant="h5" gutterBottom>
        Upload Content
      </Typography>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <TextField
            fullWidth
            label="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            multiline
            rows={3}
            variant="outlined"
          />
        </FormGroup>

        <FormGroup>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            disabled={!!youtubeUrl}
          />
          {uploadUrl && (
            <div>
              <img src={uploadUrl} alt="Uploaded content" style={{maxWidth: '100%', marginTop: '1rem'}} />
              <Typography variant="caption" display="block" style={{marginTop: '0.5rem'}}>
                Upload timestamp: {new Date(fileTimestamp).toLocaleString()}
              </Typography>
            </div>
          )}
        </FormGroup>

        {/* <FormGroup>
          <TextField
            fullWidth
            label="YouTube URL"
            value={youtubeUrl}
            onChange={handleYoutubeUrlChange}
            disabled={!!file}
            variant="outlined"
            placeholder="https://youtube.com/watch?v=..."
          />
        </FormGroup> */}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={uploading || (!uploadUrl)}
        >
          {uploading ? "Uploading..." : "Upload Content"}
        </Button>
      </Form>
    </PageWrapper>
  );
};

export async function getServerSideProps({ params }) {
  const artwork = await getArtwork(params.artwork);
  return { props: { artwork } };
}

const PageWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  width: 100%;
`;

export default UploadContentPage;
