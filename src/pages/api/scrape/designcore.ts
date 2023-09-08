import { fetchPageData } from "../../../utils/designcore";
import { events } from "../../../data/designmonth";

const handler = async (req, res) => {
  const results = [];
  for (let index = 0; index < events.length; index++) {
    const event = events[index];
    console.log(event);
    const data = await fetchPageData(event);
    if (!data.isMultiple) {
      results.push(data);
    }
  }
  console.log(`found ${results.length} events`)
  res.status(200).json(results);
  // const data = await fetchPageData(req.query.url);
  // res.status(200).json(data);
};

export default handler;
