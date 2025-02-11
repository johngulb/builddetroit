import React from "react";
import styled from "@emotion/styled";
import { getUser, updateUser, User } from "../../dpop";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ProfilePictureForm from "../../components/ProfilePicture";
import { useRouter } from "next/router";

const EditProfilePage = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [name, setName] = React.useState("");
  const [publicName, setPublicName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [profilePicture, setProfilePicture] = React.useState<string | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    const user = getUser();
    setUser(user);
    if (!user) {
      window.location.href = "/login";
    } else {
      setName(user.name || "");
      setPublicName(user.public_name || "");
      setEmail(user.email || "");
      setPhone(formatPhoneNumber(user.phone || ""));
      setOrganization(user.organization || "");
      setProfilePicture(user.profile_picture || null);
    }
  }, []);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (digits.length >= 10) {
      return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6,10)}`;
    }
    // Partial formatting as user types
    else if (digits.length > 6) {
      return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
    }
    else if (digits.length > 3) {
      return `(${digits.slice(0,3)}) ${digits.slice(3)}`;
    }
    else if (digits.length > 0) {
      return `(${digits}`;
    }
    return '';
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhone(formattedPhone);
  };

  const handleSubmit = React.useCallback(async () => {
    // Remove formatting before sending to API
    const rawPhone = phone.replace(/\D/g, '');
    await updateUser({ 
      name, 
      email, 
      phone: rawPhone, 
      public_name: publicName, 
      organization,
      profile_picture: profilePicture 
    });
    router.push('/profile');
  }, [name, email, phone, publicName, organization, profilePicture]);

  return (
    <ProfileWrapper>
      <ProfileContent>
        <div className="profile-info">
          {user && (
            <div className="user-info">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mb: 3
                }}
              >
                <ProfilePictureForm 
                  data={{ profile_picture: profilePicture }}
                  updateData={(data) => setProfilePicture(data.profile_picture)}
                />
              </Box>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { marginBottom: 2, width: "100%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  value={name}
                  label="Name"
                  variant="filled"
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  value={publicName}
                  label="Public Name"
                  variant="filled"
                  onChange={(e) => setPublicName(e.target.value)}
                />
                <TextField
                  value={email}
                  label="Email"
                  type="email"
                  variant="filled"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  value={phone}
                  label="Phone"
                  variant="filled"
                  onChange={handlePhoneChange}
                  placeholder="(555) 555-5555"
                />
                <TextField
                  value={organization}
                  label="Organization"
                  variant="filled"
                  onChange={(e) => setOrganization(e.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ marginTop: 2 }}
                >
                  Update Profile
                </Button>
              </Box>
            </div>
          )}
        </div>
      </ProfileContent>
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ProfileContent = styled.div`
  padding: 2rem;
  width: 100%;
  max-width: 600px;

  .profile-info {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);

    h2 {
      margin-bottom: 2rem;
      color: #333;
      text-align: center;
    }

    .user-info {
      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    }
  }
`;

export default EditProfilePage;
