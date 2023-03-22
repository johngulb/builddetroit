import styled from "@emotion/styled";

const SpeakerWrapper = styled.div`
  margin-bottom: 12px;
`;

const Image = styled.img`
  width: 100px;
`;

const Name = styled.div`
  font-weight: bold;
`;

const Bio = styled.div`
  font-size: 0.8rem;
`;

export const Speaker = ({ name, image, bio }) => {
  return (
    <SpeakerWrapper>
      <Image src={image} alt={name} />
      <Name>{name}</Name>
      <Bio>{bio}</Bio>
    </SpeakerWrapper>
  );
};