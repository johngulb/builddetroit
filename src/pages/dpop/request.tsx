import React from "react";
import styled from "@emotion/styled";
import { getContact } from "../../dpop";
import { Button } from "../../components/Styled";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const PageContainer = styled.div`
  text-align: center;
  display: block;
  max-width: 700px;
  margin: auto;
`;

const DPoPRequestPage = () => {
  const handleApproval = React.useCallback(() => {
    const contact = getContact();
    if (contact) {
      window.parent.postMessage(JSON.stringify(contact), "*");
    }
  }, []);

  return (
    <PageWrapper>
      <PageContainer>
        <Content>
          <div>
            <div>
              Your contact information will be shared with Art Night Detroit.
            </div>
            <Button onClick={handleApproval}>Approve</Button>
          </div>
        </Content>
      </PageContainer>
    </PageWrapper>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {
      headerProps: {
        disableDPoP: true,
        hideFooter: true,
        hideNavigation: true,
      },
    },
  };
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export default DPoPRequestPage;
