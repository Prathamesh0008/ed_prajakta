import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔐 Only admin allowed
    const user = await User.findById(decoded.userId);
    if (!user || user.role !== "admin") {
      return NextResponse.json({ success: false }, { status: 403 });
    }

    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();

    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total" }
        }
      }
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    return NextResponse.json({
      success: true,
      totalUsers,
      totalOrders,
      totalRevenue
    });

  } catch (error) {
    console.error("Admin Stats Error:", error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
