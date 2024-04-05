import { ObjectId } from "mongoose";

export interface ProductDocument extends Document {
  name: String;
  brand: String;
  price: Number;
  stock: Number;
  // Reference to user for special pricing
  user: OfferDocument[];
}

export interface OfferDocument extends Document {
    ref: ObjectId;
    price: Number;
}