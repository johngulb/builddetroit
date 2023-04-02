import getMetaData from "metadata-scraper";

const handler = async (req, res) => {
  const meta = await getMetaData(req.query.url);
  res.status(200).json(meta);
};

export default handler;
