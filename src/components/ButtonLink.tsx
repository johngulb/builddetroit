import styled from "@emotion/styled";

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
  &.compact {
    padding: 0rem 0.5rem;
    display: inline-block;
    font-size: 1rem;
  }
  &:hover {
    color: #28303d;
    background-color: transparent;
  }
`;

export const ButtonLinkCompact = styled(ButtonLink)`
  padding: 0rem 0.5rem;
  display: inline-block;
  font-size: 1rem;
`;
