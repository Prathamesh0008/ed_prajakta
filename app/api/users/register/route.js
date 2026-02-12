import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { firstName, lastName, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

   const user = await User.create({
  firstName,
  lastName,
  email,
  phone,
  password: hashedPassword,
});


    return Response.json({ success: true, user });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
