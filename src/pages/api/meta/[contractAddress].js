import { ethers } from "ethers";
import { Alchemy, Network } from 'alchemy-sdk';
import { getENSData } from "../ens/[domain]";

import Redis from 'ioredis'

const redis = new Redis();

const config = {
    apiKey: '3GqAnIkcjJodO4hsCK5V0zQWNBgCArjj', // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(config);
  
const fetchData = async (contractAddress) => {
    let ens = null;
    const nfts = await alchemy.nft.getNftsForOwner(contractAddress);
    const ensdomains = nfts.ownedNfts.filter((nft) => {
        return nft.contract.address == '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85';
    }).map((ensAddress) => ensAddress.title);
    if (ensdomains.length) {
        ens = await getENSData(ensdomains[0]);
    }
    return { nfts, ensdomains, ens };
}

const getCacheKey = (contractAddress) => {
    return `contractAddress:meta-1:${contractAddress}`;
}

export const getContractMetaData = async (contractAddress) => {
    const cacheKey = getCacheKey(contractAddress);
    let data = await redis.get(cacheKey);
    // console.log(data, domain);
    if (!data) {
        data = await fetchData(contractAddress);
        await redis.setex(cacheKey, 24*60*60*7, JSON.stringify(data));
    } else {
        data = JSON.parse(data);
    }
    return data;
}


const handler = async (req, res) => {
    const data = await getContractMetaData(req.query.contractAddress);
    res.status(200).json(data);
};
  
export default handler;
