import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { TextField, Button, Typography } from "@mui/material";
import { createProject } from "../../dpop";


const CreateProjectPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const project = await createProject({
        title,
        description,
        data: {
          image: imageUrl,
          url,
        },
      });

      router.push(`/projects/${project.id}`);
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
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
      setIsUploading(false);
    }
  };

  return (
    <PageWrapper>
      <Typography variant="h4" gutterBottom>
        Create New Project
      </Typography>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <TextField
            fullWidth
            label="Project Title"
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
            multiline
            rows={4}
            required
            variant="outlined"
          />
        </FormGroup>

        <FormGroup>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleImageUpload}
          />
          {imageUrl && (
            <div>
              <img
                src={imageUrl}
                alt="Uploaded content"
                style={{ maxWidth: "100%", marginTop: "1rem" }}
              />
            </div>
          )}
        </FormGroup>

        <FormGroup>
          <TextField
            fullWidth
            label="Project URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            variant="outlined"
          />
        </FormGroup>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting || isUploading}
          size="large"
        >
          {isSubmitting ? "Creating..." : "Create Project"}
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
  margin-top: 2rem;
`;

const FormGroup = styled.div`
  width: 100%;
`;

export default CreateProjectPage;
