import connectDB from "@/lib/mongodb";

export async function GET(request) {
  try {
    await connectDB();

    return Response.json({
      success: true,
      message: "MongoDB Connected Successfully 🚀",
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
