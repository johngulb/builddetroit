import React from "react";
import { createEvent, getUser, getVenues } from "../../dpop";
import { User, Venue } from "../../interfaces";
import Link from "next/link";
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
  Tabs,
  Tab,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import router from "next/router";

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`event-tabpanel-${index}`}
      aria-labelledby={`event-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const CreateEventPage = () => {
  const [user, setUser] = React.useState<User>();
  const [eventTitle, setEventTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [showForm, setShowForm] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [urlInput, setUrlInput] = React.useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [startDate, setStartDate] = React.useState<Date | null>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(18, 0, 0, 0);
    return tomorrow;
  });
  const [endDate, setEndDate] = React.useState<Date | null>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(21, 0, 0, 0);
    return tomorrow;
  });
  const [venues, setVenues] = React.useState<Venue[]>([]);
  const [selectedVenue, setSelectedVenue] = React.useState<Venue | null>(null);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    setShowForm(false);
    setImagePreview(null);
    setImageUrl("");
    setUrlInput("");
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
        setShowForm(true);

        const eventDetails = await fetch("/api/event/extract", {
          method: "POST",
          body: JSON.stringify({ imageUrl: data.url }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const eventDetailsData = await eventDetails.json();
        console.log(eventDetailsData);

        setEventTitle(eventDetailsData.title);
        setDescription(eventDetailsData.description);
        setStartDate(new Date(eventDetailsData.start_datetime));
        setEndDate(new Date(eventDetailsData.end_datetime));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleUrlSubmit = async () => {
    if (urlInput) {
      try {
        setImageUrl(urlInput);
        setImagePreview(urlInput);
        setShowForm(true);

        const eventDetails = await fetch("/api/event/extract", {
          method: "POST",
          body: JSON.stringify({ imageUrl: urlInput }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const eventDetailsData = await eventDetails.json();
        setEventTitle(eventDetailsData.title);
        setDescription(eventDetailsData.description);
        setStartDate(new Date(eventDetailsData.start_datetime));
        setEndDate(new Date(eventDetailsData.end_datetime));
      } catch (error) {
        console.error("Error processing URL:", error);
      }
    }
  };

  React.useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);

    const loadVenues = async () => {
      try {
        const venueData = await getVenues({ type: "upcoming-events" });
        setVenues(venueData);
      } catch (error) {
        console.error("Error loading venues:", error);
      }
    };

    loadVenues();
  }, []);

  React.useEffect(() => {
    if (startDate && (!endDate || endDate <= startDate)) {
      const newEndDate = new Date(startDate);
      newEndDate.setHours(newEndDate.getHours() + 3);
      setEndDate(newEndDate);
    }
  }, [startDate, endDate]);

  if (!user) {
    return (
      <StyledContainer maxWidth="md">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Create Event
        </Typography>
        <Typography align="center">
          Please <Link href="/login">login</Link> or{" "}
          <Link href="/register">register</Link> to create an event
        </Typography>
      </StyledContainer>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const event = await createEvent({
      title: eventTitle,
      content: description,
      image: imageUrl,
      start_date: startDate?.toISOString(),
      end_date: endDate?.toISOString(),
      venue_id: selectedVenue?.id,
      event_categories: selectedTags,
    });

    if (event) {
      router.push(`/events/${event.slug}`);
    }
  };

  return (
    <StyledContainer maxWidth="md">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Create Event
      </Typography>

      <StyledPaper>
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="Upload Flyer" />
          <Tab label="Upload URL" />
          <Tab label="Manual" />
        </Tabs>

        <Box component="form" onSubmit={handleSubmit}>
          <TabPanel value={selectedTab} index={0}>
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
          </TabPanel>

          <TabPanel value={selectedTab} index={1}>
            <FormField>
              <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleUrlSubmit}
                sx={{ mt: 2 }}
              >
                Load Image
              </Button>
              {imagePreview && (
                <PreviewImage src={imagePreview} alt="Event preview" />
              )}
            </FormField>
          </TabPanel>

          <TabPanel value={selectedTab} index={2}>
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
                  onChange={(newValue) => {
                    if (newValue) {
                      setStartDate(newValue);
                    }
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                    },
                  }}
                  views={["year", "month", "day", "hours", "minutes"]}
                />
              </LocalizationProvider>
            </FormField>

            <FormField>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="End Date & Time"
                  value={endDate}
                  onChange={(newValue) => {
                    if (newValue) {
                      if (newValue > startDate!) {
                        setEndDate(newValue);
                      }
                    }
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      error: endDate && startDate && endDate <= startDate,
                      helperText:
                        endDate && startDate && endDate <= startDate
                          ? "End time must be after start time"
                          : "",
                    },
                  }}
                  views={["year", "month", "day", "hours", "minutes"]}
                  minDateTime={startDate || undefined}
                />
              </LocalizationProvider>
            </FormField>

            <FormField>
              <Autocomplete
                options={venues}
                getOptionLabel={(venue) => venue.title}
                value={selectedVenue}
                onChange={(_, newValue) => setSelectedVenue(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Venue"
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
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
          </TabPanel>

          {showForm || selectedTab === 2 && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
          >
              Create Event
            </Button>
          )}
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default CreateEventPage;
