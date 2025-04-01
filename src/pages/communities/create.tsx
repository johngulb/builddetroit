import React from "react";
import { NextSeo } from 'next-seo';
import { useRouter } from "next/router";
import { Community, createCommunity, uploadMedia } from "../../dpop";
import { 
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  styled
} from '@mui/material';
import UploadMedia from '../../components/UploadMedia';
const ImagePreview = styled('div')({
  marginTop: '1rem',
  width: '200px',
  height: '200px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
});

const CreateCommunityPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [imagePreview, setImagePreview] = React.useState('');
  const [coverPreview, setCoverPreview] = React.useState('');
  const [name, setName] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [type, setType] = React.useState<string>('');
  const [image, setImage] = React.useState<string>('');
  const [cover, setCover] = React.useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const community = await createCommunity({
        name,
        description,
        image,
        data: { type }
      });
      if (community.slug) {
        router.push(`/communities/${community.slug}`);
      } else {
        throw new Error('Failed to create community');
      }
    } catch (error) {
      console.error('Error creating community:', error);
      alert('Failed to create community. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'description') {
      setDescription(value);
    } else if (name === 'image') {
      setImage(value);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, bgcolor: '#fafafa' }}>
      <NextSeo
        title="Create New Community | Detroit Communities"
        description="Create a new community in Detroit. Connect with others and make a difference."
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/communities/create`}
      />
      
      <Typography variant="h4" component="h1" gutterBottom>
        Create a New Community
      </Typography>
      
      <Paper 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ 
          maxWidth: 600,
          mx: 'auto',
          p: 4,
          borderRadius: 2,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Box mb={3}>
          <TextField
            fullWidth
            required
            id="name"
            name="name"
            label="Community Name"
            value={name}
            onChange={handleChange}
          />
        </Box>

        <Box mb={3}>
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            id="description"
            name="description"
            label="Mission Statement"
            value={description}
            onChange={handleChange}
          />
        </Box>

        <UploadMedia
          onUploadComplete={(url) => setImage(url)}
          label="Profile Image"
          buttonText="Choose File"
          accept="image/*"
          showPreview={true}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{
            bgcolor: '#0066cc',
            '&:hover': {
              bgcolor: '#0051cc'
            }
          }}
        >
          {isSubmitting ? 'Creating...' : 'Create Community'}
        </Button>
      </Paper>
    </Container>
  );
};

export default CreateCommunityPage;
