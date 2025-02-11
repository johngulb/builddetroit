import styled from "@emotion/styled";

export const DPoPLabs = () => {
  return (
    <DPoPLabsContainer>
      <img width="144" src="https://thedetroitilove.com/wp-content/uploads/2022/08/TDIL-acid-heart-700x688.png" className="custom-logo" alt="" />
      <h1>DPoP Labs</h1>
      <p>Our mission is to empower creators in Detroit by deploying technology that drives positive change in our community.</p>
    </DPoPLabsContainer>
  );
};

export const DPoPLabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  p {
    max-width: 440px;
    margin: auto;
  }
`;