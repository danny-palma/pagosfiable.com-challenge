/**
 * This code snippet defines an interface called UserDocument that extends the Document interface from the 'mongoose' library. 
 * The UserDocument interface has three properties: Username, Email, and BrandsOfferID. 
 * Username and Email are of type string, while BrandsOfferID is an array of ObjectId. 
 * This interface is used to define the structure of documents in a MongoDB collection.
 */

import { Document, ObjectId } from 'mongoose';

export interface UserDocument extends Document {
    Username: string;
    Email: string;
    BrandsOfferID: ObjectId[];
}
