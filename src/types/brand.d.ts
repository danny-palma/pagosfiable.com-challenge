/**
 * This code snippet is an interface declaration in TypeScript.
 * It defines the `BrandDocument` interface which extends the `Document` interface from the `mongoose` module.
 * The `BrandDocument` interface has a single property `Name` of type string.
 */

import { Document } from 'mongoose';

export interface BrandDocument extends Document {
    Name: string;
}
