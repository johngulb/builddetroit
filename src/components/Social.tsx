import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import { SectionTitle } from "./Styled";

interface SocialProps {
  discord?: string;
  instagram?: string;
  slack?: string;
}

export const Social: React.FC<
  React.PropsWithChildren<SocialProps>
> = ({
  discord,
  instagram,
  slack
}) => {
  return (
    <SocialWrapper>
      <SectionTitle>JOIN US ON SOCIAL</SectionTitle>
      {discord && (
        <SocialLink
          href={discord}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            alt="Join the Discord"
            src="/images/discord.svg"
            width={88}
            height={88}
          />
        </SocialLink>
      )}
      {instagram && (
        <SocialLink
          href={instagram}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            alt="Follow us on Instagram"
            src="/images/instagram.png"
            width={88}
            height={88}
          />
        </SocialLink>
      )}
      {slack && (
        <SocialLink
          href={slack}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            alt="Join us on Slack"
            src="/images/slack.png"
            width={88}
            height={88}
          />
        </SocialLink>
      )}
    </SocialWrapper>
  );
};

const SocialWrapper = styled.div`
  padding: 1rem;
  text-align: center;
`;

const SocialLink = styled.a`
  padding: 1rem;
  img {
    width: 88px;
  }
`;
