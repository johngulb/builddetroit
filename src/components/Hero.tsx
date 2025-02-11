import React from "react";
import styled from "@emotion/styled";
import { TopBar } from "./TopBar";
interface HeroProps {
  title?: React.ReactNode | string;
  subtitle?: string;
  image?: string;
  children?: React.ReactNode;
}

const Hero = ({ title, subtitle, image, children }: HeroProps) => {
  return (
    <HeroWrapper>
      <HeroBackground image={image}>
        {/* Top Bar */}
        <TopBar />

        <HeroContent>
          <div className="content-wrapper">
            {title && <h1>{title}</h1>}
            {subtitle && <p>{subtitle}</p>}
            {children}
          </div>
        </HeroContent>
      </HeroBackground>
    </HeroWrapper>
  );
};

const HeroWrapper = styled.div`
  width: 100%;
  position: relative;
  margin: 0 auto;
`;

const HeroBackground = styled.div<{ image?: string }>`
  width: 100vw;
  min-height: 400px;
  background-image: ${(props) =>
    props.image ? `url(${props.image})` : "none"};
  background-size: cover;
  background-position: center;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem 0;

  .content-wrapper {
    color: white;
    width: 100%;
    text-align: left;

    h1 {
      font-size: 3.5rem;
      font-weight: bold;
      margin-bottom: 1rem;

      @media (max-width: 768px) {
        font-size: 2.5rem;
        padding: 0 1rem;
      }
    }

    p {
      font-size: 1.5rem;
      margin-bottom: 2rem;

      @media (max-width: 768px) {
        font-size: 1.2rem;
        padding: 0 1rem;
      }
    }
  }
`;

export default Hero;
