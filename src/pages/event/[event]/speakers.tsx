import React from "react";
import styled from "@emotion/styled";
import { ButtonLink } from "../../../components/ButtonLink";

const PageWrapper = styled.div`
  background-color: #fafafa;
  max-width: 700px;
  margin: auto;
  img {
    margin-top: 1rem;
    max-width: 100%;
  }
`;

const PageContainer = styled.div`
  padding: 1rem;
  .rsvp-button {
    width: 100%;
  }
  h3 {
    padding-top: 2em;
    margin-bottom: 0.5em;
    font-weight: bold;
    font-size: 1.3em;
  }
  .last-winner {
    text-align: center;
    font-size: 2rem;
  }
  .winner-id {
    font-weight: bold;
    font-size: 8rem;
  }
`;

const ProfileWrapper = styled.div`
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

const Profile = ({ name, image, bio }) => {
  return (
    <ProfileWrapper>
      <Image src={image} alt={name} />
      <Name>{name}</Name>
      <Bio>{bio}</Bio>
    </ProfileWrapper>
  );
};

const EventPage = () => {
  return (
    <PageWrapper>
      <PageContainer>
        <ButtonLink
          href="https://discord.gg/vsQ8s3KG"
          target="_blank"
          rel="noreferrer"
        >
          Join the Discord
        </ButtonLink>

        <Profile
          name="Robert Konsdorf"
          image="https://detroitartdao.com/wp-content/uploads/2023/02/IMG_3629-e1677184930924.jpeg"
          bio={
            <>
              <p>
                Robert Konsdorf is a product builder, startup founder, and CEO
                with an interest in applying web3 to improve the human
                condition. He is currently building FACINGS, an NFT launchpad
                that enables anyone to seamlessly manage feature-rich NFT
                collections. FACINGS helps creators engage their audiences in
                fresh, new, and exciting ways. Using FACINGS, creators can
                release their own custom-tailored NFT collections, integrated
                into applications ranging from gaming to art galleries,
                physically redeemable products, and more.
              </p>
              <p>
                Rob is also the Cofounder & Chairman of Detroit Ledger
                Technologies (DLT): an operator of Antelope blockchain networks
                such as WAX and EOS. DLT also engineers governance systems and
                decentralized applications, and bootstraps new ventures,
                including FACINGS.
              </p>
            </>
          }
        />
        <Profile
          name="Ben London"
          image="https://detroitartdao.com/wp-content/uploads/2023/02/IMG_0290-e1677192157921.jpeg"
          bio={
            <>
              Ben London, of FUTR Assets is building solutions for artists to
              receive funding while retaining IP We strive to provide an easy
              way for artists to establish and engage with their core fan base.
            </>
          }
        />
        <Profile
          name="Andy Mazzola"
          image="https://detroitartdao.com/wp-content/uploads/2023/02/IMG_9999-e1677184989719.jpeg"
          bio={
            <>
              <p>
                Andy Mazzola is a smart contract develop at Teller finance with
                a strong passion art, in particularly NFT art.
              </p>
            </>
          }
        />
        <Profile
          name="Nate Talbot"
          image="https://detroitartdao.com/wp-content/uploads/2023/02/Messages-Image2376477040-e1677184978363.jpeg"
          bio={
            <>
              <p>
                Nate Talbot: A business strategy consultant specializing in
                creative contracting, business structuring & management,
                intellectual property rights, technology, blockchain structures,
                marketing and branding. Nate spent over 20 years helping
                businesses develop and strategize creative methods for
                positioning themselves in an ever-growing, 24-7 business cycle.
                Entering the world of Bitcoin in 2014, Nate has spent the past
                several years diving deep into how blockchain and other
                decentralized technologies will impact business operations,
                societal expectations, and how we will interact with each other
                into the future.
              </p>
            </>
          }
        />
        <Profile
          name="John Gulbronson"
          image="https://detroitartdao.com/wp-content/uploads/2023/02/johng-scaled-e1677184998902.jpeg"
          bio={
            <>
              <p>
                John Gulbronson is a developer and product builder with over 12
                years experience deploying solutions that engage and grow
                communities. He is currently a product lead at a fast growing
                financial media company leading teams of developers and
                empowering content creators to bring easy to consumer
                information to end users.
              </p>
              <p>
                With a passion to learn he is making breaking into the world of
                cryptography and blockchains with an emphasis on usability and
                creative ways to drive adoption of the technology.
              </p>
            </>
          }
        />
      </PageContainer>
    </PageWrapper>
  );
};

export default EventPage;
