import React from 'react';
import { User } from '../dpop';

interface UserCardProps {
  user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {user.profile_picture ? (
        <img 
          src={user.profile_picture} 
          alt={user.name}
          style={{ 
            width: 24, 
            height: 24, 
            borderRadius: '50%',
            objectFit: 'cover',
            margin: 0,
          }}
        />
      ) : (
        <div style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          backgroundColor: '#eee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12
        }}>
          {user.name[0].toUpperCase()}
        </div>
      )}
      <div>
        <span>{user.name}</span>
        {user?.organization && (
          <span style={{ fontSize: 12, marginLeft: 4, color: "#666" }}>
            {user.organization}
          </span>
        )}
      </div>
    </div>
  );
};