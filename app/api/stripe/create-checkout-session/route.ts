import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const user_session = await getServerSession();

  const data = await req.json();

  const stripeIns = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const lineItems = [
    {
      price_data: {
        currency: "pkr",
        product_data: {
          name: data.name,
        },
        unit_amount: data.price,
      },
      quantity: data.quantity,
    },
  ];

  if (user_session?.user?.email) {
    const session = await stripeIns.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:3000/stripe-success?courseId=${data.courseId}`,
      cancel_url: `http://localhost:3000/${data.courseId}`,
      metadata: {
        course_id: data.courseId,
        user_email: user_session.user.email,
      },
    });
    return NextResponse.json({ session });
  }
}
