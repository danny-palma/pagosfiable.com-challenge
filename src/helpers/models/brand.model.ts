/**
 * This code snippet exports a function called FindBrandByIdUsingCache and a model called BrandModel.
 *
 * The FindBrandByIdUsingCache function takes an Id parameter of type string or ObjectId and attempts to find a cached BrandDocument using the provided Id. If the document is not found in the cache, it queries the BrandModel to find the document and caches it for future use. The function returns the cached BrandDocument if found, otherwise it returns undefined or null.
 *
 * The BrandModel is a mongoose model that represents the "Brands" collection in the database. It is defined using the BrandDocument schema, which specifies that a BrandDocument should have a "Name" property of type string.
 *
 * The BrandDocument schema also defines a pre-save hook that is triggered before saving a BrandDocument. In the hook, it generates a cache key based on the document's _id, sets the document in the cache using the CacheClient, and logs a debug message indicating that the brand with the given _id has been cached.
 *
 * Note: The code snippet assumes that the necessary imports and dependencies are already included.
 */

import mongoose, { ObjectId, Schema } from 'mongoose';
import { BrandDocument } from '../../types/brand';
import { Logger } from '../loggin/logger';
import { CacheClient } from '../loaders/node-cache.loader';

const BrandDocument = new Schema<BrandDocument>({
    Name: { type: String },
});

BrandDocument.pre('save', async function (Next) {
    const Key = 'brands_' + this._id;
    CacheClient.set(Key, this, 300);
    Logger.debug(`Cached brand with id ${this._id}`);
    Next();
});

export async function FindBrandByIdUsingCache(Id: string | ObjectId) {
    const Key = 'brands_' + Id;
    let CachedDocument: BrandDocument | undefined | null = CacheClient.get(Key);
    if (!CachedDocument) {
        CachedDocument = await BrandModel.findById(Id);
        if (CachedDocument) {
            CacheClient.set(Key, CachedDocument, 300);
            Logger.debug(`Cached brand with id ${Id}`);
        }
    }
    return CachedDocument;
}

export const BrandModel = mongoose.model<BrandDocument>('Brands', BrandDocument);
