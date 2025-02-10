import { useState } from 'react';
import styled from "@emotion/styled";

const Container = styled.div`
  background-color: #EBF5FF;
  padding: 2rem;
  border-radius: 0.5rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1E3A8A;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #1E40AF;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: 1px solid #93C5FD;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #3B82F6;
  }
`;

const Button = styled.button`
  width: 100%;
  background-color: #2563EB;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1D4ED8;
  }
`;

const SmallText = styled.p`
  font-size: 0.875rem;
  color: #1D4ED8;
  margin-top: 1rem;
`;

const SuccessContainer = styled(Container)`
  text-align: center;
`;

const SuccessTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #1E3A8A;
`;

const SuccessMessage = styled.p`
  margin-top: 0.5rem;
  color: #1E40AF;
`;

const EmailCapture = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual email capture logic
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SuccessContainer>
        <SuccessTitle>Thanks for your interest!</SuccessTitle>
        <SuccessMessage>We&apos;ll notify you when we launch in Detroit.</SuccessMessage>
      </SuccessContainer>
    );
  }

  return (
    <Container>
      <Title>
        Join Detroit&apos;s Newest Community App
      </Title>
      <Description>
        Be among the first to experience a new way to connect with founders. 
        Sign up for early access to our beta launch!
      </Description>
      
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <Button type="submit">
          Get Early Access
        </Button>
      </form>
      
      <SmallText>
        Join our waitlist today and get notified when we launch in your neighborhood.
      </SmallText>
    </Container>
  );
};

export default EmailCapture;
