import React from "react";
import styled from "@emotion/styled";
import { Button } from "./Button";
import { getUser, User } from "../dpop";
import { AuthButton } from "./AuthButton";

export const TopBar = () => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const user = getUser();
    setUser(user);
  }, []);

  return (
    <TopBarContainer>
      {/* <div className="left">
        <span className="days">17 D</span>
        <span className="tickets">5 🎟</span>
        </div> */}
      <div className="left" />
      <AuthButton />
    </TopBarContainer>
  );
};

export const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
  img {
    padding: 0;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
  /* background: rgba(0, 0, 0, 0.5); */
  .outline.user-button {
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    &:hover {
      background-color: rgba(255, 255, 255, 0.4);
      color: white;
    }
  }
`;
