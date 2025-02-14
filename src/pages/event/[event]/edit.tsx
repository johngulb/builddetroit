import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  styled,
  Autocomplete,
  Chip,
  IconButton,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import router from "next/router";
import { getEvent, updateEvent } from "../../../dpop";
import { getUser } from "../../../dpop";

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

const EditEventPage = ({ event }) => {
  const [user, setUser] = React.useState(null);
  const [eventTitle, setEventTitle] = React.useState(event.title);
  const [description, setDescription] = React.useState(event.content);
  const [imageUrl, setImageUrl] = React.useState(event.image);
  const [imagePreview, setImagePreview] = React.useState(event.image);
  const fileInputRef = React.useRef(null);
  const [startDate, setStartDate] = React.useState(new Date(event.start_date));
  const [endDate, setEndDate] = React.useState(new Date(event.end_date));
  const [selectedTags, setSelectedTags] = React.useState(
    event.event_categories?.map(c => c.name) || []
  );

  const tags = [
    "Art",
    "Music", 
    "Technology",
    "Community",
    "Workshop",
    "Performance",
    "Exhibition",
    "Social",
    "Education",
    "Networking",
    "Food",
    "Drinks",
    "Family Friendly",
    "18+",
    "21+",
    "Free",
    "Paid",
    "Virtual",
    "In Person",
  ];

  React.useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

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
        setImageUrl(data.url);
        setImagePreview(URL.createObjectURL(file));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEvent = await updateEvent({
      id: event.id,
      title: eventTitle,
      content: description,
      image: imageUrl,
      start_date: startDate?.toISOString(),
      end_date: endDate?.toISOString(),
      event_categories: selectedTags,
    });

    if (updatedEvent) {
      router.push(`/event/${event.slug}`);
    }
  };

  if (!user) {
    return (
      <StyledContainer maxWidth="md">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Edit Event
        </Typography>
        <Typography align="center">
          Please login to edit this event
        </Typography>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer maxWidth="md">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Edit Event
      </Typography>

      <StyledPaper>
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
              <IconButton color="primary" component="span">
                <AddPhotoAlternateIcon fontSize="large" />
              </IconButton>
              <Typography>
                {imagePreview ? "Change Event Image" : "Upload Event Image"}
              </Typography>
              {imagePreview && (
                <PreviewImage src={imagePreview} alt="Event preview" />
              )}
            </ImageUploadBox>
          </FormField>

          <FormField>
            <TextField
              label="Event Title"
              variant="outlined"
              fullWidth
              required
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
          </FormField>

          <FormField>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormField>

          <FormField>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Start Date & Time"
                value={startDate}
                onChange={setStartDate}
                renderInput={(params) => (
                  <TextField {...params} fullWidth required />
                )}
                views={["year", "month", "day", "hours", "minutes"]}
              />
            </LocalizationProvider>
          </FormField>

          <FormField>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="End Date & Time"
                value={endDate}
                onChange={setEndDate}
                renderInput={(params) => (
                  <TextField {...params} fullWidth required />
                )}
                views={["year", "month", "day", "hours", "minutes"]}
                minDateTime={startDate || undefined}
              />
            </LocalizationProvider>
          </FormField>

          <FormField>
            <Autocomplete
              multiple
              options={tags}
              value={selectedTags}
              onChange={(_, newValue) => setSelectedTags(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Tags"
                  placeholder="Select tags"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    key={option}
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
            />
          </FormField>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Update Event
          </Button>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export const getServerSideProps = async ({ query }) => {
  const event = await getEvent(query.event);
  
  return {
    props: {
      event,
    },
  };
};

export default EditEventPage;
