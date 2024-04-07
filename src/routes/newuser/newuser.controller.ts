/**
 * ControllerNewUser function handles the creation of a new user.
 * 
 * @param Req - The request object from Express.
 * @param Res - The response object from Express.
 * @returns void
 * @throws Error - If there is an error during the creation of the user.
 */

import { Request, Response } from 'express';
import { ObjectId, isValidObjectId } from 'mongoose';
import { FindBrandByIdUsingCache } from '../../helpers/models/brand.model';
import { UserModel } from '../../helpers/models/users.model';
import { Logger } from '../../helpers/loggin/logger';

export async function ControllerNewUser(Req: Request, Res: Response) {
    try {
        const { Username, Email }: { Username: string; Email: string } = Req.body;
        const BrandsOfferID: ObjectId[] = Req.body.BrandsOfferID || [];

        if (!Username || typeof Username !== 'string') {
            Res.status(400).json({
                status: 400,
                message: 'Missing Username property or incorrect type',
            });
            return;
        }
        if (!Email || typeof Email !== 'string') {
            Res.status(400).json({
                status: 400,
                message: 'Missing Email property or incorrect type',
            });
            return;
        }
        if (BrandsOfferID && !Array.isArray(BrandsOfferID)) {
            Res.status(400).json({
                status: 400,
                message: 'Incorrect type BrandsOffersID need Array',
            });
            return;
        }
        for (let Index = 0; Index < BrandsOfferID.length; Index++) {
            const Brand = BrandsOfferID[Index];
            if (!isValidObjectId(Brand)) {
                Res.status(400).json({
                    status: 400,
                    message: `Invalid brand ID on index ${Index}`,
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
            BrandsOfferID[Index] = SearchedBrand._id;
        }
        const NewUser = new UserModel({ Username, Email, BrandsOfferID });
        await NewUser.save();
        Res.sendStatus(201);
    } catch (error) {
        Logger.error(`Error in Controller New User: \n\n ${error}`);
        Res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
}
