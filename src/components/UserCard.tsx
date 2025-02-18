import React from 'react';
import { User } from '../dpop';

interface UserCardProps {
  user: User;
  variant?: 'horizontal' | 'vertical';
}

export const UserCard: React.FC<UserCardProps> = ({ user, variant = 'horizontal' }) => {
  const imageSize = variant === 'vertical' ? 64 : 24;
  const fontSize = variant === 'vertical' ? 24 : 12;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: variant === 'vertical' ? 'column' : 'row',
      alignItems: 'center', 
      gap: '8px' 
    }}>
      {user.profile_picture ? (
        <img 
          src={user.profile_picture} 
          alt={user.name}
          style={{ 
            width: imageSize, 
            height: imageSize, 
            borderRadius: '50%',
            objectFit: 'cover',
            margin: 0,
          }}
        />
      ) : (
        <div style={{
          width: imageSize,
          height: imageSize,
          borderRadius: '50%',
          backgroundColor: '#eee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: fontSize
        }}>
          {user.name[0].toUpperCase()}
        </div>
      )}
      <div style={{
        display: 'flex',
        flexDirection: variant === 'vertical' ? 'column' : 'row',
        alignItems: variant === 'vertical' ? 'center' : 'flex-start',
        gap: variant === 'vertical' ? '4px' : '0'
      }}>
        <span>{user.name}</span>
        {user?.organization && (
          <span style={{ 
            fontSize: 12, 
            marginLeft: variant === 'vertical' ? 0 : 4, 
            color: "#666" 
          }}>
            {user.organization}
          </span>
        )}
      </div>
    </div>
  );
};