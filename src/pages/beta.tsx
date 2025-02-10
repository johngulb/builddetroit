import EmailCapture from '../components/EmailCapture';
import styled from '@emotion/styled';

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
`;

export default function BetaPage() {
  return (
    <PageWrapper>
      <ContentContainer>
        <EmailCapture />
      </ContentContainer>
    </PageWrapper>
  );
}

export const getServerSideProps = async ({ query }) => {
    return {
      props: {
        headerProps: {
          hideNavigation: true,
          hideFooter: true,
        },
      },
    };
  };
  