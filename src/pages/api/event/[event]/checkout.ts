const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const event = req.query.event;
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        customer_email: req.body.email,
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: "price_1N4B18JuhSW8YwTnT3fJ5pcp",
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/event/${event}/checkout?success=true`,
        cancel_url: `${req.headers.origin}/event/${event}/checkout?canceled=true`,
        automatic_tax: { enabled: true },
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
