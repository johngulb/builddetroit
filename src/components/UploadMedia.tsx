import React, { useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { uploadMedia } from '../dpop';
import Image from 'next/image';

interface UploadMediaProps {
  onUploadComplete: (url: string) => void;
  label?: string;
  buttonText?: string;
  accept?: string;
  showPreview?: boolean;
}

const UploadMedia: React.FC<UploadMediaProps> = ({
  onUploadComplete,
  label = 'Upload Media',
  buttonText = 'Choose File',
  accept = 'image/*',
  showPreview = true,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview if showing previews
    if (showPreview) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    try {
      setIsUploading(true);
      setError(null);
      
      const response = await uploadMedia(file);
      
      if (response.url) {
        onUploadComplete(response.url);
      } else {
        throw new Error('Upload failed: No URL returned');
      }
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="subtitle1">{label}</Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="contained"
          component="label"
          disabled={isUploading}
          startIcon={isUploading ? <CircularProgress size={20} /> : undefined}
        >
          {isUploading ? 'Uploading...' : buttonText}
          <input
            type="file"
            hidden
            accept={accept}
            onChange={handleFileChange}
          />
        </Button>
      </Box>
      
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      
      {showPreview && preview && (
        <Box 
          sx={{ 
            mt: 2, 
            maxWidth: '300px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            overflow: 'hidden'
          }}
        >
          <Image 
            src={preview}
            alt="Preview"
            width={300}
            height={300}
            style={{ 
              width: '100%', 
              height: 'auto',
              display: 'block'
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default UploadMedia;
