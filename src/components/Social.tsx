import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import { SectionTitle } from "./Styled";

export const Social: React.FC<React.PropsWithChildren> = () => {
  return (
    <SocialWrapper>
      <SectionTitle>JOIN US ON SOCIAL</SectionTitle>
      <SocialLink
        href="https://discord.gg/bK8wjhS2Mg"
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
      <SocialLink
        href="https://www.instagram.com/detroitartdao/"
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
