/**
 * This code snippet defines a TypeScript module that exports several functions and a model.
 * The functions are used for caching and retrieving product data using a cache client.
 * The model represents the schema for a product document in a MongoDB database.
 * 
 * Functions:
 * - FindProductByIdUsingCache: Retrieves a product document by its ID from the cache or the database.
 * - FindProductByNameUsingCache: Retrieves a list of product documents by their names from the cache or the database.
 * 
 * Model:
 * - ProductModel: Represents the schema for a product document in the MongoDB database.
 * 
 * Dependencies:
 * - mongoose: Used for interacting with the MongoDB database.
 * - ObjectId, Schema, Types: Imported from mongoose for defining the schema and working with object IDs.
 * - ProductDocument: Imported from '../../types/product' and represents the interface for a product document.
 * - CacheClient: Imported from '../loaders/node-cache.loader' and represents the cache client for caching product documents.
 * - Logger: Imported from '../loggin/logger' and represents the logger for logging debug messages.
 */

import mongoose, { ObjectId, Schema, Types } from 'mongoose';
import { ProductDocument } from '../../types/product';
import { CacheClient } from '../loaders/node-cache.loader';
import { Logger } from '../loggin/logger';

const ProductDocument = new Schema<ProductDocument>({
    OfferPrice: { type: Number },
    Price: { type: Number },
    Stock: { type: Number },
    Name: { type: String },
    Brand: { type: Types.ObjectId, ref: 'Brands' },
});

ProductDocument.pre('save', async function (Next) {
    const Key = 'products_' + this._id;
    CacheClient.set(Key, this, 300);
    Logger.debug(`Cached product with id ${this._id}`);
    Next();
});

export async function FindProductByIdUsingCache(Id: string | ObjectId) {
    const Key = 'products_' + Id;
    let CachedDocument: ProductDocument | undefined | null = CacheClient.get(Key);
    if (!CachedDocument) {
        CachedDocument = await ProductModel.findById(Id);
        if (CachedDocument) {
            CacheClient.set(Key, CachedDocument, 300);
            Logger.debug(`Cached product with id ${Id}`);
        }
    }
    return CachedDocument;
}

export async function FindProductByNameUsingCache(Name: string): Promise<ProductDocument[]> {
    const CacheKey = 'ProductsResult_' + Name.replace(' ', '').trim().toLowerCase();
    const CachedResult: ObjectId[] | undefined = CacheClient.get(CacheKey);
    let Result: ProductDocument[] = [];
    let RefreshCache = false;
    if (CachedResult) {
        for (let Index = 0; Index < CachedResult.length; Index++) {
            const ProductResult = await FindProductByIdUsingCache(CachedResult[Index]);
            if (!ProductResult) {
                RefreshCache = true;
                break;
            }
            Result.push(ProductResult);
        }
    } else {
        RefreshCache = true;
    }

    if (RefreshCache) {
        Result =
            (await ProductModel.find({
                Name: { $regex: new RegExp(Name, 'i') },
            })) || [];
        CacheClient.set(
            CacheKey,
            Result.map((Product) => Product._id),
        );
        Logger.debug(`Cached search: ${CacheKey}`);
    }
    return Result;
}

export const ProductModel = mongoose.model<ProductDocument>('Products', ProductDocument);
