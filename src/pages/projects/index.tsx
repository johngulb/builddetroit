import React from "react";
import { getProjects } from "../../dpop";
import styled from "@emotion/styled";
import Link from "next/link";

const ProjectsPage = ({ projects }) => {
  return (
    <PageWrapper>
      <PageHeader>
        <h1>Projects</h1>
        <Link href="/projects/new">
          <CreateButton>Create Project</CreateButton>
        </Link>
      </PageHeader>

      <ProjectsGrid>
        {projects.map((project) => (
          <ProjectCard key={project.id}>
            <Link href={`/projects/${project.slug}`}>
              <div className="project-content">
                {project.image && (
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                  </div>
                )}
                <div className="project-info">
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                </div>
              </div>
            </Link>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    margin: 0;
  }
`;

const CreateButton = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0051cc;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled.div`
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .project-content {
    .project-image {
      width: 100%;
      height: 200px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .project-info {
      padding: 1rem;

      h2 {
        margin: 0 0 0.5rem 0;
        font-size: 1.25rem;
      }

      p {
        margin: 0;
        color: #666;
        font-size: 0.9rem;
        line-height: 1.4;
      }
    }
  }
`;

export const getServerSideProps = async () => {
  const projects = await getProjects();
  
  return {
    props: {
      projects,
    },
  };
};

export default ProjectsPage;
