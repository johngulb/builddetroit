
export const getEvent = async (event: string) => {
    const result = await (await fetch(`https://api.detroiter.network/api/event/${event}`)).json();
    return result.data;
};

const handler = async (req, res) => {
    const data = await getEvent(req.query.event);
    res.status(200).json(data);
};
  
export default handler;
