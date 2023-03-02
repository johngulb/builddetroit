
import React from 'react';
import styled from '@emotion/styled';

export const Profile = ({
    avatar,
    domain,
    email,
    description,
    twitter,
}) => {
    return (
        <ProfileWrapper>
            <ProfileHeader>
                <ProfileHandle>{domain.replace('.eth', '')}</ProfileHandle>
                {avatar && <Avatar src={avatar.replace('ipfs://', 'https://ipfs.io/ipfs/')} width="288" />}
                {description && <ProfileDetails>{description}</ProfileDetails>}
                <ContactContainer>
                    {email && (
                        <ProfileContact>
                            <a href={`mailto:${email}`} target="_blank" rel="noreferrer">
                                <img src='https://detroitartdao.com/wp-content/uploads/2022/08/email-icon-png-email-icon-image-122-2400-4044578625.png' width={44} height={44} />
                                {/* <div className='desc'>email me</div> */}
                            </a>
                        </ProfileContact>
                    )}
                    {twitter && (
                        <ProfileContact>
                            <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noreferrer">
                                <img src='https://detroitartdao.com/wp-content/uploads/2022/08/logo-twitter-png-5860.png' width={44} height={44} />
                                {/* <div className='desc'>follow me on twitter</div> */}
                            </a>
                        </ProfileContact>
                    )}
                </ContactContainer>
            </ProfileHeader>
            <ProfileAssets>
                <EmptyCollection>
                    {/* <div className='message'>
                        Empty collection
                    </div> */}
                    <a href="https://detroitartdao.com/detroitart-scavenger-hunt">
                        <div className='button'>
                            Start your collection
                        </div>
                    </a>
                </EmptyCollection>
            </ProfileAssets>
        </ProfileWrapper>
    )
};

const ProfileWrapper = styled.div``;
const ProfileAssets = styled.div``;

const EmptyCollection = styled.div`
    padding: 1rem;
    text-align: center; 
    color: #333;
    margin: 1rem 0;
    .message {
        color: #647693;
        padding: 1rem;
        text-transform: uppercase;
        font-weight: 600;
    }
    .button {
        padding: 1rem;
        text-transform: uppercase;
        color: white;
        background-color: #28303d;
        display: inline-block;
        border: solid 3px #28303d;
        font-weight: 600;
        &:hover {
            color: #28303d;
            background-color: transparent;
        }
    }
`;

const ProfileHeader = styled.div`
    text-align: center; 
    padding: 1rem;
    background-color: #fafafa;
    border-bottom: solid 1px #ddd;
`;

const ProfileHandle = styled.div`
    color: #333;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 0.5rem;
`;

const Avatar = styled.img`
    border-radius: 4px;
`;

const ContactContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ProfileDetails = styled.div`
    color: #333;
    padding: 0.5rem;
`;

const ProfileContact = styled.div`
    color: #333;
    margin-top: 1rem;
    width: 108px;
    .desc {
        font-size: 0.6rem;
        padding: 0.25rem;
    }
`;