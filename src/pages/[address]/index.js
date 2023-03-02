import React from 'react';
import { Profile } from '../../components/Profile';
import { getContractMetaData } from '../api/meta/[contractAddress]';

const Page = ({ ens }) => {
    return <Profile {...ens} />
};

export const getServerSideProps = async ({ query, res }) => {
    const data = await getContractMetaData(query.address);
    return {
        props: data,
    };
}

export default Page;