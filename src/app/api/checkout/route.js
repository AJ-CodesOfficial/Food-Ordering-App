import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Order } from "@/models/Order";
import { MenuItem } from "@/models/MenuItem";
const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);

  const { address, cartProducts } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email || "";

  if (cartProducts?.length === 0) console.log("error");

  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });

  const stripeLineItems = [];

  for (const cartProduct of cartProducts) {
    const productInfo = await MenuItem.findById(cartProduct._id);

    let productPrice = productInfo.basePrice;
    let productDescription = productInfo.description;

    if (cartProduct.size) {
      const size = productInfo.sizes.find(
        (size) => size._id.toString() === cartProduct.size._id.toString()
      );

      productPrice += size.price;
      productDescription += "\nSize: " + size.name + " ";
    }

    if (cartProduct.extras?.length > 0) {
      productDescription += "\nAddons: \n";

      for (const extraProduct of cartProduct.extras) {
        const extraProductInfo = productInfo.extraIngredientPrices.find(
          (extra) => extra._id.toString() === extraProduct._id.toString()
        );

        productPrice += extraProductInfo.price;
        productDescription += extraProductInfo.name + ",\n";
      }
    }

    const productName = productInfo.name;

    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: productName,
          description: productDescription,
          images: [productInfo.image],
        },
        unit_amount: productPrice * 100,
      },
    });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: "payment",
    customer_email: userEmail,
    success_url:
      process.env.NEXTAUTH_URL +
      "orders/" +
      orderDoc._id.toString() +
      "?clear-cart=1",
    cancel_url: process.env.NEXTAUTH_URL + "cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString() },
    payment_intent_data: {
      metadata: { orderId: orderDoc._id.toString() },
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery Fee",
          type: "fixed_amount",
          fixed_amount: { amount: 500, currency: "USD" },
        },
      },
    ],
  });
  //   return Response.json(null);

  return Response.json(stripeSession.url);
}
