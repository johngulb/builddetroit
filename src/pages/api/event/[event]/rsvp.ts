
export const rsvpEvent = async (event: string) => {
    const rsvpRes = await fetch(`/api/event/${event}/rsvp`);
    return await rsvpRes.json();
};

const handler = async (req, res) => {
    console.log(`https://api.dpop.tech/api/event/${req.query.event}/rsvp`);
    const rsvpRes = await fetch(`https://api.dpop.tech/api/event/${req.query.event}/rsvp`, {
        method: 'POST',
    });
    const data = rsvpRes.json();
    res.status(200).json(data);
};
  
export default handler;
