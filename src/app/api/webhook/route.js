import { Order } from "@/models/Order";

const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    const reqBuffer = await req.text();
    const signSecret = process.env.STRIPE_SIGN_SECRET;

    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event?.data?.object;
    const orderId = session?.metadata?.orderId;
    const isPaid = session?.payment_status === "paid";

    if (isPaid) {
      await Order.findByIdAndUpdate(orderId, {
        paid: true,
      });
    }
  }

  return Response.json("ok", { status: 200 });
}
