import { events } from "../../../data/design-core-single-day";

const handler = async (req, res) => {
  res.status(200).json(events);
  // const data = await fetchPageData(req.query.url);
  // res.status(200).json(data);
};

export default handler;
