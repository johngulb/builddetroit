import React from 'react';
import styled from '@emotion/styled';
import { Member } from '../dpop';
import Avatar from '@mui/material/Avatar';

interface MemberProps {
  member: Member;
}

const MemberCard = ({ member }: MemberProps) => {
  return (
    <MemberCardContainer>
      <div className="member-avatar">
        <Avatar 
          src={member.user.profile_picture || undefined}
          sx={{ width: 60, height: 60 }}
        />
      </div>
      <div className="member-info">
        <div className="member-name">{member.user.name}</div>
        {member.user.organization && (
          <div className="member-org">{member.user.organization}</div>
        )}
      </div>
    </MemberCardContainer>
  );
};

const MemberCardContainer = styled.div`
  padding: 0.5rem;
  border: 1px solid #eee;
  border-radius: 8px;
  background: white;
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    margin-top: 0;
  }

  .member-avatar {
    flex-shrink: 0;
  }

  .member-info {
    flex-grow: 1;
  }
  
  .member-name {
    font-weight: 500;
    font-size: 1.4rem;
    color: #333;
  }

  .member-org {
    font-size: 0.9rem;
    color: #666;
    margin-top: 0.1rem;
  }
`;

export default MemberCard;
