//app\api\orders\route.js
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const body = await req.json();

    const newOrder = await Order.create({
      user: decoded.userId,
      ...body
    });

    return NextResponse.json({
      success: true,
      order: newOrder
    });

  } catch (error) {
    console.error("Order Create Error:", error);
    return NextResponse.json(
      { success: false, error: "Order creation failed" },
      { status: 500 }
    );
  }
}
