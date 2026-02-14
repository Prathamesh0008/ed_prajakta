//app\api\users\save-address\route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
      await dbConnect();

    const authHeader = req.headers.get("authorization");
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const address = await req.json();

    await User.findByIdAndUpdate(
      decoded.userId,
      { $addToSet: { addresses: address } }

    );

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
