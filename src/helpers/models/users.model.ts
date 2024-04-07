/**
 * This code snippet defines a TypeScript module that exports a schema and a function for finding a user by ID using a cache.
 * The module imports various dependencies such as mongoose, ObjectId, Schema, Types, UserDocument, CacheClient, and Logger.
 * 
 * The schema, named UserDocument, is defined using the mongoose library. It has fields for Username, Email, and BrandsOfferID.
 * The BrandsOfferID field is an array of ObjectIds that reference the 'Brands' collection.
 * 
 * The UserDocument schema also has a pre-save hook that is triggered before saving a document. 
 * In the hook, the user document is cached using the CacheClient with a TTL of 300 seconds.
 * The Logger is used to log a debug message indicating that the user has been cached.
 * 
 * The module also exports a function named FindUserByIdUsingCache, which takes an ID as input and attempts to find the corresponding user document in the cache.
 * If the document is not found in the cache, it is fetched from the UserModel using the findById method.
 * If the document is found, it is cached using the CacheClient and a debug message is logged.
 * The function returns the cached user document or null if it is not found.
 * 
 * Finally, the module exports the UserModel, which is a mongoose model for the User
**/

import mongoose, { ObjectId, Schema, Types } from 'mongoose';
import { UserDocument } from '../../types/user';
import { CacheClient } from '../loaders/node-cache.loader';
import { Logger } from '../loggin/logger';

const UserDocument = new Schema<UserDocument>({
    Username: { type: String },
    Email: { type: String },
    BrandsOfferID: [{ type: Types.ObjectId, ref: 'Brands' }],
});

UserDocument.pre('save', async function (Next) {
    const Key = 'users_' + this._id;
    CacheClient.set(Key, this, 300);
    Logger.debug(`Cached user with id ${this._id}`);
    Next();
});

export async function FindUserByIdUsingCache(Id: string | ObjectId) {
    const Key = 'users_' + Id;
    let CachedDocument: UserDocument | undefined | null = CacheClient.get(Key);
    if (!CachedDocument) {
        CachedDocument = await UserModel.findById(Id);
        if (CachedDocument) {
            CacheClient.set(Key, CachedDocument, 300);
            Logger.debug(`Cached user with id ${Id}`);
        }
    }
    return CachedDocument;
}

export const UserModel = mongoose.model<UserDocument>('Users', UserDocument);
