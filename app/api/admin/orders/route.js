import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    // 🔐 Get token
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    // 🔓 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔎 Find user
    const adminUser = await User.findById(decoded.userId);

    if (!adminUser || adminUser.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Access denied" },
        { status: 403 }
      );
    }

    // 📦 Fetch all orders
    const orders = await Order.find()
      .populate("user", "firstName lastName email phone")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      orders
    });

  } catch (error) {
    console.error("Admin Orders Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
