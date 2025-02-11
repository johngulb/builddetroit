import styled from "@emotion/styled";

export const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: bolder;
  margin-top: 1rem;
  margin-bottom: 0.4rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  margin-top: 2rem;
  text-align: left;
  @media only screen and (max-width: 822px) {
    font-size: 1.5rem;
  }
`;

export const SectionSubtitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 0.4rem;
`;

export const CenteredContainer = styled.div`
  padding: 1rem;
  text-align: center;
`;

export const Button = styled.button`
  width: 100%;
  color: white;
  background-color: #28303d;
  border: solid 4px #28303d;
  text-align: center;
  padding: 0.5rem;
  margin: 1rem auto;
  display: block;
  cursor: pointer;
  &:hover {
    color: #28303d;
    background-color: transparent;
  }
`;

export const ButtonLink = styled.a`
  /* color: #d1e4dd; */
  color: white;
  background-color: #28303d;
  border: solid 4px #28303d;
  text-align: center;
  padding: 0.5rem;
  margin: 1rem auto;
  display: block;
  cursor: pointer;
  &:hover {
    color: #28303d;
    background-color: transparent;
  }
  &.hollow {
    color: #28303d;
    background-color: transparent;
    &:hover {
      background-color: #28303d;
      color: white;
    }
  }
  &.inverted {
    color: white;
    background-color: transparent;
    border: solid 4px white;
    &:hover {
      background-color: #28303d;
      color: white;
    }
  }
`;

export const ButtonLinkCompact = styled(ButtonLink)`
  padding: 0rem 0.5rem;
  display: inline-block;
  font-size: 1rem;
  margin-right: 0.5rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
`;
