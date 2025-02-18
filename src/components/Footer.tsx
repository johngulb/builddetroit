import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

const FooterWrapper = styled.footer`
  text-align: center;
  padding: 2rem;
  background-color: #d2e4dd;
  border-top: solid 2px #ddd;

  .links {
    margin-top: 1rem;
    font-size: 0.9rem;
    
    a {
      color: #555;
      text-decoration: none;
      margin: 0 0.5rem;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <a href="https://thedetroitilove.com/" target="_blank" rel="noopener noreferrer">
        <img
          width="80"
          src="https://thedetroitilove.com/wp-content/uploads/2022/08/TDIL-acid-heart-700x688.png"
          className="custom-logo"
          alt="The Detroit I Love logo"
        />
      </a>
      <div>
        <p>
          Looking for something fun to do tonight? Look no further than
          the{" "}
          <a href="https://thedetroitilove.com/" target="_blank" rel="noopener noreferrer">
            detroitilove.com
          </a>
          .
        </p>
      </div>
      <div className="links">
        <Link href="/terms">Terms</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/community-guidelines">Community Guidelines</Link>
      </div>
    </FooterWrapper>
  );
};