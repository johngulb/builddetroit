import React from 'react';
import styled from '@emotion/styled';
import { Login } from '../components/Auth/Login';

const PageWrapper = styled.div`
    background-color: #fafafa;
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
`;

const PageContainer = styled.div`
    text-align: center;
    display: block;
    max-width: 900px;
    margin: auto;
    min-width: 300px;
`;

const Page = () => {

    const handleOnLogin = React.useCallback(() => {

    }, []);

    return (
        <PageWrapper>
            <PageContainer>
                <Login onLogin={handleOnLogin}/>
            </PageContainer>
        </PageWrapper>
    );
}

export default Page;