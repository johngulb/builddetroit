import {Client} from "@googlemaps/google-maps-services-js";

const client = new Client({});

const geocode = async (address: string) => {
    // AIzaSyC692zHU7Xt8x6_cfidxZ0Xbzqz9mP8IvI
    // AIzaSyBpLyjv3ktoG_Nd_mjnifgycgo5E53iLyU
    const res = await client.geocode({
        params: {
            address: address,
            key: 'AIzaSyBpLyjv3ktoG_Nd_mjnifgycgo5E53iLyU',
        }
    });
    console.log(res.data.results[0]);
    return res.data.results[0];
};

const handler = async (req, res) => {
    const data = await geocode("1529 Broadway St Detroit, MI 48226 United States");
    res.status(200).json(data);
};
  
export default handler;