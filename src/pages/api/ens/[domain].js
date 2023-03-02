import { ethers } from "ethers";
import { Network } from 'alchemy-sdk';

// const client = createClient();
// client.on('error', (err) => console.log('Redis Client Error', err));
import Redis from 'ioredis'

// const redis = new Redis(process.env.REDIS_URL)
const redis = new Redis()

const provider = new ethers.getDefaultProvider('homestead', {
    apiKey: '3GqAnIkcjJodO4hsCK5V0zQWNBgCArjj', // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
});
  
const fetchData = async (domain) => {
    const resolver = await provider.getResolver(domain);
    const email = await resolver.getText("email");
    const avatar = await resolver.getText("avatar");
    const description = await resolver.getText("description");
    const twitter = await resolver.getText("com.twitter");
    return { domain, email, avatar, description, twitter };
}

export const getENSData = async (domain) => {
    const cacheKey = `domain:${domain}`;
    let data = await redis.get(cacheKey);
    // console.log(data, domain);
    if (!data) {
        data = await fetchData(domain);
        await redis.setex(cacheKey, 24*60*60*7, JSON.stringify(data));
    } else {
        data = JSON.parse(data);
    }
    return data;
}


const handler = async (req, res) => {
    const data = await getENSData(req.query.domain);
    res.status(200).json(data);
};
  
export default handler;

// app.get('/nfts/:contractAddress', async (req, res) => {
//     const contractAddress = req.params.contractAddress ?? "0xb96EF9ad80bAc8d117e2744e5b9B1C6357471C70";
//     const nfts = await alchemy.nft.getNftsForOwner(contractAddress);
//     res.send({
//         nfts,
//         count: nfts.length
//     })
// })

// app.get('/nfts/:contractAddress/ens', async (req, res) => {
//     const contractAddress = req.params.contractAddress ?? "0xb96EF9ad80bAc8d117e2744e5b9B1C6357471C70";
//     const nfts = await alchemy.nft.getNftsForOwner(contractAddress);
//     const ensAddresses = nfts.ownedNfts.filter((nft) => {
//         return nft.contract.address == '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85';
//     });
//     res.send({
//         ensAddresses,
//         count: ensAddresses.length
//     })
// })