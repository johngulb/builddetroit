import React from "react";
import styled from "@emotion/styled";
import { useUser, useContact } from "../hooks/useUser";
import { Button } from "./Button";

export const AuthButton = () => {
  const user = useUser();
  const contact = useContact();
  
  const handleLogin = React.useCallback(() => {
    window.location.href = "/login";
  }, []);

  const handleCompleteProfile = React.useCallback(() => {
    window.location.href = "/profile/complete";
  }, []);

  return (
    <AuthButtonContainer>
      {user ? (
        <a href={`/profile`} className={user?.profile_picture ? "has-profile-picture" : ""}>
          {user?.profile_picture ? (
            <img src={user?.profile_picture} alt={user?.name} />
          ) : (
            <Button variant="outline" className="user-button">
              {user?.public_name || user?.name}
            </Button>
          )}
        </a>
      ) : (
        <>
          {contact ? (
            <CompleteProfileButton onClick={handleCompleteProfile}>
              Complete Profile
            </CompleteProfileButton>
          ) : (
            <LoginButton onClick={handleLogin}>Login</LoginButton>
          )}
        </>
      )}
    </AuthButtonContainer>
  );
};

const AuthButtonContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    border-radius: 50%;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #666;
  }
  img {
    width: 46px;
    height: 46px;
  }
  a.has-profile-picture {
    width: 46px;
    height: 46px;
  }
`;

const LoginButton = styled.button`
  background: transparent;
  border: 2px solid #666;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
  color: #666;

  &:hover {
    background: #666;
    color: white;
  }
`;

const CompleteProfileButton = styled(LoginButton)`
  background: #28303d;
  border-color: #28303d;
  color: white;

  &:hover {
    background: #1a1f28;
    border-color: #1a1f28;
  }
`;
