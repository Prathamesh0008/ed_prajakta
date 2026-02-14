//app\api\users\addresses\route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
  await dbConnect();


    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ success: false });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("addresses");

    return NextResponse.json({
      success: true,
      addresses: user.addresses || []
    });

  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
