
export const checkInEvent = async (event: string) => {
    const checkInRes = await fetch(`/api/event/${event}/check-in`);
    return await checkInRes.json();
};

const handler = async (req, res) => {
    console.log(`https://api.dpop.tech/api/event/${req.query.event}/check-in`);
    const checkInRes = await fetch(`https://api.dpop.tech/api/event/${req.query.event}/check-in`, {
        method: 'POST',
    });
    const data = checkInRes.json();
    res.status(200).json(data);
};
  
export default handler;
