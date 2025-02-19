import React from "react";
import { Box, Container, Typography, Card, Avatar } from "@mui/material";

const mockApplicants = [
  {
    id: 1,
    name: "Sarah Johnson",
    profile_picture: "https://example.com/sarah.jpg",
    organization: "Independent Artist",
    providesEasel: true,
    isAvailable: true,
    submittedAt: "2024-01-15"
  },
  {
    id: 2, 
    name: "Michael Chen",
    profile_picture: null,
    organization: "Detroit Art Studio",
    providesEasel: false,
    isAvailable: true,
    submittedAt: "2024-01-16"
  }
];

const ApplicantsPage = () => {
  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Artist Applications
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Review applications for the 4x4 painting event at Spotlite
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {mockApplicants.map((applicant) => (
            <Card key={applicant.id} sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                  <Avatar 
                    src={applicant.profile_picture || undefined}
                    sx={{ width: 96, height: 96 }}
                  >
                    {!applicant.profile_picture && applicant.name[0].toUpperCase()}
                  </Avatar>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography>{applicant.name}</Typography>
                    {applicant.organization && (
                      <Typography variant="body2" color="text.secondary" fontSize={11}>
                        {applicant.organization}
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Provides own easel: {applicant.providesEasel ? 'Yes' : 'No'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Available Feb 26th: {applicant.isAvailable ? 'Yes' : 'No'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Applied on: {new Date(applicant.submittedAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ApplicantsPage;
