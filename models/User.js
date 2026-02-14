//models\User.js
import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    fullName: String,
    phone: String,
    email: String,
    street: String,
    apartment: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, required: true, lowercase: true },
    phone: String,
     password: { type: String, required: true },
    addresses: [AddressSchema],

    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
