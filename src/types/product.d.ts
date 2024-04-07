/**
 * This code snippet defines an interface called ProductDocument that extends the Document interface from the 'mongoose' library. 
 * The ProductDocument interface has properties such as Name (string), Brand (ObjectId), Price (number), OfferPrice (number), and Stock (number).
 * This interface is used to define the structure of documents in a MongoDB collection for products.
 */

import { Document, ObjectId } from 'mongoose';

export interface ProductDocument extends Document {
    Name: string;
    Brand: ObjectId;
    Price: number;
    OfferPrice: number;
    Stock: number;
}
