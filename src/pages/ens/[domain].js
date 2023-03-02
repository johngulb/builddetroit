import React from 'react';
import { Profile } from '../../components/Profile';
import { getENSData } from '../api/ens/[domain]';

const Page = (props) => {
    return <Profile {...props} />
};

export const getServerSideProps = async ({ query, res }) => {
    const ens = await getENSData(query.domain)
    return {
        props: ens,
    };
}

export default Page;