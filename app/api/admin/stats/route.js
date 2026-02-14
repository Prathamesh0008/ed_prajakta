//app\api\admin\stats\route.js
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await User.findById(decoded.userId);

    if (!admin || admin.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Access denied" },
        { status: 403 }
      );
    }

    // 📊 Get counts
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();

    const processingOrders = await Order.countDocuments({ status: "processing" });
    const shippedOrders = await Order.countDocuments({ status: "shipped" });
    const deliveredOrders = await Order.countDocuments({ status: "delivered" });
    const cancelledOrders = await Order.countDocuments({ status: "cancelled" });

    const revenueData = await Order.aggregate([
      { $match: { status: { $ne: "cancelled" } } },
      {
        $group: {
          _id: null,
          total: { $sum: "$total" }
        }
      }
    ]);

    const totalRevenue = revenueData[0]?.total || 0;

    return NextResponse.json({
      success: true,
      totalUsers,
      totalOrders,
      totalRevenue,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders
    });

  } catch (error) {
    console.error("Stats Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
