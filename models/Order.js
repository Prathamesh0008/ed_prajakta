import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  subtotal: Number,
  shipping: String,
  tax: Number,
  total: Number,
  status: { type: String, default: "processing" },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
