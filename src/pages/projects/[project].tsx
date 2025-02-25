import React, { useState } from "react";
import { getProject } from "../../dpop";
import styled from "@emotion/styled";
import Link from "next/link";
import { TextField, Button } from "@mui/material";

const ProjectPage = ({ project }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    try {
      // Get rating from AI
      const ratingResponse = await fetch("/api/ai/rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: message,
          projectContext: {
            title: project.title,
            description: project.description,
            url: project.data.url,
          },
        }),
      });

      const ratingData = await ratingResponse.json();
      
      // Add rating info to chat history
      const ratingMessage = {
        type: "rating",
        content: {
          rating: ratingData.rating.rating,
          analysis: ratingData.rating.analysis,
          category: ratingData.rating.category
        }
      };
      
      // Add messages to chat history
      setChatHistory([
        ...chatHistory,
        { type: "user", content: message },
        ratingMessage,
        { 
          type: "ai", 
          content: ratingData.rating.is_useful 
            ? `Thank you for your message! Your rating is ${ratingData.rating.rating}/10.`
            : `I cannot process this message because: ${ratingData.rating.explanation_if_not_useful}. Please try rephrasing your message.`
        },
      ]);
      
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <ProjectHeader>
        <div className="project-grid">
          <div className="project-image">
            <img src={project.data.image} alt={project.title} />
          </div>
          <div className="project-details">
            <h1>{project.title}</h1>
            <p className="project-description">{project.description}</p>

            {project.website && (
              <div className="project-link">
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Project Website
                </a>
              </div>
            )}
          </div>
        </div>
      </ProjectHeader>

      <ChatSection>
        <h2>Project Chat</h2>
        <div className="chat-container">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.type}`}>
              <span className="message-label">
                {msg.type === "user" ? "You" : msg.type === "ai" ? "AI" : "Rating"}
              </span>
              {msg.type === "rating" ? (
                <div className="rating-content">
                  <p><strong>Rating:</strong> {msg.content.rating}/10</p>
                  <p><strong>Category:</strong> {msg.content.category}</p>
                  <p><strong>Analysis:</strong> {msg.content.analysis}</p>
                </div>
              ) : (
                <p>{msg.content}</p>
              )}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="chat-input">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Ask about this project or provide feedback..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading || !message.trim()}
          >
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </form>
      </ChatSection>
    </PageWrapper>
  );
};

export const getServerSideProps = async ({ params }) => {
  try {
    const project = await getProject(params.project);

    if (!project) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        project,
      },
    };
  } catch (error) {
    console.error("Error fetching project data:", error);
    return {
      notFound: true,
    };
  }
};

const PageWrapper = styled.div`
  background-color: #fafafa;
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
`;

const ProjectHeader = styled.div`
  .project-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .project-image {
      img {
        width: 100%;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
    }

    .project-details {
      h1 {
        font-size: 2.5rem;
        margin: 0 0 1rem 0;
        color: #333;
      }

      .project-description {
        font-size: 1.1rem;
        line-height: 1.6;
        color: #666;
        margin-bottom: 2rem;
      }

      .project-link {
        a {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background-color: #0070f3;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: 500;
          transition: background-color 0.2s;

          &:hover {
            background-color: #0051cc;
          }
        }
      }
    }
  }
`;

const ChatSection = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 1.5rem;
    color: #333;
  }

  .chat-container {
    min-height: 300px;
    max-height: 500px;
    overflow-y: auto;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 8px;

    .chat-message {
      margin-bottom: 1rem;
      padding: 1rem;
      border-radius: 8px;

      &.user {
        background: #e3f2fd;
        margin-left: 2rem;
      }

      &.ai {
        background: #f5f5f5;
        margin-right: 2rem;
      }

      &.rating {
        background: #fff3e0;
        margin: 1rem 4rem;
      }

      .message-label {
        font-size: 0.8rem;
        color: #666;
        margin-bottom: 0.5rem;
        display: block;
      }

      p {
        margin: 0;
        line-height: 1.4;
      }

      .rating-content {
        p {
          margin-bottom: 0.5rem;
        }
      }
    }
  }

  .chat-input {
    display: flex;
    gap: 1rem;
    align-items: flex-start;

    button {
      padding: 1rem 2rem;
    }
  }
`;

export default ProjectPage;
