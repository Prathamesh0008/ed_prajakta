//app\api\auth\signup\route.js
import connectDB from "@/lib/mongodb";


import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { firstName, lastName, email, phone, password } = body;

    // Check if email already exists
const emailExists = await User.findOne({ email });
if (emailExists) {
  return NextResponse.json(
    { success: false, error: "Email already registered" },
    { status: 400 }
  );
}

// Check if phone already exists
const phoneExists = await User.findOne({ phone });
if (phoneExists) {
  return NextResponse.json(
    { success: false, error: "Phone number already registered" },
    { status: 400 }
  );
}


    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword, 
    });

    const token = jwt.sign(
     { userId: newUser._id, role: newUser.role },  // ⚠ match your order API
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return NextResponse.json({
      success: true,
      token
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Signup failed" },
      { status: 500 }
    );
  }
}
