import React from "react";
import styled from "@emotion/styled";
import { Page } from "../components/Page";
import { EventList } from "../components/Events/EventList";
import { getEvents, getEventCategories } from "../dpop";
import { useRouter } from "next/router";

const SearchPage = ({ events, categories }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [filteredEvents, setFilteredEvents] = React.useState(events);

  React.useEffect(() => {
    const filtered = events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory
        ? event.event_categories?.some((cat) => cat.slug === selectedCategory)
        : true;
      return matchesSearch && matchesCategory;
    });
    setFilteredEvents(filtered);
  }, [searchTerm, selectedCategory, events]);

  return (
    <Page
      meta={{
        title: "Search Events",
        description: "Search and filter Detroit events",
      }}
      headerProps={{
        disableDPoP: false,
        hideFooter: false,
      }}
    >
      <SearchContainer>
        <SearchHeader>
          <h1>Search Events</h1>
          <SearchBar>
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </SearchBar>
        </SearchHeader>

        <ResultsContainer>
          {filteredEvents.length > 0 ? (
            <EventList
              events={filteredEvents}
              variant="compact"
              loadMore={false}
            />
          ) : (
            <NoResults>No events found matching your criteria</NoResults>
          )}
        </ResultsContainer>
      </SearchContainer>
    </Page>
  );
};

export const getServerSideProps = async () => {
  try {
    const events = await getEvents({ limit: 100 });
    const categories = await getEventCategories();

    return {
      props: {
        events,
        categories,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        events: [],
        categories: [],
      },
    };
  }
};

const SearchContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const SearchHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  max-width: 700px;
  margin: 0 auto;

  input,
  select {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  input {
    flex: 1;
  }

  select {
    min-width: 150px;
  }
`;

const ResultsContainer = styled.div`
  margin-top: 2rem;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.2rem;
`;

export default SearchPage;
