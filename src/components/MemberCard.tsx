import React from 'react';
import styled from '@emotion/styled';
import { Member } from '../dpop';

interface MemberProps {
  member: Member;
}

const MemberCard = ({ member }: MemberProps) => {
  return (
    <MemberCardContainer>
      <div className="member-name">{member.user.name}</div>
      {member.user.organization && (
        <div className="member-org">{member.user.organization}</div>
      )}
    </MemberCardContainer>
  );
};

const MemberCardContainer = styled.div`
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  background: white;
  
  .member-name {
    font-weight: 500;
    font-size: 1.1rem;
    color: #333;
  }

  .member-org {
    font-size: 0.9rem;
    color: #666;
    margin-top: 0.25rem;
  }
`;

export default MemberCard;
