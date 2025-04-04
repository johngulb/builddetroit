import React from 'react';
import styled from '@emotion/styled';
import { Login } from '../components/Auth/Login';
import Link from 'next/link';

const PageWrapper = styled.div`
    background-color: #fafafa;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const PageContainer = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    margin: 2rem;
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 2rem;

    h1 {
        font-size: 2rem;
        font-weight: 600;
        color: #333;
        margin-bottom: 0.5rem;
    }

    p {
        color: #666;
    }
`;

const Footer = styled.div`
    text-align: center;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #eee;
    color: #666;

    a {
        color: #0070f3;
        text-decoration: none;
        font-weight: 500;

        &:hover {
            text-decoration: underline;
        }
    }
`;

const Page = () => {
    const handleOnLogin = React.useCallback(() => {
        window.location.href = "/profile";
    }, []);

    return (
        <PageWrapper>
            <PageContainer>
                <Header>
                    <h1>Welcome Back</h1>
                    <p>Sign in to continue to your account</p>
                </Header>
                
                <Login onLogin={handleOnLogin}/>

                <Footer>
                    Don&apos;t have an account?{' '}
                    <Link href="/register">Sign up</Link>
                </Footer>
            </PageContainer>
        </PageWrapper>
    );
}

export default Page;