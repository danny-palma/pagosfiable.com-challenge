import mongoose, { Schema } from "mongoose";
import { ProductDocument } from "../../types/product";


/**
 * Initializes a connection to a MongoDB database using Mongoose.
 *
 * @throws {Error} If an error occurs during the connection.
 */
export async function init() {
  try {
    // Start mongoDB connection
    const mongoUrl = `mongodb://${process.env.USERDB}:${process.env.PASSWORDDB}@ac-aemgtkt-shard-00-00.unqyghm.mongodb.net:27017,ac-aemgtkt-shard-00-01.unqyghm.mongodb.net:27017,ac-aemgtkt-shard-00-02.unqyghm.mongodb.net:27017/?replicaSet=atlas-y8oxsk-shard-0&ssl=true&authSource=admin`;
    await mongoose.connect(mongoUrl);
  } catch (error) {
    console.error("Error while conecting to database mongo DB: \n\n" + error);
    process.exit(1);
  }
}

const ProductDocument = new Schema<ProductDocument>({
  name: {type: String, required: true},
  brand: {type: String, required: true},
  price: {type: Number, required: true},
  stock: {type: Number, required: true},
  // Reference to user for special pricing
  user: {required: false},
});

export const BookModel = mongoose.model<ProductDocument>("book", ProductDocument);
