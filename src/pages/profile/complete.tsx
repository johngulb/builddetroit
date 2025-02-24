import React from "react";
import styled from "@emotion/styled";
import { NextSeo } from "next-seo";
import { useContact } from "../../hooks/useUser";
import { ButtonLink } from "../../components/Styled";

const CompletePage = () => {
  const contact = useContact();

  if (!contact) {
    return (
      <PageWrapper>
        <ContentContainer>
          <h2>Please login first</h2>
          <ButtonLink href="/login">Go to Login</ButtonLink>
        </ContentContainer>
      </PageWrapper>
    );
  }

  return (
    <>
      <NextSeo
        title="Complete Your Profile | Detroit Art"
        description="Complete your profile to join the Detroit Art community"
      />
      <PageWrapper>
        <ContentContainer>
          <h1>Complete Your Profile</h1>
          <p>Welcome! Let&apos;s get your profile set up.</p>

          <FormSection>
            <h2>Basic Information</h2>
            <FormGrid>
              <FormField>
                <label>Name</label>
                <input type="text" placeholder="Your name" />
              </FormField>
              <FormField>
                <label>Public Display Name</label>
                <input type="text" placeholder="How you'll appear to others" />
              </FormField>
              <FormField>
                <label>Bio</label>
                <textarea placeholder="Tell us about yourself" />
              </FormField>
            </FormGrid>
          </FormSection>

          <FormSection>
            <h2>Profile Picture</h2>
            <ImageUploadArea>
              <p>Drop an image here or click to upload</p>
            </ImageUploadArea>
          </FormSection>

          <ButtonLink href="/profile">Complete Profile</ButtonLink>
        </ContentContainer>
      </PageWrapper>
    </>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #fafafa;
`;

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    margin-bottom: 2rem;
  }
`;

const FormSection = styled.section`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const FormGrid = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const FormField = styled.div`
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #28303d;
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const ImageUploadArea = styled.div`
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #28303d;
  }

  p {
    margin: 0;
    color: #666;
  }
`;

export default CompletePage;
