/**
 * Controller function for creating a new product.
 * 
 * @param Req - The request object.
 * @param Res - The response object.
 * @returns void
 */

import { Request, Response } from 'express';
import { ObjectId, isValidObjectId } from 'mongoose';
import { FindBrandByIdUsingCache } from '../../helpers/models/brand.model';
import { ProductModel } from '../../helpers/models/product.model';

export async function ControllerNewProduct(Req: Request, Res: Response) {
    const {
        Name,
        Price,
        OfferPrice,
        Stock,
    }: {
        Name: string;
        Price: number;
        OfferPrice: number;
        Stock: number;
    } = Req.body;
    let Brand: ObjectId = Req.body.Brand;
    if (!Name || typeof Name !== 'string') {
        Res.status(400).json({
            status: 400,
            message: 'Missing Name property or invalid type in body request',
        });
        return;
    }
    if (isNaN(Price) || typeof Price !== 'number') {
        Res.status(400).json({
            status: 400,
            message: 'Missing Price property or invalid type in body request',
        });
        return;
    }
    if (isNaN(OfferPrice) || typeof OfferPrice !== 'number') {
        Res.status(400).json({
            status: 400,
            message: 'Missing OfferPrice property or invalid type in body request',
        });
        return;
    }
    if (isNaN(Stock) || typeof Stock !== 'number') {
        Res.status(400).json({
            status: 400,
            message: 'Missing Stock property or invalid type in body request',
        });
        return;
    }
    if (!isValidObjectId(Brand)) {
        Res.status(400).json({
            status: 400,
            message: 'Missing Brand property or invalid type in body request',
        });
        return;
    }
    const SearchedBrand = await FindBrandByIdUsingCache(Brand);
    if (!SearchedBrand) {
        Res.status(404).json({
            status: 404,
            message: `The brand with id ${Brand} doesn't exist`,
        });
        return;
    }
    Brand = SearchedBrand._id;

    const NewProduct = new ProductModel({
        Name,
        Price,
        OfferPrice,
        Stock,
        Brand,
    });
    await NewProduct.save();

    Res.sendStatus(201);
}
