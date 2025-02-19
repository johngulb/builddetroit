import React from "react";
import styled from "@emotion/styled";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { User, getUser } from "../../dpop";
import ProfilePicture from "../ProfilePicture";

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled(Box)`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  margin: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SubmitButton = styled(Button)`
  margin-top: 1rem;
`;

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

interface CompleteProfileProps {
  onComplete?: () => void;
}

export const CompleteProfile: React.FC<CompleteProfileProps> = ({
  onComplete,
}) => {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [name, setName] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [profilePicture, setProfilePicture] = React.useState("");

  React.useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
    if (currentUser?.name) {
      setName(currentUser.name);
      setDisplayName(currentUser.public_name || currentUser.name);
    }
    if (currentUser?.organization) {
      setOrganization(currentUser.organization);
    }
  }, []);

  const isProfileIncomplete = React.useMemo(() => {
    return !user?.name || !user?.profile_picture || !user?.public_name || !user?.organization;
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update logic with image upload

    setOpen(false);
    if (onComplete) {
      onComplete();
    }
  };

  if (!isProfileIncomplete) {
    return null;
  }

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Complete Your Profile
      </Button>

      <StyledModal open={open} onClose={() => setOpen(false)}>
        <ModalContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Complete Your Profile
          </Typography>

          <Form onSubmit={handleSubmit}>
            <ImageUploadContainer>
              <ProfilePicture
                data={{ profile_picture: profilePicture }}
                updateData={(data) => setProfilePicture(data.profile_picture)}
              />
            </ImageUploadContainer>

            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              helperText="Your name for our records"
            />

            <TextField
              label="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              fullWidth
              helperText="This is how your name will appear to other users"
            />

            <TextField
              label="Organization"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              fullWidth
              helperText="Optional - Enter your organization or company name"
            />

            <SubmitButton type="submit" variant="contained" fullWidth>
              Save Profile
            </SubmitButton>
          </Form>
        </ModalContent>
      </StyledModal>
    </>
  );
};
