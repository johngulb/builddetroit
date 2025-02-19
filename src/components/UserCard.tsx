import React from 'react';
import styled from '@emotion/styled';
import { User } from '../dpop';

interface UserCardProps {
  user: User;
  variant?: 'horizontal' | 'vertical';
}

const Container = styled.div<{variant: 'horizontal' | 'vertical'}>`
  display: flex;
  flex-direction: ${props => props.variant === 'vertical' ? 'column' : 'row'};
  align-items: center;
  font-size: 1rem;
  margin-bottom: 0.25rem;
  gap: 8px;
`;

const ProfileImage = styled.img<{size: number}>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 !important;
`;

const ProfileInitial = styled.div<{size: number, fontSize: number}>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.fontSize}px;
`;

const InfoContainer = styled.div<{variant: 'horizontal' | 'vertical'}>`
  display: flex;
  flex-direction: ${props => props.variant === 'vertical' ? 'column' : 'row'};
  align-items: ${props => props.variant === 'vertical' ? 'center' : 'flex-start'};
  gap: ${props => props.variant === 'vertical' ? '4px' : '0'};
`;

const Organization = styled.span<{variant: 'horizontal' | 'vertical'}>`
  font-size: 11px;
  margin-left: ${props => props.variant === 'vertical' ? 0 : 4}px;
  color: #666;
`;

export const UserCard: React.FC<UserCardProps> = ({ user, variant = 'horizontal' }) => {
  const imageSize = variant === 'vertical' ? 96 : 24;
  const fontSize = variant === 'vertical' ? 32 : 12;

  return (
    <Container variant={variant}>
      {user.profile_picture ? (
        <ProfileImage 
          src={user.profile_picture} 
          alt={user.name}
          size={imageSize}
        />
      ) : (
        <ProfileInitial size={imageSize} fontSize={fontSize}>
          {user.name[0].toUpperCase()}
        </ProfileInitial>
      )}
      <InfoContainer variant={variant}>
        <span>{user.name}</span>
        {user?.organization && (
          <Organization variant={variant}>
            {user.organization}
          </Organization>
        )}
      </InfoContainer>
    </Container>
  );
};