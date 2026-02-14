//models\Order.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    orderId: {
      type: String,
      required: true,
      unique: true
    },

    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String
      }
    ],

    shippingAddress: {
      fullName: String,
      phone: String,
      email: String,
      street: String,
      apartment: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },

    paymentMethod: String,

    subtotal: Number,
    shipping: Number,
    tax: Number,
    total: Number,

    status: {
      type: String,
      default: "processing"
    }

  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
