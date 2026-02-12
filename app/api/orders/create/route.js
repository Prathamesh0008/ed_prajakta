import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();

    const order = await Order.create(data);

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: "Order creation failed" }, { status: 500 });
  }
}
